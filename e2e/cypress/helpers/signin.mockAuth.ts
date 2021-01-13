import { deleteMockAuth } from "./delete.mockAuth";
import mockAuth from "./mockAuthUser";
import { signupMockAuth } from "./signup.mockUser";

export const signinpMockAuth = () => {
  deleteMockAuth();
  signupMockAuth();

  cy.request("POST", "/api/users/signin", {
    email: mockAuth.email,
    password: mockAuth.password,
  });

  return { email: mockAuth.email, name: mockAuth.name };
};
