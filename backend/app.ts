import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { pool } from "./src/utils/database";
import logger from "./src/utils/logger";
import rootRoutes from "./src/routes/root";
import cookieParser from "cookie-parser";
import { rateLimitMiddleware } from "./src/middlewares/rateLimit.middleware";
import { apiKeyMiddleware } from "./src/middlewares/apikey.middleware";

// Load environment variables
dotenv.config();

// Create Express app instance
const app = express();

// Test database connection
pool.query("SELECT NOW()", (err) => {
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
    origin: "*",
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
app.use("/api", rootRoutes);

// API for health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

export default app;
