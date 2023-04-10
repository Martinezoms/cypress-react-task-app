/// <reference types="Cypress" />

describe('task page', () => {
  it('should render the main image', () => {
    cy.visit('http://localhost:5173/');
    cy.get('.main-header img').should('be.visible');
  });

  it('should display the page title', () => {
    cy.visit('http://localhost:5173/');
    cy.get('h1').should('have.length', 1);
    cy.get('h1').contains('React Tasks');
  });
});
