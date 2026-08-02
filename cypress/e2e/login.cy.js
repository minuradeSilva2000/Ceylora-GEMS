describe('template spec', () => {
  it('Verify the House of Ceylora home page loads successfully', () => {
    cy.on('uncaught:exception', () => false)

    const fb = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXnAMacC4N_e-13YnN51pxoPEhE8CK7zc'
    let authBody = null

    cy.clearAllCookies()
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()

    cy.request({
      method: 'POST',
      url: fb,
      body: { email: 'ceylorait@gmail.com', password: 'ceylora@123', returnSecureToken: true },
    }).then((res) => {
      authBody = res.body
    })

    cy.visit('https://houseofceylora.com/', {
      timeout: 300000,
      onBeforeLoad(win) {
        try { win.localStorage.clear() } catch (e) {}
        try { win.sessionStorage.clear() } catch (e) {}
        try {
          win.indexedDB.databases().then((dbs) => {
            dbs.forEach((db) => {
              try { win.indexedDB.deleteDatabase(db.name) } catch (e) {}
            })
          })
        } catch (e) {}
        const origFetch = win.fetch.bind(win)
        win.fetch = (input, init) => {
          const url = typeof input === 'string' ? input : (input && input.url)
          if (url && url.startsWith('https://identitytoolkit.googleapis.com/')) {
            let payload = null
            if (url.includes('accounts:signInWithPassword') && authBody) {
              payload = authBody
            } else if (url.includes('accounts:lookup') && authBody) {
              payload = {
                users: [{
                  localId: authBody.localId,
                  email: authBody.email,
                  emailVerified: false,
                  displayName: authBody.displayName || '',
                  providerUserInfo: [{
                    providerId: 'password',
                    email: authBody.email,
                    federatedId: authBody.email,
                    rawId: authBody.email,
                  }],
                  createdAt: '1700000000000',
                  lastLoginAt: '1700000000000',
                }],
              }
            }
            if (payload) {
              return Promise.resolve(new win.Response(JSON.stringify(payload), {
                status: 200,
                statusText: 'OK',
                headers: { 'Content-Type': 'application/json' },
              }))
            }
          }
          return origFetch(input, init)
        }
      },
    })

    cy.get('div[class*="MainNav-module-scss-module__"][class*="__actions"]', { timeout: 60000 }).should('be.visible')
    cy.wait(5000)
    cy.get('button[class*="NavIcon-module-scss-module__"][class*="__icon"]', { timeout: 30000 }).should('be.visible')
    cy.then(() => new Promise((resolve) => {
      const iconSel = 'button[class*="NavIcon-module-scss-module__"][class*="__icon"]'
      const modalSel = '[class*="AuthModal-module-scss-module__"][class*="__card"]'
      let attempts = 0
      const tick = () => {
        if (Cypress.$(modalSel).length > 0 || attempts >= 20) return resolve()
        attempts += 1
        Cypress.$(iconSel).first().click()
        setTimeout(tick, 2000)
      }
      tick()
    }))
    cy.get('[class*="AuthModal-module-scss-module__"][class*="__card"]', { timeout: 30000 }).should('be.visible')

    cy.get('input[placeholder="you@example.com"]').type('ceylorait@gmail.com')
    cy.get('input[placeholder="••••••••"]').type('ceylora@123')
    cy.get('button[class*="AuthModal-module-scss-module__"][class*="__submitBtn"]').click()

    cy.get('[class*="AuthModal-module-scss-module__"][class*="__card"]', { timeout: 60000 }).should('not.exist')
    cy.wait(3000)
    cy.visit('https://houseofceylora.com/gems', { timeout: 300000 })
    cy.url().should('include', '/gems', { timeout: 30000 })
  })
})
