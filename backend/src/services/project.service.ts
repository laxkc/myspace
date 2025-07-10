import * as ProjectModel from "../models/project.model";
import slugify from "slugify";
import * as ProjectTagModel from "../models/projectTag.model";
import * as TagService from "./tag.service";

// add random id to project title if title is already exists
const addRandomIdToTitle = (title: string) => {
  const randomId = Math.random().toString(36).substring(2, 15);
  return `${title} ${randomId}`;
};

// Create project
export const createProject = async (projectData: any) => {
  try {
    // Map snake_case request fields to camelCase for the project model
    const project: ProjectModel.Project = {
      adminId: projectData.admin_id || projectData.adminId,
      title: projectData.title,
      metaDescription:
        projectData.metaDescription || projectData.meta_description || "",
      description: projectData.description,
      isPublished:
        projectData.isPublished ||
        projectData.is_published === "true" ||
        projectData.is_published === true,
      publishedAt:
        projectData.publishedAt || projectData.published_at || new Date(),
      isFeatured:
        projectData.isFeatured ||
        projectData.is_featured === "true" ||
        projectData.is_featured === true,
      media:
        projectData.media || projectData.image || projectData.coverImage || "",
      githubUrl: projectData.githubUrl || projectData.github || "",
      liveDemoUrl:
        projectData.liveDemoUrl ||
        projectData.liveUrl ||
        projectData.link ||
        "",
      slug: "", // Will be generated
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: projectData.tags || [],
    };

    let slug = slugify(project.title, { lower: true, strict: true });
    let existingProject = await ProjectModel.getProjectBySlug(slug);
    
    // Keep generating new slugs until we find a unique one
    while (existingProject) {
      project.title = addRandomIdToTitle(project.title);
      slug = slugify(project.title, { lower: true, strict: true });
      existingProject = await ProjectModel.getProjectBySlug(slug);
    }

    // Create the project first
    const newProject = await ProjectModel.insertProject({
      ...project,
      slug,
    });

    // Handle tags if provided
    let tags = [];
    if (projectData.tags && projectData.tags.length > 0) {
      // Create or get existing tags
      tags = await TagService.createOrGetTags(projectData.tags);

      // Create project-tag relationships
      for (const tag of tags) {
        await ProjectTagModel.insertProjectTag({
          projectId: newProject.id,
          tagId: tag.id,
        });
      }
    }

    // Return project with tags
    return {
      ...newProject,
      tags,
    };
  } catch (error) {
    throw new Error("Failed to create project");
  }
};

// Get all projects
export const getAllProjects = async () => {
  try {
    const projects = await ProjectModel.getAllProjects();
    const projectsWithTags = await Promise.all(
      projects.map(async (project) => {
        const projectTags = await ProjectTagModel.getProjectTagsByProjectId(
          project.id
        );
        const tags = await Promise.all(
          projectTags.map(async (projectTag) => {
            return await TagService.getTagById(projectTag.tag_id);
          })
        );
        return { ...project, tags };
      })
    );
    return projectsWithTags;
  } catch (error) {
    throw new Error("Failed to get all projects");
  }
};

// Get project by id
export const getProjectById = async (id: string) => {
  try {
    const project = await ProjectModel.getProjectById(id);
    const projectTags = await ProjectTagModel.getProjectTagsByProjectId(
      project.id
    );
    const tags = await Promise.all(
      projectTags.map(async (projectTag) => {
        return await TagService.getTagById(projectTag.tag_id);
      })
    );
    return { ...project, tags };
  } catch (error) {
    throw new Error("Failed to get project by id");
  }
};

// Get project by slug
export const getProjectBySlug = async (slug: string) => {
  try {
    const project = await ProjectModel.getProjectBySlug(slug);
    if (!project) {
      throw new Error("Project not found");
    }
    const projectTags = await ProjectTagModel.getProjectTagsByProjectId(
      project.id
    );
    const tags = await Promise.all(
      projectTags.map(async (projectTag) => {
        return await TagService.getTagById(projectTag.tag_id);
      })
    );
    return { ...project, tags };
  } catch (error) {
    throw new Error("Failed to get project by slug");
  }
};

// Update project
export const updateProject = async (project: ProjectModel.Project) => {
  try {
    return await ProjectModel.updateProject(project);
  } catch (error) {
    throw new Error("Failed to update project");
  }
};

// Delete project
export const deleteProject = async (id: string) => {
  try {
    return await ProjectModel.deleteProject(id);
  } catch (error) {
    throw new Error("Failed to delete project");
  }
};

// Get featured projects latest 3 with tags
export const getFeaturedProjects = async () => {
  try {
    const projects = await ProjectModel.getFeaturedProjects();

    const projectsWithTags = await Promise.all(
      projects.map(async (project) => {
        const projectTags = await ProjectTagModel.getProjectTagsByProjectId(
          project.id
        );

        const tags = await Promise.all(
          projectTags.map(async (projectTag) => {
            const tag = await TagService.getTagById(projectTag.tag_id);
            return tag;
          })
        );
        return { ...project, tags };
      })
    );
    return projectsWithTags;
  } catch (error) {
    console.error("Error in getFeaturedProjects:", error);
    throw new Error("Failed to get featured projects");
  }
};
