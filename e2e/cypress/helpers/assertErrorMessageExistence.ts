export const assertErrorMessageExistence = (numberOfErrors?: number) => {
  cy.get("body").find(".negative, .message").should("exist");
  // 6 obligatory fields
  if (numberOfErrors !== undefined) {
    cy.get("body")
      .find(".negative, .message")
      .its("length")
      .should("eq", numberOfErrors);
  }
};
