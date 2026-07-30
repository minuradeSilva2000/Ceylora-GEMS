const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  pageLoadTimeout: 120000,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
