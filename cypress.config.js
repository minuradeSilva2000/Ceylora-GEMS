const { defineConfig } = require("cypress");
const https = require("https");

const FIREBASE_API_KEY = "AIzaSyDXnAMacC4N_e-13YnN51pxoPEhE8CK7zc";

function signInWithFirebase(email, password) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ email, password, returnSecureToken: true });
    const url = new URL(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword"
    );
    url.searchParams.set("key", FIREBASE_API_KEY);
    const req = https.request(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            if (res.statusCode >= 400) {
              reject(
                new Error(
                  json.error && json.error.message
                    ? json.error.message
                    : "HTTP " + res.statusCode
                )
              );
            } else {
              resolve(json);
            }
          } catch (e) {
            reject(new Error("Failed to parse Firebase response: " + e.message));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

module.exports = defineConfig({
  allowCypressEnv: false,
  pageLoadTimeout: 300000,

  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
        firebaseLogin({ email, password }) {
          return signInWithFirebase(email, password)
        },
      })
    },
  },
});
