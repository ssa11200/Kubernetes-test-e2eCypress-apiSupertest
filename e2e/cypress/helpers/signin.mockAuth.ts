import { deleteMockAuth } from "./delete.mockAuth";
import mockAuth from "./mockAuthUser";

export const signupMockAuth = () => {
  deleteMockAuth();

  cy.request("POST", "/api/users/sigin", {
    email: mockAuth.email,
    password: mockAuth.password,
  });

  return { email: mockAuth.email, name: mockAuth.name };
};
