import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customErrors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   console.log("Something went wrong", err);
  if (err instanceof CustomError) {
    console.log("Handling the error as a reqest validation error");

    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
};
