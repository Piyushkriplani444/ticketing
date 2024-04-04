import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, BadRequestError } from "@pkorga/common";
import { User } from "../models/user";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordMatch = await Password.compare(existUser.password, password);

    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    // Generate JWt
    const userJwt = jwt.sign(
      {
        id: existUser.id,
        email: existUser.email,
      },
      process.env.JWT_KEY!
    );

    // Store in session
    req.session = {
      jwt: userJwt,
    };
    return res.status(200).send(existUser);
  }
);

export { router as signinRouter };
