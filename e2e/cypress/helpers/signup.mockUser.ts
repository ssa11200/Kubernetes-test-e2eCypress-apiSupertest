import { deleteMockAuth } from "./delete.mockAuth";
import mockAuth from "./mockAuthUser";

export const signupMockAuth = () => {
  deleteMockAuth();
  cy.request("POST", "/api/users/signup", mockAuth);

  return { email: mockAuth.email, name: mockAuth.name };
};
