import request from "supertest";
import { app } from "../app";
import { UserRole } from "../types/UserRole";
// sets up authenticated test requests

export const signin = async (userType?: UserRole) => {
  const email = "test@test.com";
  const password = "password";

  const address = "Farthing Fields";
  const lat = 51.5047424;
  const lng = -0.05570559;
  const type = userType || UserRole.VOLUNTEER;
  const preferredRange = 1000;

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      name: "david",
      password,
      type,
      address,
      lat,
      lng,
      preferredRange,
    })
    .expect(201);

  // set cookie
  const cookie = response.get("Set-Cookie");
  return { cookie, user: { email, password, type } };
};
