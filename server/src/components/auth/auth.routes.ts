import { Router, Request, Response } from "express";
import { User, UserDocument } from "../../models/user";
import { createToken } from "../../services/createToken";
import { BadRequestError } from "../../errors/bad-request-error";
import { validateBody } from "../../middlewares/json-validator";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { body } from "express-validator";
import { PasswordManager } from "../../services/password-manager";
import { RequestUser } from "../../types/RequestUser";

const authRouter = Router();
const signupSchema = require("./signup.schema.json");

// augment Request object
declare global {
  namespace Express {
    interface Request {
      currentUser?: RequestUser;
    }
  }
}

//only in dev env for cypress testing
if (process.env.BASE_URL?.includes("localhost")) {
  authRouter.post(
    "/api/users/mock-auth",
    [body("email").isEmail().withMessage("Valid email is required")],
    validateRequest,
    async (req: Request, res: Response) => {
      const { email } = req.body;

      let user: UserDocument;

      // check if user exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        //return the user if user already exists
        user = existingUser;
      } else {
        // build the user if its a new user
        user = User.build({
          email: email,
          name: "mock-user",
          password: "password",
        });

        await user.save();
      }

      const userJwt = createToken(user.toObject());
      // store jwt in session object
      // @ts-ignore
      req.session = {
        jwt: userJwt,
      };

      res.send(user);
    }
  );
}

if (process.env.BASE_URL?.includes("localhost")) {
  authRouter.delete(
    "/api/users/mock-auth",
    async (req: Request, res: Response) => {
      try {
        //delete currentUser in req object, delete session, delete user
        delete req.currentUser;
        req.session = null;
        await User.findOneAndDelete({ name: "mock-user" });
      } catch {
        throw new BadRequestError("user does not exists");
      }

      res.status(200);
    }
  );
}

authRouter.post(
  "/api/users/signup",
  validateBody(signupSchema),
  async (req: Request, res: Response) => {
    const { email, name, password } = req.body;

    // check email is not taken
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    // create a user and save (using our custom build method for type safety)
    // password will be hashed by Mongoose pre hook

    const user = User.build({
      email,
      name,
      password,
    });
    await user.save();

    const userJwt = createToken(user.toObject());
    // store jwt in session object
    // @ts-ignore
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

authRouter.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError("Invalid Credentials");
    }

    const passwordMatches = await PasswordManager.compare(
      user.password,
      password
    );

    if (!passwordMatches) {
      throw new BadRequestError("Invalid Credentials");
    }

    const userJwt = createToken(user.toObject());

    // @ts-ignore
    req.session = {
      jwt: userJwt,
    };

    console.log(userJwt);

    res.send(user);
  }
);

authRouter.get("/api/users/currentuser", currentUser, async (req, res) => {
  if (!req.currentUser) {
    return res.send({ currentUser: null });
  }

  // check the user hasn't been deleted (thereby invalidating the token)
  const user = await User.findById(req.currentUser.id);

  if (!user) {
    return res.send({ currentUser: null });
  }

  return res.send({ currentUser: req.currentUser || null });
});

authRouter.post("/api/users/signout", currentUser, requireAuth, (req, res) => {
  delete req.currentUser;
  req.session = null;
  res.send({});
});

export { authRouter };
