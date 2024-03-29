import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post(
  "/sign-in",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Sign in failed due to invalid credentials" });
      }

      const passwordDoesMatch = await bcrypt.compare(password, user.password);

      if (!passwordDoesMatch) {
        return res
          .status(400)
          .json({ message: "Sign in failed due to invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      res.status(200).json({ userId: user._id, message: "Sign in successful" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Oops, something went wrong." });
    }
  }
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

router.post("/sign-out", (req: Request, res: Response) => {
  res.cookie("access_token", "", {
    expires: new Date(0),
  });
  res.send();
});

export default router;
