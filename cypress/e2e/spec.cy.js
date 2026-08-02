describe('template spec', () => {

  it('Verify the House of Ceylora home page loads successfully', () => {
    cy.visit('https://houseofceylora.com/')
  })

  it('Verify user can navigate to the Gems page from the navigation menu', () => {
    cy.visit('https://houseofceylora.com')
    cy.get('nav[class*="MainNav"]', { timeout: 10000 }).should('be.visible')
    cy.get('nav[class*="MainNav"] a[class*="__link"]').contains('GEMS').click()
    cy.url().should('include', '/gems')
    cy.get('a[class*="link--active"]').contains('GEMS').should('be.visible')
  })
  it('Verify navigation to Gems page when clicking the "Shop" button in Gems Collection section on Home page',()=>{
    cy.visit('https://houseofceylora.com')
    cy.get('section[class="Home-module-scss-module__QoBbiW__collections"]').should('be.visible')
    cy.contains('h3[class*="collectionCardTitle"]', 'Gem Collection').should('be.visible')
    cy.contains('h3[class*="collectionCardTitle"]', 'Gem Collection').parent().find('a[class*="collectionCardShopBtn"]').click()
    cy.url().should('include', '/gems')
    cy.get('a[class*="MainNav-module-scss-module__Zci5Yq__link"]').contains('GEMS').should('be.visible')
  })

  it('Verify Sapphire gemstone details are displayed after clicking the Sapphire image', () => {
    cy.visit('https://houseofceylora.com/gems');
    cy.get('img[alt="Sapphire"]').click()
    cy.get('.Gems-module-scss-module__OA-ntW__gemstoneGrid').should('be.visible')
    cy.contains('Heated Blue Sapphire').should('be.visible')
  })
  it('Verify navigation to the Heated Ruby details page when clicking the Heated Ruby gem image', () => {
    cy.visit('https://houseofceylora.com/gems');
    cy.get('img[alt="Heated Ruby"]').click()
    cy.url().should('include', '/gems/heated-ruby', { timeout: 10000 })
    cy.get('h1').contains('Heated Ruby').should('be.visible')
    
  })
  
 it('verify select the ruby gem and click catEye subcategory',()=>{
    cy.visit('https://houseofceylora.com/gems');
    cy.get('img[alt="Ruby"]').click()
    cy.url().should('include', 'type=Ruby')
    cy.get('.Gems-module-scss-module__OA-ntW__gemstoneGrid').should('be.visible')
    cy.contains('button','Cat\'s Eye').click()
    cy.url().should('include', '/gems?type=Ruby&sub=CE', { timeout: 10000 })
    cy.get('.Gems-module-scss-module__OA-ntW__gemstoneGrid').should('be.visible')
    cy.contains('button','Cat\'s Eye').should('be.visible')
    cy.contains('button','Pink').should('be.visible').click()


  })
  it('Verify selected gemstone image changes when clicking gallery images',()=>{

    cy.visit('https://houseofceylora.com/gems');
    cy.get('img[alt="Ruby"]').click()
    cy.url().should('include', 'type=Ruby')
    cy.get('.Gems-module-scss-module__OA-ntW__gemstoneGrid').should('be.visible')
    cy.contains('button','Cat\'s Eye').click()
    cy.url().should('include', '/gems?type=Ruby&sub=CE', { timeout: 10000 })
    cy.get('.Gems-module-scss-module__OA-ntW__gemstoneGrid').should('be.visible')
    cy.contains('button','Pink').should('be.visible').click()
    cy.get('img[alt="No Treatment Cat\'s Eye"]').click()
    cy.url().should('include', '/gems/no-treatment-cats-eye-21', { timeout: 10000 })
    cy.get('img[class*="galleryMainImg"]').should('be.visible')
    cy.get('img[class*="thumbMedia"]').should('have.length.at.least', 6)
    cy.get('img[class*="galleryMainImg"]').invoke('attr', 'src').then((initialImage) => {
      cy.get('img[class*="thumbMedia"]').eq(1).click()
      cy.get('img[class*="thumbMedia"]').eq(2).click()
      cy.get('img[class*="thumbMedia"]').eq(3).click()
      cy.get('img[class*="thumbMedia"]').eq(4).click()
      cy.get('img[class*="thumbMedia"]').eq(5).click()
      cy.get('img[class*="galleryMainImg"]').invoke('attr', 'src').should((updatedImage) => {
          expect(updatedImage).not.to.eq(initialImage);
        });

    });
  })
  it('Verify users are navigated back to the Gems listing page when clicking the Back icon',()=>{
    cy.visit('https://houseofceylora.com/gems');
    cy.get('img[alt="Unheated Chrysoberyl"]').click()
    cy.url().should('include','/gems/unheated-chrysoberyl-19', { timeout: 10000 })
    cy.get('.GemDetail-module-scss-module__23wXQa__pageContainer').should('be.visible')
    cy.get('a[class="GemDetail-module-scss-module__23wXQa__backLink"]').click()
    cy.url().should('include','/gems',{ timeout: 10000 })
     
  })
  it('Verify the Natural Hexagon Garnet details page is displayed after clicking the gemstone image',()=>{
     cy.visit('https://houseofceylora.com/gems');
     cy.get('img[alt="Natural Hexagon Garnet"]').click()
     cy.url().should('include','/gems/natural-hexagon-garnet-20',{ timeout: 10000 })
     cy.get('.GemDetail-module-scss-module__23wXQa__pageContainer').should('be.visible')
  })
  it('Verify authenticated user can add a gemstone to the shopping cart',()=>{

     cy.visit('https://houseofceylora.com/gems');
     cy.clearCookies();
     cy.clearLocalStorage();
     cy.clearAllSessionStorage();
     cy.window().then((win) => {
       if (win.indexedDB && win.indexedDB.databases) {
         return win.indexedDB.databases().then((dbs) =>
           Promise.all(dbs.map((db) => win.indexedDB.deleteDatabase(db.name)))
         );
       }
     });
     cy.visit('https://houseofceylora.com/gems');
     cy.get('img[alt="Natural Hexagon Garnet"]').click()
     cy.url().should('include','/gems/natural-hexagon-garnet-20',{ timeout: 50000 })
     cy.get('.GemDetail-module-scss-module__23wXQa__pageContainer').should('be.visible')
     cy.get('.GemDetail-module-scss-module__23wXQa__btnCart', { timeout: 10000 }).scrollIntoView().click({ force: true })
     cy.get('input[placeholder="you@example.com"]', { timeout: 20000 }).should('be.visible')
     cy.get('[class*="AuthModal-module-scss-module__j0NeoW__overlay"]').should('be.visible')
     cy.get('[class*="AuthModal-module-scss-module__"][class*="__card"]').should('be.visible')
    cy.get('input[placeholder="you@example.com"]').type('ceylorait@gmail.com')
    cy.get('input[placeholder="••••••••"]').type('ceylora@123')
    cy.get('button[class*="AuthModal-module-scss-module__"][class*="__submitBtn"]').click()
    cy.url().should('include','/gems/natural-hexagon-garnet-20',{ timeout: 50000 })
    
     
  })
  it('Verify item is added to the cart and displayed in the cart sidebar', () => {
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

      cy.visit('https://houseofceylora.com/gems', {
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

    // Select a gem
    cy.get('img[alt="Natural Hexagon Garnet"]').click();

    // Wait until product page loads
    cy.url().should('include', '/gems/');
    cy.get('.GemDetail-module-scss-module__23wXQa__pageContainer').should('be.visible');

    // Click Add To Cart
    cy.get('.GemDetail-module-scss-module__23wXQa__btnCart', { timeout: 15000 })
      .scrollIntoView()
      .should('contain.text', 'Add To Cart')
      .click();

    // Verify cart sidebar appears
    cy.get('.CartDrawer-module-scss-module__sGxPbG__drawer', { timeout: 10000 }).should('be.visible');

    // Verify added item is displayed in the cart sidebar
    cy.get('.CartDrawer-module-scss-module__sGxPbG__itemName').should('contain.text', 'Natural Hexagon Garnet');

    // Verify quantity (gems are one-of-a-kind)
    cy.get('.CartDrawer-module-scss-module__sGxPbG__gemBadge').should('contain.text', '1 of 1');
  });

  
})