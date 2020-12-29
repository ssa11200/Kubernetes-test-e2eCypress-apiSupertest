import { Request, Response, NextFunction } from "express";

import { UserRole } from "../types/UserRole";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireRole = (requiredRoles: UserRole[]) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  const userRoles = req.currentUser!.roles;

  let hasValidRole = false;

  for (let role of requiredRoles) {
    if (userRoles.includes(role)) {
      hasValidRole = true;
      break;
    }
  }

  if (!hasValidRole) {
    throw new NotAuthorizedError();
  }

  next();
};
