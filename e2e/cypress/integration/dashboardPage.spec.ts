import { deleteMockAuth } from "../helpers/delete.mockAuth";
import { signinpMockAuth } from "../helpers/signin.mockAuth";
import mockAuth from "../helpers/mockAuthUser";

export {};

context("signinPage", () => {
  before(() => {
    deleteMockAuth();
    signinpMockAuth();
  });

  beforeEach(() => {
    cy.visit("/dashboard");
  });

  after(() => {
    deleteMockAuth();
  });

  //tests
  it("finds user's name in the dashboard", () => {
    cy.get("#__next").should("contain", `${mockAuth.name} signed in`);
  });
});
