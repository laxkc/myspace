import { Router } from "express";
import blogRoutes from "./blog.routes";
import projectRoutes from "./project.routes";
import adminRoutes from "./admin.routes";
import contactRoutes from "./contact.routes";
import projectTagRoutes from "./projectTag.routes";
import authRoutes from "./auth.routes";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development"
  });
});

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
