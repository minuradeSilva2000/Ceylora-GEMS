describe('template spec', () => {
  it('Verify the House of Ceylora home page loads successfully', () => {
    cy.visit('https://houseofceylora.com')
  })
  it('Verify user can navigate to the Gems page from the navigation menu', () => {
    cy.visit('https://houseofceylora.com')
    cy.get('nav[class*="MainNav"]', { timeout: 10000 }).should('be.visible')
    cy.contains('GEMS').click()
    cy.url().should('include', '/gems')
    cy.get('a[class*="link--active"]').contains('GEMS').should('be.visible')
  })
})