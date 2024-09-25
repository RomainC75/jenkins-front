// import cy from "cypress"

describe('Home Page Interactions', () => {
  it('should open the modal on button click', () => {
    cy.visit('http://localhost:3000');

    cy.contains('Open Modal').click();
    cy.get('.modal').should('be.visible');
    cy.get('.modal h2').should('contain', 'Sign Up');
  });

  // it('should allow the user to enter their email', () => {
  //   cy.get('.modal input').type('user@example.com');
  //   cy.get('.modal input').should('have.value', 'user@example.com');
  // });
});