import type { Request, Response } from "express";
import { validateEmail } from "../utils/validateEmail";
import { comparePassword } from "../utils/encrypt";
import { signInAccessToken, signInRefreshToken } from "../utils/jwt";
import { getAdminByEmail } from "../models/admin.model";

type SignInRequest = Request & {
  body: {
    email: string;
    password: string;
  };
};

// Sign in
export const signIn = async (req: SignInRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const admin = await getAdminByEmail(email);
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await comparePassword(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const accessToken = signInAccessToken({ id: admin.id, email: admin.email });
    const refreshToken = signInRefreshToken({
      id: admin.id,
      email: admin.email,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    res.status(200).json({
      accessToken,
      refreshToken,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Sign out
export const signOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Signed out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
