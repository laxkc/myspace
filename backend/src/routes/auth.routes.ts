import {Router } from "express";
import type { RequestHandler } from "express";
import { signIn, signOut } from "../controllers/auth.controller.ts";

const router = Router();

// Sign in
router.post("/signin", signIn as RequestHandler);

// Sign out
router.post("/signout", signOut as RequestHandler);

export default router;