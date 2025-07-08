import { Router } from "express";
import blogRoutes from "./blog.routes.ts";
import projectRoutes from "./project.routes.ts";
import adminRoutes from "./admin.routes.ts";
import contactRoutes from "./contact.routes.ts";
import projectTagRoutes from "./projectTag.routes.ts";
import authRoutes from "./auth.routes.ts";
import { authenticateUser } from "../middlewares/auth.middleware.ts";

const router = Router();

// Blog routes
router.use("/blog", blogRoutes);

// Project routes
router.use("/project", projectRoutes);

// Admin routes
router.use("/admin", adminRoutes);

// Contact routes
router.use("/contact", contactRoutes);


// Project tag routes
router.use("/project-tag", projectTagRoutes);

// Auth routes
router.use("/auth", authRoutes);

export default router;
