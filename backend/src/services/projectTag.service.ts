import * as ProjectTagModel from "../models/projectTag.model.ts";

// Create project tag
export const createProjectTag = async (projectTag: ProjectTagModel.ProjectTag) => {
  try {
    const newProjectTag = await ProjectTagModel.insertProjectTag(projectTag);
    return newProjectTag;
  } catch (error) {
    throw new Error("Failed to create project tag");
  }
};

// Get project tags by project id
export const getProjectTagsByProjectId = async (projectId: string) => {
  try {
    return await ProjectTagModel.getProjectTagsByProjectId(projectId);
  } catch (error) {
    throw new Error("Failed to get project tags by project id");
  }
};

// Get project tags by tag id
export const getProjectTagsByTagId = async (tagId: string) => {
  try {
    return await ProjectTagModel.getProjectTagsByTagId(tagId);
  } catch (error) {
    throw new Error("Failed to get project tags by tag id");
  }
};

// Delete project tag
export const deleteProjectTag = async (projectId: string, tagId: string) => {
  try {
    return await ProjectTagModel.deleteProjectTag(projectId, tagId);
  } catch (error) {
    throw new Error("Failed to delete project tag");
  }
};