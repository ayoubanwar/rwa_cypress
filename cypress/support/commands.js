/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (username, password) => { 
    cy.visit('/signin');
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('.MuiButton-label').click(); 
 });

 // In cypress/support/commands.js
Cypress.Commands.add('loginByApi', (username, password) => { 
           
        cy.request({
            method: 'POST',
            url: 'http://localhost:3002/login', // Your API endpoint for login
            body: {
              type: "LOGIN", 
              username: username, 
              password: password
          }
          }).then((resp) => {
            const cookieValue = resp.headers['set-cookie'][0].replace(`connect.sid=`, '').replace(`; Path=/; HttpOnly`, '');                 
            window.localStorage.setItem('connect.sid', cookieValue);

            cy.fixture('authState').then((authState) => {
                window.localStorage.setItem('authState', JSON.stringify(authState));
              }); 
          });
  });
  
//Intercepting transaction request to the server
Cypress.Commands.add('transactionPayloadToServer', (transactionType, amount, note, receiverId) => {
    cy.intercept('POST', '/transactions', (req) => {
        expect(req.body).to.include({
            "transactionType": transactionType,
            "amount": amount,
            "description": note,
            "senderId": "uBmeaz5pX",
            "receiverId": receiverId
        })
    }).as(transactionType);
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }