import type { Request, Response } from "express";
import { verifyAccessToken, verifyRefreshToken } from "../utils/jwt.ts";

// Interface for request with user
interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
  };
}

// Authenticate access token
export const authenticateUser = (req: Request, res: Response, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const decoded = verifyAccessToken(token);
    // Check if refresh token is valid
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const decodedRefreshToken = verifyRefreshToken(refreshToken);
    if (!decodedRefreshToken) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    // Check if access token is valid
    const decodedAccessToken = verifyAccessToken(token);
    if (!decodedAccessToken) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    (req as RequestWithUser).user = decoded as RequestWithUser["user"];
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
