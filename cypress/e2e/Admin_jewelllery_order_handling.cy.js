describe('Admin order jewellery section - End-to-End Functional Test Suite',()=>{

     it('Verify the Admin Dashboard loads successfully and the sidebar menu opens on click',()=>{

     cy.on('uncaught:exception', () => false)

     const API_KEY = 'AIzaSyDXnAMacC4N_e-13YnN51pxoPEhE8CK7zc';
     const AUTH_STORAGE_KEY = 'firebase:authUser:' + API_KEY + ':[DEFAULT]';

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

       cy.visit('https://houseofceylora.com/admin', {
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

     cy.get('.AdminLayout-module-scss-module__tIFY2q__adminContainer').should('be.visible', { timeout: 30000 });
     cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
     cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });

    })








})