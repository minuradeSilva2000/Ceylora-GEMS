describe('Admin order jewellery section - End-to-End Functional Test Suite', () => {

  it('Verify the Admin Dashboard loads successfully and the sidebar menu opens on click', () => {
    cy.on('uncaught:exception', () => false)

    const API_KEY = 'AIzaSyDXnAMacC4N_e-13YnN51pxoPEhE8CK7zc';
    const AUTH_STORAGE_KEY = 'firebase:authUser:' + API_KEY + ':[DEFAULT]';

    
    cy.intercept('https://pub-f5f84942a0c7436a88cf9b4653561398.r2.dev/static/navicons/user.webp', (req) => req.destroy())
    cy.intercept('https://pub-f5f84942a0c7436a88cf9b4653561398.r2.dev/static/navicons/user.webp', (req) => req.destroy())

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

      cy.visit('https://houseofceylora.com/jewellery', {
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

    cy.url().should('include', '/jewellery', { timeout: 30000 });
    cy.get('nav[class*="MainNav"]', { timeout: 15000 }).should('be.visible');
    cy.get('.Shop-module-scss-module__lTh0aa__wrapper').should('be.visible', { timeout: 40000 });
    
    cy.then(() => new Promise((resolve) => {
      let attempts = 0;
      const tick = () => {
        if (Cypress.$('.MainNav-module-scss-module__Zci5Yq__userMenu').length > 0 || attempts >= 40) return resolve();
        attempts += 1;
        Cypress.$('button[class="NavIcon-module-scss-module__mwU8va__icon "][class="NavIcon-module-scss-module__mwU8va__icon "]').first().click();
        setTimeout(tick, 1000);
      };
      tick();
    }), { timeout: 60000 })
    
    cy.get('.MainNav-module-scss-module__Zci5Yq__userMenu').should('be.visible');
    cy.get('a[class*="userMenuAdmin"]').contains('Admin Dashboard').should('be.visible').click();
    cy.url({ timeout: 60000 }).should('include', '/admin');
    cy.get('.AdminLayout-module-scss-module__tIFY2q__adminContainer', { timeout: 60000 }).should('be.visible');
    cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
    cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
    
    
    })

    it('Verify admin user can access the dashboard and open the sidebar menu successfully',()=>{

     cy.visit('https://houseofceylora.com/admin')
     cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
     cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
     cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
     cy.wait(3000)
    })

     it('Verify admin user can navigate to the Orders page successfully from the sidebar menu',()=>{

     cy.visit('https://houseofceylora.com/admin')
     cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
     cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
     cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
     cy.get('a[class*="AdminLayout-module-scss-module__tIFY2q__navItem"]').contains('Orders').click()
     cy.get('.Orders-module-scss-module__z7pe0q__container').should('be.visible', { timeout: 30000 });
     cy.wait(3000)
   })

   it('Verify Processing jewellery orders are displayed correctly in Admin Orders page',()=>{

     cy.visit('https://houseofceylora.com/admin')
     cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
     cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
     cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
     cy.get('a[class*="AdminLayout-module-scss-module__tIFY2q__navItem"]').contains('Orders').click()
     cy.get('.Orders-module-scss-module__z7pe0q__container').should('be.visible', { timeout: 30000 });
     cy.contains('button','Jewellery').should('be.visible').click()
     cy.get('.Orders-module-scss-module__z7pe0q__orderList').should('be.visible',{ timeout: 30000 });
     cy.wait(3000)
   })

    it('Verify admin user can filter jewellery orders by processing status successfully',()=>{

     cy.visit('https://houseofceylora.com/admin')
     cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
     cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
     cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
     cy.get('a[class*="AdminLayout-module-scss-module__tIFY2q__navItem"]').contains('Orders').click()
     cy.get('.Orders-module-scss-module__z7pe0q__container').should('be.visible', { timeout: 30000 });
     cy.contains('button','Jewellery').should('be.visible').click()
     cy.get('.Orders-module-scss-module__z7pe0q__orderList').should('be.visible',{ timeout: 30000 });
     cy.get('select[class="Orders-module-scss-module__z7pe0q__filterSelect"]').should('be.visible').select('Processing')
     cy.get('select[class="Orders-module-scss-module__z7pe0q__filterSelect"]').should('have.value','Processing')
     cy.get('.Orders-module-scss-module__z7pe0q__orderCard', { timeout: 30000 }).should('be.visible');
     cy.wait(3000)
     
   })
     it('Verify admin user can open order details after filtering by Processing status',()=>{

     cy.visit('https://houseofceylora.com/admin')
     cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
     cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
     cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
     cy.get('a[class*="AdminLayout-module-scss-module__tIFY2q__navItem"]').contains('Orders').click()
     cy.get('.Orders-module-scss-module__z7pe0q__container').should('be.visible', { timeout: 40000 });
     cy.contains('button','Jewellery').should('be.visible').click()
     cy.get('.Orders-module-scss-module__z7pe0q__orderList').should('be.visible',{ timeout: 40000 });
     cy.get('select[class="Orders-module-scss-module__z7pe0q__filterSelect"]').should('be.visible').select('Processing')
     cy.get('select[class="Orders-module-scss-module__z7pe0q__filterSelect"]').should('have.value','Processing')
     cy.get('.Orders-module-scss-module__z7pe0q__orderCard', { timeout: 40000 }).should('be.visible');
     cy.get('.Orders-module-scss-module__z7pe0q__orderCard', { timeout: 40000 }).first().click()
     cy.get('.Orders-module-scss-module__z7pe0q__orderCard', { timeout: 40000 }).should('be.visible');
     cy.wait(3000)
      
   })
   it('Verify admin can view jewellery orders with Confirmed status in the Orders page',()=>{

     cy.visit('https://houseofceylora.com/admin')
     cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
     cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
     cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
     cy.get('a[class*="AdminLayout-module-scss-module__tIFY2q__navItem"]').contains('Orders').click()
     cy.get('.Orders-module-scss-module__z7pe0q__container').should('be.visible', { timeout: 30000 });
     cy.contains('button','Jewellery').should('be.visible').click()
     cy.get('.Orders-module-scss-module__z7pe0q__orderList').should('be.visible',{ timeout: 30000 });
     cy.get('.Orders-module-scss-module__z7pe0q__orderCard').find('select[class*="statusSelect"]').filter((i, el) => el.value === 'Confirmed').should('have.length.at.least', 1).first().should('have.value', 'Confirmed')
     cy.get('.Orders-module-scss-module__z7pe0q__orderCard').should('be.visible', { timeout: 30000 });
     cy.wait(3000)

   })
   it('Verify admin user can search and view a specific jewellery order by order reference successfully',()=>{

     cy.visit('https://houseofceylora.com/admin')
     cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
     cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
     cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
     cy.get('a[class*="AdminLayout-module-scss-module__tIFY2q__navItem"]').contains('Orders').click()
     cy.get('.Orders-module-scss-module__z7pe0q__container').should('be.visible', { timeout: 30000 });
     cy.contains('button','Jewellery').should('be.visible').click()
     cy.get('.Orders-module-scss-module__z7pe0q__orderList').should('be.visible',{ timeout: 30000 });
     cy.get('input[placeholder="Search by order ref, name, or email…"]').type('ORD-CY-00006')
     cy.get('.Orders-module-scss-module__z7pe0q__orderCard').should('be.visible',{timeout:30000})
     cy.wait(3000)
  })
})