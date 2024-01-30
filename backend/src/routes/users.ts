import express, { Request, Response } from "express";
import User from "../models/user";

const router = express.Router();

router.post("/sign-up", async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).send({ message: "Oops, something went wrong." });
  }
});
