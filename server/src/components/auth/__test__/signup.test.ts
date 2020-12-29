import request from "supertest";
import { app } from "../../../app";
import { UserRole } from "../../../types/UserRole";

it("returns a 201 on successful signup", async () => {
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
});

it("returns 400 if invalid email was used", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "david",
      name: "david",
      password: "password",
      type: UserRole.VOLUNTEER,
      address: "Farthing Fields",
      preferredRange: 1000,
      lat: 51.5047424,
      lng: -0.05570559,
    })
    .expect(400);
});

it("returns 400 if invalid password was used", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "david@defty.com",
      name: "david",
      password: "1",
      type: UserRole.VOLUNTEER,
      address: "Farthing Fields",
      preferredRange: 1000,
      lat: 51.5047424,
      lng: -0.05570559,
    })
    .expect(400);
});

it("returns 400 if a field is missing", async () => {
  // missing type
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "david@defty.com",
      name: "david",
      password: "password",
      address: "Farthing Fields",
      preferredRange: 1000,
      lat: 51.5047424,
      lng: -0.05570559,
    })
    .expect(400);

  // missing password
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "david@defty.com",
      name: "david",
      type: UserRole.VOLUNTEER,
      address: "Farthing Fields",
      preferredRange: 1000,
      lat: 51.5047424,
      lng: -0.05570559,
    })
    .expect(400);

  // missing name
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "david@defty.com",
      password: "password",
      type: UserRole.VOLUNTEER,
      address: "Farthing Fields",
      preferredRange: 1000,
      lat: 51.5047424,
      lng: -0.05570559,
    })
    .expect(400);

  // missing email
  await request(app)
    .post("/api/users/signup")
    .send({
      name: "david",
      password: "password",
      type: UserRole.VOLUNTEER,
      address: "Farthing Fields",
      preferredRange: 1000,
      lat: 51.5047424,
      lng: -0.05570559,
    })
    .expect(400);

  // missing address
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "david@defty.com",
      name: "david",
      password: "password",
      type: UserRole.VOLUNTEER,
      preferredRange: 1000,
      lat: 51.5047424,
      lng: -0.05570559,
    })
    .expect(400);

  // missing lat
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "david@defty.com",
      name: "david",
      password: "password",
      type: UserRole.VOLUNTEER,
      preferredRange: 1000,
      address: "Farthing Fields",
      lng: -0.05570559,
    })
    .expect(400);

  // missing lng
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
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
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
    .expect(400);
});

it("sets a cookie after a successful signup", async () => {
  const response = await request(app)
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

  expect(response.get("Set-Cookie")).toBeDefined();
});
