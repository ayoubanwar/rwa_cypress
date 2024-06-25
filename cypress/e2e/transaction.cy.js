describe('Registration', () => {

    beforeEach(() => {
      // Setup tasks before each test   
      cy.login('Heath93', 's3cret');
    });
  
    it('Authenticated user searching for a contact and make a payment', () => {    
        const contact = 'Kristian Bradtke';
        const amount = '123';
        const note = 'Happy payment';


        cy.get('[data-test="nav-top-new-transaction"]').click();
        cy.get('[data-test="user-list-search-input"]').type(contact);
        cy.get('[data-test*="user-list-item-"]').contains(contact).click();
        cy.get('#amount').type(amount);
        cy.get('#transaction-create-description-input').type(note);
        cy.get('[data-test="transaction-create-submit-payment"]').click();
        cy.get('[data-test="transaction-contact"]').contains(contact);
        cy.get('[data-test="transaction-summary"]').contains(amount).and('contain.text', note);
    });
      
  })