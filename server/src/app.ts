import express from "express";
// removes the need to call next() on async errors (can just throw)
import "express-async-errors";
import cookieSession from "cookie-session";
import { json } from "body-parser";

import { authRouter } from "./components/auth/auth.routes";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";

const app = express();

app.use(json());

// trust the ingress-nginx proxy
app.set("trust proxy", true);

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    signed: false, // don't encrypt as we are using jwts are already tamper resistant!
  })
);

app.use(authRouter);

app.all("*", (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
