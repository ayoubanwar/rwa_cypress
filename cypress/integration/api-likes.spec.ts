// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// check this file using TypeScript if available
// @ts-check

const faker = require("faker");

const apiUrl = "http://localhost:3001";
const apiLikes = `${apiUrl}/likes`;

describe("Likes API", function() {
  before(function() {
    //cy.task("db:reset");
    cy.task("db:seed");
    // TODO: Refactor
    // hacks/experiements
    cy.fixture("users").as("users");
    cy.fixture("transactions").as("transactions");
    cy.get("@users").then(user => (this.currentUser = this.users[0]));
    cy.get("@transactions").then(
      transactions => (this.transactions = transactions)
    );
  });

  beforeEach(function() {
    const { username } = this.currentUser;
    cy.apiLogin(username);
  });

  afterEach(function() {
    cy.task("db:seed");
  });

  context("GET /likes/:transaction_id", function() {
    it("gets a list of likes for a transaction", function() {
      const transaction = this.transactions[0];

      cy.request("GET", `${apiLikes}/${transaction.id}`).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.likes.length).to.eq(1);
      });
    });
  });

  context("POST /likes/:transaction_id", function() {
    it("creates a new like for a transaction", function() {
      const transaction = this.transactions[0];

      cy.request("POST", `${apiLikes}/${transaction.id}`, {
        transaction_id: transaction.id
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.like.id).to.be.a("string");
      });
    });
  });
});