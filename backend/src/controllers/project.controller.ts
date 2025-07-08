import express from "express";
import * as ProjectService from "../services/project.service.ts";

type Request = express.Request;
type Response = express.Response;

// Create project
export const createProject = async (req: Request, res: Response) => {
  try {
    const project = req.body;
    const newProject = await ProjectService.createProject(project);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: "Failed to create project" });
  }
};

// Get all projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectService.getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to get all projects" });
  }
};

// Get project by id
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await ProjectService.getProjectById(id);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to get project by id" });
  }
};

// Get project by slug
export const getProjectBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const project = await ProjectService.getProjectBySlug(slug);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to get project by slug" });
  }
};

// Update project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = req.body;
    const updatedProject = await ProjectService.updateProject(project);
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: "Failed to update project" });
  }
};

// Delete project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProject = await ProjectService.deleteProject(id);
    res.status(200).json(deletedProject);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
};


// Get featured projects latest 3
export const getFeaturedProjects = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectService.getFeaturedProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to get featured projects" });
  }
};