export const getInputByName = (name: string) => {
  return cy.customGet(`input[name='${name}']`);
};
