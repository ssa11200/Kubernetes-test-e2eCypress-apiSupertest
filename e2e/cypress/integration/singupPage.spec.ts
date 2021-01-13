import { deleteMockAuth } from "../helpers/delete.mockAuth";
import mockAuth from "../helpers/mockAuthUser";

export {};

const BaseUrl = Cypress.env("BASE_URL");

context("signupPage", () => {
  before(() => {
    deleteMockAuth();
  });

  beforeEach(() => {
    cy.visit("/signup");
  });

  it("asserts sign up form elements", () => {
    cy.get("#__next").should("contain", "Sign Up");
    cy.get("form").should("exist");
    cy.get("form").get("input[name='email']").should("exist");
    cy.get("form").get("input[name='username']").should("exist");
    cy.get("form").get("input[name='password']").should("exist");
    cy.get("form").get("button").should("contain", "Submit");
  });

  it("shows error if input fields are empty and form is submitted", () => {
    cy.get("form").find("button").click();

    cy.get("form").get(".ui.negative.message").should("have.length", 3);

    cy.get("form")
      .get(".ui.negative.message")
      .eq(0)
      .should("have.text", "Email is required");

    cy.get("form")
      .get(".ui.negative.message")
      .eq(1)
      .should("have.text", "Name is required");

    cy.get("form")
      .get(".ui.negative.message")
      .eq(2)
      .should("have.text", "Password is required");
  });

  it("submits the form with mock auth values and goes to dashboard page", () => {
    cy.get("form").get("input[name='email']").type(mockAuth.email);
    cy.get("form").get("input[name='username']").type(mockAuth.name);
    cy.get("form").get("input[name='password']").type(mockAuth.password);
    cy.get("form").find("button").click();
    cy.location("pathname", { timeout: 8000 }).should("include", "/dashboard"); //waits for the url to include /dashboard on 8000 ms timeout
    cy.getCookie("session").should("exist");
    cy.url().should("eq", BaseUrl + "/dashboard");
  });
});
