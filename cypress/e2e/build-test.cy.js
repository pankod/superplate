/// <reference types="cypress" />

describe("build test", () => {
    it("should build", () => {
        cy.visit("http://localhost:3000");

        cy.contains("Sign in").click();

        cy.wait(1000);

        cy.contains("Blog").should("exist");
    });
});
