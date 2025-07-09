import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { pool } from "./src/utils/database.ts";
import logger from "./src/utils/logger.ts";
import rootRoutes from "./src/routes/root.ts";
import cookieParser from "cookie-parser";
import { rateLimitMiddleware } from "./src/middlewares/ratelimit.middleware.ts";
import { apiKeyMiddleware } from "./src/middlewares/apikey.middleware.ts";

// Load environment variables
dotenv.config();

// Create Express app instance
const app = express();

// Test database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    logger.error("Error connecting to the database", err);
  } else {
    logger.info("Connected to the database");
  }
});

// Rate limit middleware
app.use(rateLimitMiddleware);

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);


// Parse cookies
app.use(cookieParser());

// Parse JSON bodies
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Root routes
app.use("/api", apiKeyMiddleware, rootRoutes);

export default app;
