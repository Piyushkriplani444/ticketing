import { CustomError } from "./customErrors";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super("Not authorised");
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not authorised" }];
  }
}
