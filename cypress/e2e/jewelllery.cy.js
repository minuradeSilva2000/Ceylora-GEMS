describe('test gems page correctly working corrct flow', () => {

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
})