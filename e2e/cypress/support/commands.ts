// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import "cypress-wait-until";

Cypress.Commands.add(
  "customGet",
  (selector: string, injectCyTarget?: boolean) => {
    const target = injectCyTarget ? `[data-cy=${selector}]` : selector;

    return cy
      .waitUntil(() => cy.get(target).should("exist"))
      .then(() => cy.get(target));
  }
);

Cypress.Commands.add("getDataCy", (selector: string) => {
  const target = `[data-cy=${selector}]`;

  return cy
    .waitUntil(() => cy.get(target).should("exist"))
    .then(() => cy.get(target));
});
