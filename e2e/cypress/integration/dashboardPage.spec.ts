import { deleteMockAuth } from "../helpers/delete.mockAuth";

export {};

const BaseUrl = Cypress.env("BASE_URL");

context("signinPage", () => {
  before(() => {
    deleteMockAuth();
  });

  beforeEach(() => {
    cy.visit("/dashboard");
  });

  //tests
});
