export const deleteMockAuth = () => {
  cy.request("DELETE", "/api/users/mock-auth");
};
