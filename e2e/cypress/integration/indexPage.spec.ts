const BASE_URL = Cypress.env("BASE_URL");

context("indexPage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("asserts welcome message", () => {
    cy.get("#__next").should("contain", "Welcome");
  });

  it("goes to signup page when click on signup button", () => {
    cy.get(".ui.blue.huge.button").should("contain", "Sign Up").click();
    cy.url().should("eq", BASE_URL + "/signup");
  });

  it("goes to signin page when click on navbar login", () => {
    cy.get("#navbar").contains("a", "Log in").click();
    cy.url().should("eq", BASE_URL + "/signin");
  });

  it("stays in index page when click on logo", () => {
    cy.get("#navbar").contains("div", "Test app").click();
    cy.url().should("eq", BASE_URL + "/");
  });
});
