import type { Request, Response } from "express";
import logger from "../utils/logger.ts";

export const apiKeyMiddleware = (
  req: Request,
  res: Response,
  next: any
) => {
  const keyFromHeader = req.headers["x-api-key"];
  if (!keyFromHeader) {
    logger.error("Unauthorized");
    res.status(401).json({ error: "Unauthorized" });
  }
  if (keyFromHeader !== process.env.INTERNAL_API_KEY) {
    logger.error("Unauthorized");
    res.status(401).json({ error: "Unauthorized" });
  }
  if (keyFromHeader === process.env.INTERNAL_API_KEY) {
    logger.info("Authorized");
    next();
  } else {
    logger.error("Unauthorized");
    res.status(401).json({ error: "Unauthorized" });
  }
};
