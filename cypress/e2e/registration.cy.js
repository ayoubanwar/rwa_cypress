describe('Registration', () => {

  beforeEach(() => {
    // Setup tasks before each test
    cy.visit('http://localhost:3000/signup');
  });

  it('Create an account', () => {    
    cy.get('#firstName').type('Ali'); 
    cy.get('#lastName').type('Rami'); 
    cy.get('#username').type('Ali_rami'); 
    cy.get('#password').type('Ali123'); 
    cy.get('#confirmPassword').type('Ali123');  
    cy.get('[data-test="signup-submit"]').click();  
    cy.url().should('include', '/signin');
  });

  it('Display error messages under empty fields', ()=>{
    cy.get('#firstName').click(); 
    cy.get('#lastName').click(); 
    cy.get('#username').click(); 
    cy.get('#password').click(); 
    cy.get('#confirmPassword').click();
    cy.get('#firstName').click();

    cy.get('#firstName-helper-text').should('be.visible').and('have.text', 'First Name is required');
    cy.get('#lastName-helper-text').should('be.visible').and('have.text', 'Last Name is required');
    cy.get('#username-helper-text').should('be.visible').and('have.text', 'Username is required');
    cy.get('#password-helper-text').should('be.visible').and('have.text', 'Enter your password');
    cy.get('#confirmPassword-helper-text').should('be.visible').and('have.text', 'Confirm your password');
  });

  it('Display Password must contain at least 4 characters', () => {    
    cy.get('#password').type('123');   
    cy.get('#confirmPassword').click();
    cy.get('#password-helper-text').should('be.visible').and('have.text', 'Password must contain at least 4 characters');
  });

  it('Display Password does not match', () => {    
    cy.get('#password').type('1234');  
    cy.get('#confirmPassword').type('1235'); 
    cy.get('#confirmPassword-helper-text').should('be.visible').and('have.text', 'Password does not match');
  });
  
})