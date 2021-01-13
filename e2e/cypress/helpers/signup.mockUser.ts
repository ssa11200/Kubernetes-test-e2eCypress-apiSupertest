export const signupMockAuth = () => {
  const mockAuth = {
    email: "mock@email.com",
    name: "mock-user",
    password: "password",
  };

  cy.request("DELETE", "/api/users/mock-auth").as("deleteMockUser");
  cy.request("POST", "/api/users/signup", mockAuth);

  return { email: mockAuth.email, name: mockAuth.name };
};
