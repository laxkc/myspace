import express from "express";
import * as ProjectTagService from "../services/projectTag.service";

type Request = express.Request;
type Response = express.Response;

// Create project tag
export const createProjectTag = async (req: Request, res: Response) => {
    try {
        const projectTag = req.body;
        const newProjectTag = await ProjectTagService.createProjectTag(projectTag);
        res.status(201).json(newProjectTag);
    } catch (error) {
        res.status(500).json({ error: "Failed to create project tag" });
    }
};

// Get project tags by project id
export const getProjectTagsByProjectId = async (req: Request, res: Response) => {
    try {
        const { projectId } = req.params;
        const projectTags = await ProjectTagService.getProjectTagsByProjectId(projectId);
        res.status(200).json(projectTags);
    } catch (error) {
        res.status(500).json({ error: "Failed to get project tags by project id" });
    }
};

// Get project tags by tag id
export const getProjectTagsByTagId = async (req: Request, res: Response) => {
    try {
        const { tagId } = req.params;
        const projectTags = await ProjectTagService.getProjectTagsByTagId(tagId);
        res.status(200).json(projectTags);
    } catch (error) {
        res.status(500).json({ error: "Failed to get project tags by tag id" });
    }
};

// Delete project tag
export const deleteProjectTag = async (req: Request, res: Response) => {
    try {
        const { projectId, tagId } = req.params;
        const deletedProjectTag = await ProjectTagService.deleteProjectTag(projectId, tagId);
        res.status(200).json(deletedProjectTag);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete project tag" });
    }
};

