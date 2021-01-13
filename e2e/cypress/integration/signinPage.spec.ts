import { deleteMockAuth } from "../helpers/delete.mockAuth";
import mockAuth from "../helpers/mockAuthUser";
import { signupMockAuth } from "../helpers/signup.mockUser";

export {};

const BaseUrl = Cypress.env("BASE_URL");

context("signinPage", () => {
  before(() => {
    deleteMockAuth();
  });

  beforeEach(() => {
    cy.visit("/signin");
  });

  it("asserts sign in form elements", () => {
    cy.get("#__next").should("contain", "Log In");
    cy.get("form").should("exist");
    cy.get("form").get("input[name='email']").should("exist");
    cy.get("form").get("input[name='password']").should("exist");
    cy.get("form").get("button").should("contain", "Submit");
  });

  it("shows error if input fields are empty and form is submitted", () => {
    cy.get("form").find("button").click();

    cy.get("form").get(".ui.negative.message").should("have.length", 2);

    cy.get("form")
      .get(".ui.negative.message")
      .eq(0)
      .should("have.text", "Email is required");

    cy.get("form")
      .get(".ui.negative.message")
      .eq(1)
      .should("have.text", "Password is required");
  });

  it.only("submits the form with mock auth values and goes to dashboard page", () => {
    signupMockAuth();
    cy.get("form").get("input[name='email']").type(mockAuth.email);
    cy.get("form").get("input[name='password']").type(mockAuth.password);
    cy.get("form").find("button").click();
    cy.location("pathname", { timeout: 8000 }).should("include", "/dashboard"); //waits for the url to include /dashboard on 8000 ms timeout
    cy.getCookie("session").should("exist");
    cy.url().should("eq", BaseUrl + "/dashboard");
  });
});
