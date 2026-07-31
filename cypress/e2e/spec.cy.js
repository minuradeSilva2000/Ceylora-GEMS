describe('template spec', () => {
  it('Verify the House of Ceylora home page loads successfully', () => {
    cy.visit('https://houseofceylora.com')
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

  
})