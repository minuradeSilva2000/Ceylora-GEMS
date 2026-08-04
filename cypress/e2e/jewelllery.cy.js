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
})