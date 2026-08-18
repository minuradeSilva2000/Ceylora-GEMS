describe('Admin Gems inventory - End-to-End Functional Test Suite', () => {

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

      cy.visit('https://houseofceylora.com/gems', {
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

    cy.url().should('include', '/gems', { timeout: 30000 });
    cy.get('nav[class*="MainNav"]', { timeout: 15000 }).should('be.visible');
    cy.get('.Gems-module-scss-module__OA-ntW__pageContainer').should('be.visible', { timeout: 30000 });
    
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
    cy.wait(3000)
    
    })
    
     it('Verify the Admin Dashboard loads successfully and the sidebar menu opens on direct visit',()=>{

     cy.visit('https://houseofceylora.com/admin')
     cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
     cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
     cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
     cy.wait(3000)
     
    })


     it('Verify admin user can navigate to the Gems Inventory page successfully from the sidebar menu',()=>{

     cy.visit('https://houseofceylora.com/admin')
     cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
     cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
     cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
     cy.get('a[class*="AdminLayout-module-scss-module__tIFY2q__navItem"]').contains('Gems Inventory').click()
     cy.get('.AdminLayout-module-scss-module__tIFY2q__pageContent').should('be.visible', { timeout: 30000 });
     cy.wait(3000)
    })
    it('Verify admin user can successfully navigate to the Gems Inventory details page from the inventory list',()=>{

     cy.visit('https://houseofceylora.com/admin')
     cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
     cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
     cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
     cy.get('a[class*="AdminLayout-module-scss-module__tIFY2q__navItem"]').contains('Gems Inventory').click()
     cy.get('.AdminLayout-module-scss-module__tIFY2q__pageContent').should('be.visible', { timeout: 30000 });
     cy.get('a[class="GemInventory-module-scss-module__aAoEsG__viewLink"]').eq(0).click({force:true})
     cy.url({ timeout: 30000 }).should('include', '/admin/gems/view/19');
     cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
     cy.get('.GemForm-module-scss-module__6JXq1W__formContainer').should('be.visible', { timeout: 30000 });
     cy.wait(3000)
    })
      it('Verify admin user can view gem details and navigate back to Gems Inventory successfully',()=>{

      cy.visit('https://houseofceylora.com/admin')
      cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
      cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
      cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
      cy.get('a[class*="AdminLayout-module-scss-module__tIFY2q__navItem"]').contains('Gems Inventory').click()
      cy.get('.AdminLayout-module-scss-module__tIFY2q__pageContent').should('be.visible', { timeout: 30000 });
      cy.get('a[class="GemInventory-module-scss-module__aAoEsG__viewLink"]').eq(5).click({force:true})
      cy.url({ timeout: 60000 }).should('include', '/admin/gems/view/16');
      cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
      cy.get('.GemForm-module-scss-module__6JXq1W__formContainer').should('be.visible', { timeout: 30000 });
      cy.get('a[class="GemView-module-scss-module__Nzmfea__backBtn"]').click({force:true})
      cy.url({ timeout: 60000 }).should('include', '/admin/gems');
      cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
      cy.wait(3000)
    })
     it('Verify admin can view gem gallery and switch images using thumbnails successfully',()=>{

      cy.visit('https://houseofceylora.com/admin')
      cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
      cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
      cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
      cy.get('a[class*="AdminLayout-module-scss-module__tIFY2q__navItem"]').contains('Gems Inventory').click()
      cy.get('.AdminLayout-module-scss-module__tIFY2q__pageContent').should('be.visible', { timeout: 30000 });
      cy.get('a[class="GemInventory-module-scss-module__aAoEsG__viewLink"]').eq(1).click({force:true})
      cy.url({ timeout: 60000 }).should('include', '/admin/gems/view/20');
      cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
      cy.get('.GemForm-module-scss-module__6JXq1W__formContainer').should('be.visible', { timeout: 30000 });
      cy.get('a[class="AdminLayout-module-scss-module__tIFY2q__storeLink"]').click({force:true})
      cy.url({ timeout: 60000 }).should('include', '/');
      cy.get('html[class="cinzel_13d77c45-module__dZz2Ea__variable manrope_e77dbc5b-module__M6Ugnq__variable inter_c6329508-module__8rk5pW__variable"]').should('be.visible', { timeout: 30000 });
      cy.wait(3000)

    })

    it('Verify admin user can successfully navigate to the Gems Inventory details page from the inventory list',()=>{

     cy.visit('https://houseofceylora.com/admin')
     cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
     cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
     cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
     cy.get('a[class*="AdminLayout-module-scss-module__tIFY2q__navItem"]').contains('Gems Inventory').click()
     cy.get('.AdminLayout-module-scss-module__tIFY2q__pageContent').should('be.visible', { timeout: 30000 });
     cy.get('a[class="GemInventory-module-scss-module__aAoEsG__viewLink"]').eq(4).click({force:true})
     cy.url({ timeout: 30000 }).should('include', '/admin/gems/view/17');
     cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
     cy.get('.GemForm-module-scss-module__6JXq1W__formContainer').should('be.visible', { timeout: 30000 });
     cy.get('img[class="GemView-module-scss-module__Nzmfea__galleryMainMedia"]').should('be.visible')
     cy.get('img[class="GemView-module-scss-module__Nzmfea__thumbMedia"]').should('have.length.at.least', 3)
      cy.get('img[class*="galleryMainMedia"]').invoke('attr', 'src').then((initialImage) => {
      cy.get('img[class*="thumbMedia"]').eq(1).click()
      cy.get('img[class*="thumbMedia"]').eq(2).click()
      cy.get('img[class*="galleryMainMedia"]').invoke('attr', 'src').should((updatedImage) => {
          expect(updatedImage).not.to.eq(initialImage);
        });

    });
    cy.wait(3000)
    })

     it('Verify admin user can navigate to the gem edit page successfully from the inventory list',()=>{

     cy.visit('https://houseofceylora.com/admin')
     cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
     cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
     cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
     cy.get('a[class*="AdminLayout-module-scss-module__tIFY2q__navItem"]').contains('Gems Inventory').click()
     cy.get('.AdminLayout-module-scss-module__tIFY2q__pageContent').should('be.visible', { timeout: 30000 });
     cy.get('a[class="GemInventory-module-scss-module__aAoEsG__viewLink"]').eq(7).click({force:true})
     cy.url({ timeout: 30000 }).should('include', '/admin/gems/view/14');
     cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
     cy.get('.GemForm-module-scss-module__6JXq1W__formContainer').should('be.visible', { timeout: 30000 });
     cy.get('a[class="GemView-module-scss-module__Nzmfea__editBtn"]').should('be.visible').click({force:true})
     cy.url({ timeout: 30000 }).should('include','/admin/gems/edit/14')
     cy.get('.GemForm-module-scss-module__6JXq1W__formContainer').should('be.visible', { timeout: 30000 });
     cy.wait(3000)
    })


    it('Verify admin can update a gem selling price, save changes, and navigate back to Gems Inventory',()=>{

     cy.visit('https://houseofceylora.com/admin')
     cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
     cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
     cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
     cy.get('a[class*="AdminLayout-module-scss-module__tIFY2q__navItem"]').contains('Gems Inventory').click()
     cy.get('.AdminLayout-module-scss-module__tIFY2q__pageContent').should('be.visible', { timeout: 30000 });
     cy.get('a[class*="GemInventory-module-scss-module__aAoEsG__viewLink"]', { timeout: 60000 }).should('have.length.gte', 8);
     cy.get('a[class*="GemInventory-module-scss-module__aAoEsG__viewLink"]').eq(5).click({force:true})
     cy.url({ timeout: 30000 }).should('include', '/admin/gems/view/16');
     cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
     cy.get('.GemForm-module-scss-module__6JXq1W__formContainer').should('be.visible', { timeout: 30000 });
     cy.get('a[class="GemView-module-scss-module__Nzmfea__editBtn"]').should('be.visible').click({force:true})
     cy.url({ timeout: 30000 }).should('include','/admin/gems/edit/16')
     cy.get('.GemForm-module-scss-module__6JXq1W__formContainer').should('be.visible', { timeout: 30000 });
     cy.get('input[name="selling_price"]').clear().type('5000.00')
     cy.get('button[class="GemForm-module-scss-module__6JXq1W__saveBtn"]').click({force:true})
     cy.url({timeout:30000}).should('include','/admin/gems')
     cy.get('a[class*="GemInventory-module-scss-module__aAoEsG__viewLink"]').eq(5).click({force:true})
     cy.url({ timeout: 30000 }).should('include', '/admin/gems/view/16');
     cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
     cy.get('.AdminLayout-module-scss-module__tIFY2q__pageContent').should('be.visible', { timeout: 30000 });
     cy.wait(3000)
    
    })
    it('Verify admin can successfully upload a valid image when creating  a gem',()=>{

    cy.visit('https://houseofceylora.com/admin')
    cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
    cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
    cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
    cy.get('a[class*="AdminLayout-module-scss-module__tIFY2q__navItem"]').contains('Gems Inventory').click()
    cy.get('.AdminLayout-module-scss-module__tIFY2q__pageContent').should('be.visible', { timeout: 30000 });
    cy.get('a[class="GemInventory-module-scss-module__aAoEsG__addBtn"]').should('be.visible').click({force:true})
    cy.url({ timeout: 30000 }).should('include','/admin/gems/new')
    cy.get('.GemForm-module-scss-module__6JXq1W__formContainer').should('be.visible', { timeout: 30000 });
    cy.get('input[type="file"]').eq(0).selectFile('cypress/fixtures/image1.jpeg', { force: true});
    cy.wait(8000)  
     
  })

    it('Verify admin can successfully upload single and multiple valid images when creating a gem',()=>{

    cy.visit('https://houseofceylora.com/admin')
    cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
    cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
    cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
    cy.get('a[class*="AdminLayout-module-scss-module__tIFY2q__navItem"]').contains('Gems Inventory').click()
    cy.get('.AdminLayout-module-scss-module__tIFY2q__pageContent').should('be.visible', { timeout: 30000 });
    cy.get('a[class="GemInventory-module-scss-module__aAoEsG__addBtn"]').should('be.visible').click({force:true})
    cy.url({ timeout: 30000 }).should('include','/admin/gems/new')
    cy.get('.GemForm-module-scss-module__6JXq1W__formContainer').should('be.visible', { timeout: 30000 });
    cy.get('input[type="file"]').eq(0).selectFile('cypress/fixtures/image4.jpeg', { force: true});
    cy.get('input[type="file"]').eq(1).selectFile(['cypress/fixtures/image5.jpg','cypress/fixtures/image1.jpeg'], { force: true});
    cy.wait(12000)
   }) 
     it('Verify admin can successfully upload single and multiple valid images when creating a gem',()=>{

    cy.visit('https://houseofceylora.com/admin')
    cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
    cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
    cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
    cy.get('a[class*="AdminLayout-module-scss-module__tIFY2q__navItem"]').contains('Gems Inventory').click()
    cy.get('.AdminLayout-module-scss-module__tIFY2q__pageContent').should('be.visible', { timeout: 30000 });
    cy.get('a[class="GemInventory-module-scss-module__aAoEsG__addBtn"]').should('be.visible').click({force:true})
    cy.url({ timeout: 30000 }).should('include','/admin/gems/new')
    cy.get('.GemForm-module-scss-module__6JXq1W__formContainer').should('be.visible', { timeout: 30000 });
    cy.get('input[type="file"]').eq(0).selectFile('cypress/fixtures/image1.jpeg', { force: true});
    cy.get('input[type="file"]').eq(1).selectFile(['cypress/fixtures/image5.jpg','cypress/fixtures/image4.jpeg'], { force: true});
    cy.wait(12000)
   })
    it('Verify admin can upload single and multiple valid images when creating a gem',()=>{

    cy.visit('https://houseofceylora.com/admin')
    cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
    cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
    cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
    cy.get('a[class*="AdminLayout-module-scss-module__tIFY2q__navItem"]').contains('Gems Inventory').click()
    cy.get('.AdminLayout-module-scss-module__tIFY2q__pageContent').should('be.visible', { timeout: 30000 });
    cy.get('a[class="GemInventory-module-scss-module__aAoEsG__addBtn"]').should('be.visible').click({force:true})
    cy.url({ timeout: 30000 }).should('include','/admin/gems/new')
    cy.get('.GemForm-module-scss-module__6JXq1W__formContainer').should('be.visible', { timeout: 30000 });
    cy.get('input[type="file"]').eq(0).selectFile('cypress/fixtures/image6.jpg', { force: true});
    cy.get('input[type="file"]').eq(1).selectFile(['cypress/fixtures/image5.jpg','cypress/fixtures/image4.jpeg'], { force: true});
    cy.get('select[required]').should('have.length', 4);
    cy.get('select[required]').eq(0).select('QTZ').should('have.value', 'QTZ');
    cy.wait(12000)
    
   })
    it('Verify Admin User Can Add a New Gem with Valid Details and Images',()=>{

    cy.visit('https://houseofceylora.com/admin')
    cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
    cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
    cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
    cy.get('a[class*="AdminLayout-module-scss-module__tIFY2q__navItem"]').contains('Gems Inventory').click()
    cy.get('.AdminLayout-module-scss-module__tIFY2q__pageContent').should('be.visible', { timeout: 30000 });
    cy.get('a[class="GemInventory-module-scss-module__aAoEsG__addBtn"]').should('be.visible').click({force:true})
    cy.url({ timeout: 30000 }).should('include','/admin/gems/new')
    cy.get('.GemForm-module-scss-module__6JXq1W__formContainer').should('be.visible', { timeout: 30000 });
    cy.get('input[type="file"]').eq(0).selectFile('cypress/fixtures/image8.jpg', { force: true});
    cy.get('input[type="file"]').eq(1).selectFile(['cypress/fixtures/image6.jpg','cypress/fixtures/image7.jpg'], { force: true});
    cy.get('select[required]').should('have.length', 4);
    cy.get('select[required]').eq(0).select('QTZ').should('have.value', 'QTZ');
    cy.get('select[required]').eq(1).select('QT').should('have.value', 'QT');
    cy.get('select[required]').eq(2).select('D').should('have.value', 'D');
    cy.get('select[required]').eq(3).select('Under Certification').should('have.value', 'Under Certification');
    cy.get('input[name="basic_colour"]').type('Multi-Color (Blue, Red, Orange, Green, Purple, Yellow, Pink)')
    cy.get('input[name="trade_color"]').type('Cornflower Blue')
    cy.get('input[name="weight_carat"]').type('3.2')
    cy.get('select[name="pair_or_single"]').eq(0).select('Matching Pair').should('have.value', 'Matching Pair')
    cy.get('select[name="shape"]').select('Round').should('have.value', 'Round')
    cy.get('input[name="dimensions"]').type('8.2 × 7.5 × 4.8')
    cy.get('select[name="cut_grade"]').eq(0).select('Brilliant').should('have.value', 'Brilliant')
    cy.get('select[name="clarity"]').select('VVS2').should('have.value', 'VVS2')
    cy.get('select[name="transparency"]').select('Transparent').should('have.value', 'Transparent')
    cy.get('input[name="origin"]').type('Brazil')
    cy.get('input[name="certificate"]').type('GIA')
    cy.get('input[name="lab"]').type('GIA0001')
    cy.get('input[name="certificate_number"]').type('GIC-2026-77182689')
    cy.get('input[name="supplier"]').type('Seneth Hettiarchchi')
    cy.get('select[name="location"]').select('Showroom').should('have.value', 'Showroom')
    cy.get('input[name="price"]').type('50000.00')
    cy.get('input[name="certificate_cost"]').type('1500.00')
    cy.get('input[name="selling_price"]').type('89000.00')
   })
   it('Verify Admin User Can Successfully Create and Save a New Gem with Valid Details',()=>{

    cy.visit('https://houseofceylora.com/admin')
    cy.get('.AdminLayout-module-scss-module__tIFY2q__mainContent').should('be.visible', { timeout: 30000 });
    cy.get('.AdminLayout-module-scss-module__tIFY2q__menuBtn ').click()
    cy.get('aside[class="AdminLayout-module-scss-module__tIFY2q__sidebar AdminLayout-module-scss-module__tIFY2q__open"]').should('be.visible', { timeout: 30000 });
    cy.get('a[class*="AdminLayout-module-scss-module__tIFY2q__navItem"]').contains('Gems Inventory').click()
    cy.get('.AdminLayout-module-scss-module__tIFY2q__pageContent').should('be.visible', { timeout: 30000 });
    cy.get('a[class="GemInventory-module-scss-module__aAoEsG__addBtn"]').should('be.visible').click({force:true})
    cy.url({ timeout: 30000 }).should('include','/admin/gems/new')
    cy.get('.GemForm-module-scss-module__6JXq1W__formContainer').should('be.visible', { timeout: 30000 });
    cy.get('input[type="file"]').eq(0).selectFile('cypress/fixtures/image4.jpeg', { force: true});
    cy.get('input[type="file"]').eq(1).selectFile(['cypress/fixtures/image6.jpg','cypress/fixtures/image7.jpg'], { force: true});
    cy.get('select[required]').should('have.length', 4);
    cy.get('select[required]').eq(0).select('QTZ').should('have.value', 'QTZ');
    cy.get('select[required]').eq(1).select('QT').should('have.value', 'QT');
    cy.get('select[required]').eq(2).select('D').should('have.value', 'D');
    cy.get('select[required]').eq(3).select('Available').should('have.value', 'Available');
    cy.get('input[name="basic_colour"]').type('Multi-Color (Blue, Red, Orange, Green, Purple, Yellow, Pink)')
    cy.get('input[name="trade_color"]').type('Cornflower Orange')
    cy.get('input[name="weight_carat"]').type('6.2')
    cy.get('select[name="pair_or_single"]').eq(0).select('Matching Pair').should('have.value', 'Matching Pair')
    cy.get('select[name="shape"]').select('Round').should('have.value', 'Round')
    cy.get('input[name="dimensions"]').type('8.2 × 7.5 × 4.8')
    cy.get('select[name="cut_grade"]').eq(0).select('Brilliant').should('have.value', 'Brilliant')
    cy.get('select[name="clarity"]').select('VVS2').should('have.value', 'VVS2')
    cy.get('select[name="transparency"]').select('Transparent').should('have.value', 'Transparent')
    cy.get('input[name="origin"]').type('Brazil')
    cy.get('input[name="certificate"]').type('GIA')
    cy.get('input[name="lab"]').type('GIA0001')
    cy.get('input[name="certificate_number"]').type('GIC-2026-77182689')
    cy.get('input[name="supplier"]').type('Seneth Hettiarchchi')
    cy.get('select[name="location"]').select('Showroom').should('have.value', 'Showroom')
    cy.get('input[name="price"]').type('50000.00')
    cy.get('input[name="certificate_cost"]').type('1500.00')
    cy.get('input[name="selling_price"]').type('89000.00')
    cy.get('.GemForm-module-scss-module__6JXq1W__saveBtn').click({force:true})
    cy.url({ timeout: 30000 }).should('include','/admin/gems')
   })
})  