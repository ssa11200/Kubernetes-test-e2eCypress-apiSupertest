import request from "supertest";
import { app } from "../../../app";
import { UserRole } from "../../../types/UserRole";

it("returns 200 on valid signin", async () => {
  // signup
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "david@defty.com",
      name: "david",
      password: "password",
      type: UserRole.VOLUNTEER,
      address: "Farthing Fields",
      preferredRange: 1000,
      lat: 51.5047424,
      lng: -0.05570559,
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({ email: "david@defty.com", password: "password" })
    .expect(200);
});

it("returns 400 on invalid signin", async () => {
  // signup
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "david@defty.com",
      name: "david",
      password: "password",
      type: UserRole.VOLUNTEER,
      preferredRange: 1000,
      address: "Farthing Fields",
      lat: 51.5047424,
      lng: -0.05570559,
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({ email: "david@defty.com", password: "wrongpassword" })
    .expect(400);
});

it("sets a cookie after successful signin", async () => {
  // signup
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "david@defty.com",
      name: "david",
      password: "password",
      type: UserRole.VOLUNTEER,
      address: "Farthing Fields",
      preferredRange: 1000,
      lat: 51.5047424,
      lng: -0.05570559,
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "david@defty.com", password: "password" })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
