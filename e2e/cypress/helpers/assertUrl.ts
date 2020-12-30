export const assertUrl = (url: string) => {
  return cy.url().should("eq", url);
};
