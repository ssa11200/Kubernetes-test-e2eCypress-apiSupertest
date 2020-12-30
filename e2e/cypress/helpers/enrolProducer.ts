import { EnrollmentStage } from "../../types/EnrollmentStage";
import { assertUrl } from "./assertUrl";

export const enrolProducer = (businessName: string) => {
  const BASE_URL = Cypress.env("BASE_URL");
  cy.visit("/enrol");
  assertUrl(BASE_URL + `/enrol`);

  cy.get("input").focus().type(businessName);
  cy.get(".react-select__menu") // find opened dropdown
    .find(".react-select__option") // find all options
    .first()
    .click(); // click on first option

  cy.get("#skip-survey").should("exist").click();

  assertUrl(BASE_URL + `/enrol?stage=${EnrollmentStage.CUSTOM_SELECTION}`);

  // click first available option
  cy.get("#program-options")
    .should("exist")
    .find(".program-option")
    .first()
    .find("button")
    .first()
    .click();

  cy.get("#selected-programs").should("exist");
  cy.get(".selected-program")
    .should("exist")
    .find("input")
    .first()
    .clear()
    .type("10000");

  // submit
  cy.get(".confirmation-button").should("exist").click();

  // confirm enrollment
  assertUrl(BASE_URL + `/enrol?stage=${EnrollmentStage.CONFIRMATION}`);

  cy.get("table").should("exist");
  cy.get(".confirmation-button").should("exist").click();

  cy.get("body").contains("Enrollment Complete").should("exist");
  cy.get("#enrollment-results").should("exist");
  cy.get("#provisional-enrollment-warning").should("not.exist");
  cy.get("#home-button").should("exist").click();

  assertUrl(BASE_URL + "/dashboard");
};
