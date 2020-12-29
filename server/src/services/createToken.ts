import jwt from "jsonwebtoken";

export const createToken = (user: object) => {
  const userJwt = jwt.sign(user, process.env.JWT_KEY!);
  return userJwt;
};
