import Ajv from "ajv";

import { NextFunction, Response, Request } from "express";
import { BadRequestError } from "../errors/bad-request-error";

export const validateBody = (schema: JSON, definitions?: JSON[]) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ajv = new Ajv();

  if (definitions && definitions.length > 0) {
    definitions.forEach((definition) => {
      ajv.addSchema(definition);
    });
  }
  const validate = ajv.compile(schema);

  const valid = validate(req.body);

  if (!valid) {
    console.log(validate.errors);
    throw new BadRequestError("Schema Validation Failed");
  }

  return next();
};
