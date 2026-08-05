describe('Admin order page  - End-to-End Functional Test Suite', () => {

  it('verify admin dashboard successfully loading', () => {
    cy.on('uncaught:exception', () => false)

    const API_KEY = 'AIzaSyDXnAMacC4N_e-13YnN51pxoPEhE8CK7zc';
    const AUTH_STORAGE_KEY = 'firebase:authUser:' + API_KEY + ':[DEFAULT]';

    // Flaky CDN/font preloads can keep the page's `load` event from firing under
    // Cypress's proxy. Abort them so load completes and visits are reliable.
    cy.intercept('https://pub-f5f84942a0c7436a88cf9b4653561398.r2.dev/**', (req) => req.destroy())
    cy.intercept('**/*.woff2', (req) => req.destroy())

    cy.task('firebaseLogin', { email: 'ceylorait@gmail.com', password: 'ceylora@123' }).then((auth) => {
      const user = {
        uid: auth.localId,
        email: auth.email,
        displayName: '',
        emailVerified: true,
        isAnonymous: false,
        providerData: [
          { uid: auth.localId, email: auth.email, displayName: '', providerId: 'password' },
        ],
        stsTokenManager: {
          refreshToken: auth.refreshToken,
          accessToken: auth.idToken,
          expirationTime: Date.now() + parseInt(auth.expiresIn, 10) * 1000,
        },
        createdAt: String(Date.now()),
        lastLoginAt: String(Date.now()),
        apiKey: API_KEY,
        appName: '[DEFAULT]',
      };

      cy.visit('https://houseofceylora.com/collections', {
        timeout: 300000,
        onBeforeLoad(win) {
          win.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
          return new Promise((resolve) => {
            try {
              const open = win.indexedDB.open('firebaseLocalStorageDb', 1);
              open.onupgradeneeded = () => {
                if (!open.result.objectStoreNames.contains('firebaseLocalStorage')) {
                  open.result.createObjectStore('firebaseLocalStorage', { keyPath: 'fbase_key' });
                }
              };
              open.onsuccess = () => {
                const tx = open.result.transaction('firebaseLocalStorage', 'readwrite');
                tx.objectStore('firebaseLocalStorage').put({
                  fbase_key: AUTH_STORAGE_KEY,
                  value: user,
                });
                tx.oncomplete = () => { open.result.close(); resolve(); };
                tx.onerror = () => { open.result.close(); resolve(); };
              };
              open.onerror = () => resolve();
            } catch (e) {
              resolve();
            }
          });
        },
      });
    })

    cy.url().should('include', '/collections', { timeout: 30000 });
    cy.get('nav[class*="MainNav"]', { timeout: 15000 }).should('be.visible');
    cy.get('.Collections-module-scss-module__R3MVuG__pageContainer').should('be.visible');

    // Firebase auth initialises a few seconds after the page loads. Click the
    // user icon repeatedly until the authenticated user menu opens, ignoring
    // clicks that land before React hydration / auth initialisation.
    cy.then(() => new Promise((resolve) => {
      let attempts = 0;
      const tick = () => {
        if (Cypress.$('.MainNav-module-scss-module__Zci5Yq__userMenu').length > 0 || attempts >= 40) return resolve();
        attempts += 1;
        Cypress.$('button[class*="NavIcon-module-scss-module__"][class*="__icon"]').first().click();
        setTimeout(tick, 1000);
      };
      tick();
    }), { timeout: 60000 })

    cy.get('.MainNav-module-scss-module__Zci5Yq__userMenu').should('be.visible');
    cy.get('a[class*="userMenuAdmin"]').contains('Admin Dashboard').click();
    cy.url().should('include', '/admin', { timeout: 30000 });
    cy.get('.AdminLayout-module-scss-module__tIFY2q__pageContent').should('be.visible', { timeout: 30000 });
  })

})
