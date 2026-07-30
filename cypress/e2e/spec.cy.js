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
  it('Verify selected gem details are displayed when clicking a gem image', () => {
    cy.visit('https://houseofceylora.com/gems');
    cy.get('img[alt="Sapphire"]').click()
    cy.get('.Gems-module-scss-module__OA-ntW__gemstoneGrid').should('be.visible')
    cy.contains('Heated Blue Sapphire').should('be.visible')
  })
})