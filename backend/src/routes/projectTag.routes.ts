import { Router } from "express";
import * as ProjectTagController from "../controllers/projectTag.controller";

const router = Router();

// Create project tag
router.post("/", ProjectTagController.createProjectTag);

// Get project tags by project id
router.get("/project/:projectId", ProjectTagController.getProjectTagsByProjectId);

// Get project tags by tag id
router.get("/tag/:tagId", ProjectTagController.getProjectTagsByTagId);

// Delete project tag
router.delete("/:projectId/:tagId", ProjectTagController.deleteProjectTag);

export default router;