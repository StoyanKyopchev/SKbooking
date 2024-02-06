import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["access_token"];
  if (!token) {
    return res.status(401).json({ message: "Unathorized" });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    req.userId = (decodedToken as JwtPayload).userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unathorized" });
  }
};

export default verifyToken;
