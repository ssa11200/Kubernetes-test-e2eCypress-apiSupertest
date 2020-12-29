import { Router } from "express";
import { User } from "../../models/user";
import { currentUser } from "../../middlewares/current-user";

const currentUserRouter = Router();

export interface RequestUser {
  id: string;
  email: string;
  name: string;
  address: string;
  preferredRange: number;
}

// augment Request object
declare global {
  namespace Express {
    interface Request {
      currentUser?: RequestUser;
    }
  }
}

currentUserRouter.get(
  "/api/users/currentuser",
  currentUser,
  async (req, res) => {
    if (!req.currentUser) {
      return res.send({ currentUser: null });
    }

    // check the user hasn't been deleted (thereby invalidating the token)
    const user = await User.findById(req.currentUser.id);

    if (!user) {
      return res.send({ currentUser: null });
    }

    return res.send({ currentUser: req.currentUser || null });
  }
);

export { currentUserRouter };
