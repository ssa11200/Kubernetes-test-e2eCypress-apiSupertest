export const getIframeBody = () => {
  // get the iframe > document > body
  // and retry until the body element is not empty
  return (
    cy
      .get("iframe")
      .its("0.contentDocument.body")
      .should("not.be.empty")
      // wraps "body" DOM element to allow
      // chaining more Cypress commands, like ".find(...)"
      // https://on.cypress.io/wrap
      .then(cy.wrap)
  );
};
