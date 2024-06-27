describe("Login", () => {
    beforeEach(() => {
        // Setup tasks before each test
        cy.loginByApi("Heath93", "s3cret");
        cy.visit('/');
    });

    it('Shoud display all links', ()=>{
        const userFullName = 'Ted P';
        const userName = '@Heath93';

        cy.get('[data-test="sidenav-user-full-name"]').should('be.visible').contains(userFullName);
        cy.get('[data-test="sidenav-username"]').should('be.visible').contains(userName);
        cy.get('[data-test="sidenav-home"]').should('have.attr', 'href', '/').contains('Home');
        cy.get('[data-test="sidenav-user-settings"]').should('have.attr', 'href', '/user/settings').contains('My Account');
        cy.get('[data-test="sidenav-bankaccounts"]').should('have.attr', 'href', '/bankaccounts').contains('Bank Account');
        cy.get('[data-test="sidenav-notifications"]').should('have.attr', 'href', '/notifications').contains('Notification');
        cy.get('[data-test="sidenav-signout"]').contains('Logout');
    });

    it('Should logout', ()=>{
        cy.get('[data-test="sidenav-signout"]').click()
        cy.url().should('contains', '/signin');
      })
});