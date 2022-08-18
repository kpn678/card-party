Cypress.Commands.add("create", () => {
  const baseURL = 'http://localhost:3000';
  cy.intercept('GET', 'https://complimentr.com/api', {
    fixture: "compliment.json",
    statusCode: 200
  });
  cy.visit(baseURL);
  cy.get('.compliments-button').click();
  cy.get('.to-input').type('Scott');
  cy.get('.message-input').type('U R GR8!!!!!!!');
  cy.get('.from-input').type('A. C. G. K.');
  cy.get('.make-card-button').click();
});

Cypress.Commands.add("save", () => { 
  cy.get('.save-card-button').click();
  cy.intercept('GET', 'https://complimentr.com/api', {
    fixture: "compliment2.json",
    statusCode: 200
  });
  cy.get('h1').click();
  cy.get('.compliments-button').click();
  cy.get('.to-input').type('Travis');
  cy.get('.message-input').type('U R A SUPASTAR!!!!!!!');
  cy.get('.from-input').type('K. G. C. A.');
  cy.get('.make-card-button').click();
  cy.get('.save-card-button').click();
})