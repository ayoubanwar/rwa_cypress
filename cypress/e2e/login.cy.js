describe('Login', () => {

    beforeEach(() => {
      // Setup tasks before each test
      cy.visit('/signin');
    });

    it('Display all signin page elements', () => { 
      //cy.conatains('h1', 'Sign In');
        cy.get('[data-test="signin-title"]').should('be.visible').contains('Sign in');
        cy.get('#username').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('.MuiButton-label').should('be.visible');
        cy.get('[data-test="signup"]').should('be.visible').contains(`Don't have an account? Sign Up`);
      }); 
  
    it('Navigate to home page successful login', () => { 
      cy.get('#username').type('Heath93');
      cy.get('#password').type('s3cret');
      cy.get('.MuiButton-label').click(); 
      cy.get('[data-test=sidenav-user-full-name]').should('be.visible');
    });  
    
    it('No login for wrong username', () => { 
        cy.get('#username').type('Wrong123');
        cy.get('#password').type('s3cret');
        cy.get('.MuiButton-label').click(); 
        cy.get('[data-test="signin-error"]').should('be.visible').and('have.text', 'Username or password is invalid');
      });  

      it('No login for wrong password', () => { 
        cy.get('#username').type('Heath93');
        cy.get('#password').type('wrongPassword');
        cy.get('.MuiButton-label').click(); 
        cy.get('[data-test="signin-error"]').should('be.visible').and('have.text', 'Username or password is invalid');
      });   

      it('Display error for Empty form', () => { 
        cy.get('#username').click();
        cy.get('#password').click();
        cy.get('#username-helper-text').should('be.visible').and('have.text', 'Username is required');
      }); 

      it('Redirect to signup page', () => { 
        cy.get('[data-test="signup"]').click();
        //cy
        //.contains('Don't have an account? Sign Up')
        //.should('have.att', 'href', '#/signup');
        //No need to click trought, we don't need to test the browser behaviour on href click!
        //A test in less, AND in login_spec nothing related to registration_spec
        cy.url().should('include', '/signup');
      });
  })