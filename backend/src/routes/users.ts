import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/sign-up",
  [
    check("email", "Email is required.").isEmail(),
    check(
      "password",
      "A password with 6 or more characters is required."
    ).isLength({ min: 6 }),
    check("firstName", "First name is required.").isString(),
    check("lastName", "Last name is required.").isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({
          message: "This email is already in use. Please use another one.",
        });
      }

      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      return res.sendStatus(200);
    } catch (error) {
      res.status(500).send({ message: "Oops, something went wrong." });
    }
  }
);

export default router;
