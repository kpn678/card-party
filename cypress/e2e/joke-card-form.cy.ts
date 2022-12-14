describe('Joke Card Form Flow', () => {
  beforeEach(()=> {
    cy.intercept('GET', 'https://asands17-jokes-api.herokuapp.com/joke', {
      fixture: "joke.json",
      statusCode: 200
    });
    cy.visit('http://localhost:3000/');
    cy.get('.jokes-button').click();
  });

  it('Should display an error to the user if jokes do not load', () => {
    cy.intercept('GET', 'https://asands17-jokes-api.herokuapp.com/joke', {
      statusCode: 400
    });
    cy.visit('http://localhost:3000/create-card')
      .contains('.error-alert', 'Sorry, we can\'t load this page right now. Maybe go read a book or something?')
  });

  it('Should display an error to the user if jokes do not load', () => {
    cy.intercept('GET', 'https://asands17-jokes-api.herokuapp.com/joke', {
      statusCode: 500
    });
    cy.visit('http://localhost:3000/create-card')
      .contains('.error-alert', 'Sorry, we can\'t load this page right now. Maybe go read a book or something?')
  });

  it('Should display a header and Joke Card form', () => {
    cy.contains('h1', 'Card Party');
    cy.get('form');
  });

  it('Should be able to generate a new joke', () => {
    cy.intercept('GET', 'https://asands17-jokes-api.herokuapp.com/joke', {
      fixture: "joke2.json",
      statusCode: 200
    });
    cy.get('.get-quote-button').click();
    cy.get('form').within(() => {
      cy.contains('.quote', 'Love does not hurt. Chuck Norris does.')
    });
  });

  it('Should be able to fill out input fields', () => {
    cy.get('form').within(() => {
      cy.get('.to-input').type('Scott');
      cy.contains('.quote', 'I would love to change the world but they won’t give me the source code.');
      cy.get('.message-input').type('U R GR8!!!!!!!');
      cy.get('.from-input').type('A. C. G. K.');
    });
  });

  it('Should be able to make a card and go to Card Preview Page', () => {
    cy.get('form').within(() => {
      cy.get('.to-input').type('Scott');
      cy.get('.message-input').type('U R GR8!!!!!!!');
      cy.get('.from-input').type('A. C. G. K.');
      cy.get('.make-card-button').click();
    });
    cy.url().should('eq', 'http://localhost:3000/preview-card');
  });

  it('Should be able to return home by clicking the title', () => {
    cy.get('h1').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});