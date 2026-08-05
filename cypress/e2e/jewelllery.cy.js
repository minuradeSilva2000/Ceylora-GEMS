describe('Jewellery Page - End-to-End Functional Test Suite', () => {

  it('Verify the House of Ceylora home page loads successfully', () => {
    cy.visit('https://houseofceylora.com/')
  })
   it('Verify user can navigate to the JEWELLERY page from the navigation menu', () => {
    cy.visit('https://houseofceylora.com')
    cy.get('nav[class*="MainNav"]', { timeout: 10000 }).should('be.visible')
    cy.get('nav[class*="MainNav"] a[class*="__link"]').contains('JEWELLERY').click()
    cy.url().should('include', '/jewellery')
    cy.get('a[class*="link--active"]').contains('JEWELLERY').should('be.visible')
  })
   it('Verify navigation to Gems page when clicking the "Shop" button in JEWELLERY Collection section on Home page',()=>{
    cy.visit('https://houseofceylora.com')
    cy.get('section[class="Home-module-scss-module__QoBbiW__collections"]').should('be.visible')
    cy.contains('h3[class*="collectionCardTitle"]', 'Jewellery Collection').should('be.visible')
    cy.contains('h3[class*="collectionCardTitle"]', 'Jewellery Collection').parent().find('a[class*="collectionCardShopBtn"]').click()
    cy.url().should('include', '/jewellery')
    cy.get('a[class*="MainNav-module-scss-module__Zci5Yq__link"]').contains('JEWELLERY').should('be.visible')
  })
  it('Verify user can open the 8k White Gold Unheated Jadite Ring details page',()=>{
     cy.visit('https://houseofceylora.com/jewellery')
     cy.get('img[alt="8k White Gold Unheated Jadite Ring"]').should('be.visible').click()
     cy.url().should('include','/jewellery/8k-white-gold-unheated-jadite-ring-5')
     cy.get('.JewelleryDetail-module-scss-module__BOs-Ga__pageContainer').should('be.visible')
  })
   it('Verify users are navigated back to the Jewellery listing page when clicking the Back icon',()=>{
    cy.visit('https://houseofceylora.com/jewellery');
    cy.get('img[alt="8k White Gold Unheated Jadite Ring"]').should('be.visible').click()
    cy.url().should('include','/jewellery/8k-white-gold-unheated-jadite-ring-5', { timeout: 10000 })
    cy.get('.JewelleryDetail-module-scss-module__BOs-Ga__pageContainer').should('be.visible')
    cy.get('a[class="JewelleryDetail-module-scss-module__BOs-Ga__backLink"]').click()
    cy.url().should('include','/jewellery',{ timeout: 10000 })
     
  })
  it('Verify user can open the Pink Sapphire Bracelet details page',()=>{
     cy.visit('https://houseofceylora.com/jewellery')
     cy.get('img[alt="Pink Sapphire Bracelet"]').should('be.visible').click()
     cy.url().should('include','/jewellery/pink-sapphire-bracelet-2')
     cy.get('.JewelleryDetail-module-scss-module__BOs-Ga__pageContainer').should('be.visible')
  })
  it('Verify jewellery filtering by material category works correctly',()=>{
       cy.visit('https://houseofceylora.com/jewellery');
       cy.get('.Shop-module-scss-module__lTh0aa__filterGroup', { timeout: 15000 }).should('be.visible')
       cy.get('h3[class="Shop-module-scss-module__lTh0aa__filterGroupTitle"]', { timeout: 15000 }).contains('Metal').scrollIntoView().should('be.visible')
       cy.get('label[class="Shop-module-scss-module__lTh0aa__filterItem"]').contains('White Gold').scrollIntoView().should('be.visible').click()
       cy.url().should('include','/jewellery?metal=White+Gold', { timeout: 10000 })
       cy.get('.Shop-module-scss-module__lTh0aa__wrapper').should('be.visible')
  })
  it('Verify jewellery filtering by  category works correctly',()=>{
      cy.visit('https://houseofceylora.com/jewellery');
      cy.get('.Shop-module-scss-module__lTh0aa__filterGroup', { timeout: 15000 }).should('be.visible')
      cy.get('h3[class="Shop-module-scss-module__lTh0aa__filterGroupTitle"]', { timeout: 15000 }).contains('Category').scrollIntoView().should('be.visible')
      cy.get('label[class="Shop-module-scss-module__lTh0aa__filterItem"]').contains('Earrings').scrollIntoView().should('be.visible').click()
      cy.url().should('include','/jewellery?category=Earrings',{ timeout: 10000 })
      cy.get('.Shop-module-scss-module__lTh0aa__wrapper').should('be.visible')
  })

  it('Verify jewellery filtering by metal and category works correctly',()=>{
      cy.visit('https://houseofceylora.com/jewellery');
      cy.get('.Shop-module-scss-module__lTh0aa__filterGroup', { timeout: 15000 }).should('be.visible')
       cy.get('h3[class="Shop-module-scss-module__lTh0aa__filterGroupTitle"]', { timeout: 15000 }).contains('Metal').scrollIntoView().should('be.visible')
       cy.get('label[class="Shop-module-scss-module__lTh0aa__filterItem"]').contains('Rose Gold').scrollIntoView().should('be.visible').click()
       cy.url().should('include','/jewellery?metal=Rose+Gold', { timeout: 10000 })
       cy.get('.Shop-module-scss-module__lTh0aa__wrapper').should('be.visible')
       cy.get('.Shop-module-scss-module__lTh0aa__filterGroup', { timeout: 15000 }).first().scrollIntoView().should('be.visible')
      cy.get('h3[class="Shop-module-scss-module__lTh0aa__filterGroupTitle"]', { timeout: 15000 }).contains('Category').scrollIntoView().should('be.visible')
      cy.get('label[class="Shop-module-scss-module__lTh0aa__filterItem"]').contains('Pendant').scrollIntoView().should('be.visible').click()
       cy.url().should('include','/jewellery?metal=Rose+Gold&category=Pendant',{ timeout: 10000 })
      cy.get('.Shop-module-scss-module__lTh0aa__wrapper').should('be.visible')
  })
  it('Verify jewellery product navigation to details page works correctly',()=>{

     cy.visit('https://houseofceylora.com/jewellery');
     cy.get('img[alt="10K White Gold Heated Pearl Necklace"]').should('be.visible').click()
     cy.url().should('include','/jewellery/10k-white-gold-heated-pearl-necklace-3')
     cy.get('.JewelleryDetail-module-scss-module__BOs-Ga__pageContainer').should('be.visible')
  })
  it('verify click the add to cart button on the product details page adds the item to the cart drawer',()=>{
     const API_KEY = 'AIzaSyDXnAMacC4N_e-13YnN51pxoPEhE8CK7zc';
     const AUTH_STORAGE_KEY = 'firebase:authUser:' + API_KEY + ':[DEFAULT]';

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

       cy.visit('https://houseofceylora.com/jewellery/10k-white-gold-heated-pearl-necklace-3', {
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
     });

     cy.url().should('include', '/jewellery/10k-white-gold-heated-pearl-necklace-3');
     cy.get('.JewelleryDetail-module-scss-module__BOs-Ga__pageContainer').should('be.visible');

     cy.get('button[class*="__btnCart"]', { timeout: 15000 }).scrollIntoView().should('contain.text', 'Add To Cart').click();

     cy.get('.CartDrawer-module-scss-module__sGxPbG__drawer', { timeout: 10000 }).should('be.visible');
     cy.get('.CartDrawer-module-scss-module__sGxPbG__itemName').should('contain.text', '10K White Gold Heated Pearl Necklace');
  })
  it('Verify user can add jewellery item to cart and increase quantity using the plus button',()=>{

       const API_KEY = 'AIzaSyDXnAMacC4N_e-13YnN51pxoPEhE8CK7zc';
     const AUTH_STORAGE_KEY = 'firebase:authUser:' + API_KEY + ':[DEFAULT]';

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

       cy.visit('https://houseofceylora.com/jewellery/10k-white-gold-heated-pearl-necklace-3', {
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
     });

     cy.url().should('include', '/jewellery/10k-white-gold-heated-pearl-necklace-3');
     cy.get('.JewelleryDetail-module-scss-module__BOs-Ga__pageContainer').should('be.visible');

     cy.get('button[class*="__btnCart"]', { timeout: 15000 }).scrollIntoView().should('contain.text', 'Add To Cart').click();

     cy.get('.CartDrawer-module-scss-module__sGxPbG__drawer', { timeout: 10000 }).should('be.visible');
     cy.get('.CartDrawer-module-scss-module__sGxPbG__itemName').should('contain.text', '10K White Gold Heated Pearl Necklace');
     for (let i = 0; i < 10; i++) {
       cy.get('.CartDrawer-module-scss-module__sGxPbG__stepBtn').contains('+').click();
     }
     cy.get('.CartDrawer-module-scss-module__sGxPbG__stepVal').should('contain.text', '11');
     
    
  })
   it('Verify user can increase and decrease jewellery item quantity in the cart',()=>{

       const API_KEY = 'AIzaSyDXnAMacC4N_e-13YnN51pxoPEhE8CK7zc';
     const AUTH_STORAGE_KEY = 'firebase:authUser:' + API_KEY + ':[DEFAULT]';

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

       cy.visit('https://houseofceylora.com/jewellery/10k-white-gold-heated-pearl-necklace-3', {
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
     });

     cy.url().should('include', '/jewellery/10k-white-gold-heated-pearl-necklace-3');
     cy.get('.JewelleryDetail-module-scss-module__BOs-Ga__pageContainer').should('be.visible');

     cy.get('button[class*="__btnCart"]', { timeout: 15000 }).scrollIntoView().should('contain.text', 'Add To Cart').click();

     cy.get('.CartDrawer-module-scss-module__sGxPbG__drawer', { timeout: 10000 }).should('be.visible');
     cy.get('.CartDrawer-module-scss-module__sGxPbG__itemName').should('contain.text', '10K White Gold Heated Pearl Necklace');
     for (let i = 0; i < 10; i++) {
       cy.get('.CartDrawer-module-scss-module__sGxPbG__stepBtn').eq(1).click();
     }
     cy.get('.CartDrawer-module-scss-module__sGxPbG__stepVal').should('contain.text', '11')
     for (let i = 11; i > 9; i--) {
       cy.get('.CartDrawer-module-scss-module__sGxPbG__stepBtn').eq(0).click();
     }
     cy.get('.CartDrawer-module-scss-module__sGxPbG__stepVal').should('contain.text', '9');
     
    
  })
    it('Verify item is checked out successfully', () => {
    const API_KEY = 'AIzaSyDXnAMacC4N_e-13YnN51pxoPEhE8CK7zc';
    const AUTH_STORAGE_KEY = 'firebase:authUser:' + API_KEY + ':[DEFAULT]';

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

      cy.visit('https://houseofceylora.com/jewellery/10k-rose-gold-no-treatment-diamond-pendant-4', {
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
    });

   
    cy.url().should('include', '/jewellery/10k-rose-gold-no-treatment-diamond-pendant-4');
    cy.get('.JewelleryDetail-module-scss-module__BOs-Ga__pageContainer').should('be.visible');

   
    cy.get('button[class*="__btnCart"]', { timeout: 15000 }).scrollIntoView().should('contain.text', 'Add To Cart').click();

   
    cy.get('.CartDrawer-module-scss-module__sGxPbG__drawer', { timeout: 10000 }).should('be.visible');

    
    cy.get('.CartDrawer-module-scss-module__sGxPbG__itemName').should('contain.text', '10K Rose Gold No Treatment Diamond Pendant');

    
     for (let i = 0; i < 3; i++) {
       cy.get('.CartDrawer-module-scss-module__sGxPbG__stepBtn').contains('+').click();
     }
     cy.get('.CartDrawer-module-scss-module__sGxPbG__stepVal').should('contain.text', '4')
     cy.get('.CartDrawer-module-scss-module__sGxPbG__checkoutBtn').click();
    
    cy.url().should('include', '/checkout', { timeout: 10000 });
    cy.get('.Checkout-module-scss-module__nq3FdW__mainContent').should('be.visible');
  });
   it('verify click order now check button naviagte to my account page', () => {
    const API_KEY = 'AIzaSyDXnAMacC4N_e-13YnN51pxoPEhE8CK7zc';
    const AUTH_STORAGE_KEY = 'firebase:authUser:' + API_KEY + ':[DEFAULT]';

    cy.intercept('POST', '**/api/orders', { statusCode: 200, body: { id: 99999, ok: true } }).as('placeOrder');

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

      cy.visit('https://houseofceylora.com/jewellery/10k-rose-gold-no-treatment-diamond-pendant-4', {
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
    });

    cy.url().should('include', '/jewellery/10k-rose-gold-no-treatment-diamond-pendant-4');
    cy.get('.JewelleryDetail-module-scss-module__BOs-Ga__pageContainer', { timeout: 15000 }).should('be.visible');
    cy.get('.JewelleryDetail-module-scss-module__BOs-Ga__btnCart', { timeout: 30000 }).scrollIntoView().should('contain.text', 'Add To Cart').click();
    cy.get('.CartDrawer-module-scss-module__sGxPbG__drawer', { timeout: 10000 }).should('be.visible');
    
     for (let i = 0; i < 3; i++) {
       cy.get('.CartDrawer-module-scss-module__sGxPbG__stepBtn').contains('+').click();
     }
     cy.get('.CartDrawer-module-scss-module__sGxPbG__stepVal').should('contain.text', '4')
    cy.get('.CartDrawer-module-scss-module__sGxPbG__checkoutBtn').click();
    cy.url().should('include', '/checkout', { timeout: 10000 });
    cy.get('.Checkout-module-scss-module__nq3FdW__mainContent', { timeout: 15000 }).should('be.visible');

    const shipping = ['John Doe', 'john@example.com', '0712345678', '1 Galle Road', 'Colombo', 'Sri Lanka', '00100'];
    cy.get('input[type="text"], input[type="email"], input[type="tel"]')
      .not('[placeholder="NEWSLETTER WILL BE COMING SOON"]')
      .each(($el, idx) => {
        if (idx < shipping.length) cy.wrap($el).type(shipping[idx], { force: true });
      });

    cy.contains('button','Order').click();
    cy.url().should('include','/checkout', { timeout: 10000 });
    cy.get('.Checkout-module-scss-module__nq3FdW__mainContent', { timeout: 15000 }).should('be.visible');
    cy.contains('Order placed successfully.').should('be.visible');
    cy.contains('View My Orders').should('have.attr', 'href', '/account').click();
    cy.url().should('include','/account', { timeout: 10000 });
    cy.get('.Account-module-scss-module__0dtnZq__wrapper', { timeout: 15000 }).should('be.visible');
  })
  it('Verify the user can view Order History from the My Account page after successfully placing an order', () => {
    const API_KEY = 'AIzaSyDXnAMacC4N_e-13YnN51pxoPEhE8CK7zc';
    const AUTH_STORAGE_KEY = 'firebase:authUser:' + API_KEY + ':[DEFAULT]';

    cy.intercept('POST', '**/api/orders', { statusCode: 200, body: { id: 99999, ok: true } }).as('placeOrder');

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

      cy.visit('https://houseofceylora.com/jewellery/8k-white-gold-unheated-jadite-ring-5', {
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
    });

    cy.url().should('include', '/jewellery/8k-white-gold-unheated-jadite-ring-5');
    cy.get('.JewelleryDetail-module-scss-module__BOs-Ga__pageContainer', { timeout: 15000 }).should('be.visible');
    cy.get('.JewelleryDetail-module-scss-module__BOs-Ga__btnCart', { timeout: 30000 }).scrollIntoView().should('contain.text', 'Add To Cart').click();
    cy.get('.CartDrawer-module-scss-module__sGxPbG__drawer', { timeout: 10000 }).should('be.visible');
     for (let i = 0; i < 5; i++) {
       cy.get('.CartDrawer-module-scss-module__sGxPbG__stepBtn').contains('+').click();
     }
     cy.get('.CartDrawer-module-scss-module__sGxPbG__stepVal').should('contain.text', '6')
    cy.get('.CartDrawer-module-scss-module__sGxPbG__checkoutBtn').click();
    cy.url().should('include', '/checkout', { timeout: 10000 });
    cy.get('.Checkout-module-scss-module__nq3FdW__mainContent', { timeout: 15000 }).should('be.visible');

    const shipping = ['John Doe', 'john@example.com', '0712345678', '1 Galle Road', 'Colombo', 'Sri Lanka', '00100'];
    cy.get('input[type="text"], input[type="email"], input[type="tel"]')
      .not('[placeholder="NEWSLETTER WILL BE COMING SOON"]')
      .each(($el, idx) => {
        if (idx < shipping.length) cy.wrap($el).type(shipping[idx], { force: true });
      });

    cy.contains('button','Order').click();
    cy.url().should('include','/checkout', { timeout: 10000 });
    cy.get('.Checkout-module-scss-module__nq3FdW__mainContent', { timeout: 15000 }).should('be.visible');
    cy.contains('Order placed successfully.').should('be.visible');
    cy.contains('View My Orders').should('have.attr', 'href', '/account').click();
    cy.url().should('include','/account', { timeout: 10000 });
    cy.get('.Account-module-scss-module__0dtnZq__wrapper', { timeout: 15000 }).should('be.visible');
    cy.contains('button','Order History').click();
    cy.get('.Account-module-scss-module__0dtnZq__wrapper', { timeout: 15000 }).should('be.visible');
    cy.get('.Account-module-scss-module__0dtnZq__sectionTitle').should('contain.text', 'ORDER HISTORY');
    cy.get('.Account-module-scss-module__0dtnZq__orderCard').should('have.length.at.least', 1);
  })
})
