import { Router } from "express";
import * as ProjectController from "../controllers/project.controller.ts";

const router = Router();

// Create project
router.post("/", ProjectController.createProject);

// Get all projects
router.get("/", ProjectController.getAllProjects);

// Get featured projects latest 3
router.get("/featured", ProjectController.getFeaturedProjects);


// Get project by id
router.get("/:id", ProjectController.getProjectById);

// Get project by slug  
router.get("/slug/:slug", ProjectController.getProjectBySlug);

// Update project
router.put("/:id", ProjectController.updateProject);

// Delete project
router.delete("/:id", ProjectController.deleteProject); 


export default router;