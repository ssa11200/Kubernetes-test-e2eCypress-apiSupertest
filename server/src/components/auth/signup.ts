import { Router, Request, Response } from "express";
import { User } from "../../models/user";
import { createToken } from "../../services/createToken";
import { BadRequestError } from "../../errors/bad-request-error";
import { validateBody } from "../../middlewares/json-validator";

const signupRouter = Router();
const signupSchema = require("./signup.schema.json");

signupRouter.post(
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

export { signupRouter };
