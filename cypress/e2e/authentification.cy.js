describe('Authentificatioin', () => {

    beforeEach(() => {
      // Setup tasks before each test
      cy.visit('/signin');
    });
  
    it('Authenticate correctly', () => { 
      cy.get('#username').type('Heath93');
      cy.get('#password').type('s3cret');
      cy.get('.MuiButton-label').click(); 
      cy.get('[data-test=sidenav-user-full-name]').should('be.visible');
    });  
    
    it('Wrong username no login', () => { 
        cy.get('#username').type('Wrong123');
        cy.get('#password').type('s3cret');
        cy.get('.MuiButton-label').click(); 
        cy.get('[data-test="signin-error"]').should('be.visible').and('have.text', 'Username or password is invalid');
      });  

      it('Wrong password no login', () => { 
        cy.get('#username').type('Heath93');
        cy.get('#password').type('wrongPassword');
        cy.get('.MuiButton-label').click(); 
        cy.get('[data-test="signin-error"]').should('be.visible').and('have.text', 'Username or password is invalid');
      });   

      it('Empty username error massage displayed', () => { 
        cy.get('#username').click();
        cy.get('#password').click();
        cy.get('#username-helper-text').should('be.visible').and('have.text', 'Username is required');
      }); 
  })