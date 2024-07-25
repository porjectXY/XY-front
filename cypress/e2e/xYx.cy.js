describe('funcionalidad login ', () => {
  it('cargue login', () => {
    cy.visit('/login')
    cy.get('button').contains('Login')
  })
  it('Probar el Login', () => {
    cy.intercept('POST', 'http://localhost:5173/login').as('loginRequest')
    cy.visit('/login')
    cy.get('input[name="email"]').type('john.doe@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()

    cy.get('button').contains('Post').should('be.visible')
    cy.url().should('include', '/')
  })
})
