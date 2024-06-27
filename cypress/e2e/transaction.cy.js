describe("Transaction", () => {
  beforeEach(() => {
    // Setup tasks before each test
    cy.loginByApi("Heath93", "s3cret");
    cy.visit("/transaction/new");
  });

  it("Display error message for empty fields", () => {
    const receiverName = "Kristian Bradtke";

    cy.get('[data-test="user-list-search-input"]').type(receiverName);
    cy.get('[data-test*="user-list-item-"]').contains(receiverName).click();
    cy.get("#amount").click();
    cy.get("#transaction-create-description-input").click();
    cy.get("#amount").click();
    cy.get("#transaction-create-amount-input-helper-text").contains("Please enter a valid amount");
    cy.get("#transaction-create-description-input-helper-text").contains("Please enter a note");
  });

  it("Authenticated user searching for a receiver and make a payment", () => {
    const receiverName = "Kristian Bradtke";
    const receiverId = "GjWovtg2hr";
    const amount = "123";
    const note = "Happy payment";
    cy.transactionPayloadToServer("payment", amount, note, receiverId);

    cy.get('[data-test="user-list-search-input"]').type(receiverName);
    cy.get('[data-test*="user-list-item-"]').contains(receiverName).click();
    cy.get("#amount").type(amount);
    cy.get("#transaction-create-description-input").type(note);
    cy.get('[data-test="transaction-create-submit-payment"]').click();
    //Sending the right payload to the server
    cy.wait("@payment");
    //Displaying receiver name, amount and the note
    cy.get('[data-test="transaction-contact"]').contains(receiverName);
    cy.get('[data-test="transaction-summary"]').contains(amount).and("contain.text", note);
  });

  it("Authenticated user searching for a receiver and make a request", () => {
    const receiverName = "Darrel Ortiz";
    const receiverId = "_XblMqbuoP";
    const amount = "340";
    const note = "Well received request";
    cy.transactionPayloadToServer("request", amount, note, receiverId);

    cy.get('[data-test="user-list-search-input"]').type(receiverName);
    cy.get('[data-test*="user-list-item-"]').contains(receiverName).click();
    cy.get("#amount").type(amount);
    cy.get("#transaction-create-description-input").type(note);
    cy.get('[data-test="transaction-create-submit-request"]').click();
    //Sending the right payload to the server
    cy.wait("@request");
    //Displaying receiver name, amount and the note
    cy.get('[data-test="transaction-contact"]').contains(receiverName);
    cy.get('[data-test="transaction-summary"]').contains(amount).and("contain.text", note);    
    cy.get('[data-test="new-transaction-return-to-transactions"]')
    .should('have.attr', 'href', '/').contains('Return To Transactions');
    cy.get('[data-test="new-transaction-create-another-transaction"]')
    .contains('Create Another Transaction');
  });

  it.only('Should redirect to transaction`s first step', () => {
    const receiverName = "Darrel Ortiz";
    const receiverId = "_XblMqbuoP";
    const amount = "340";
    const note = "Well received request";
    cy.transactionPayloadToServer("request", amount, note, receiverId);

    cy.get('[data-test="user-list-search-input"]').type(receiverName);
    cy.get('[data-test*="user-list-item-"]').contains(receiverName).click();
    cy.get("#amount").type(amount);
    cy.get("#transaction-create-description-input").type(note);
    cy.get('[data-test="transaction-create-submit-request"]').click();
    //Sending the right payload to the server
    cy.wait("@request");
    //Displaying receiver name, amount and the note
    cy.get('[data-test="transaction-contact"]').contains(receiverName);
    cy.get('[data-test="transaction-summary"]').contains(amount).and("contain.text", note);
    //Second transaction    
    cy.get('[data-test="new-transaction-create-another-transaction"]').click();
    cy.get('[data-test="user-list-search-input"]').should('be.visible');
  })
});
