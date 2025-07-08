import express from "express";
import * as BlogService from "../services/blog.service.ts";
import * as BlogTagService from "../services/blogTag.service.ts";

type Request = express.Request;
type Response = express.Response;

// Create blog
export const createBlog = async (req: Request, res: Response) => {
  try {
    const blog = req.body;
    const newBlog = await BlogService.createBlog(blog);
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog" });
  }
};

// Get all blogs
export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await BlogService.getAllBlogs();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to get all blogs" });
  }
};

// Get blog by id
export const getBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await BlogService.getBlogById(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to get blog by id" });
  }
};

// Get blog by slug
export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const blog = await BlogService.getBlogBySlug(slug);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to get blog by slug" });
  }
};

// Get all blogs with tags
export const getAllBlogsWithTags = async (req: Request, res: Response) => {
  try {
    const blogs = await BlogTagService.getAllBlogsWithTags();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to get all blogs with tags" });
  }
};

// Get blog by id with tags
export const getBlogByIdWithTags = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await BlogTagService.getBlogByIdWithTags(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to get blog by id with tags" });
  }
};

// Get blog by slug with tags
export const getBlogBySlugWithTags = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const blog = await BlogTagService.getBlogBySlugWithTags(slug);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to get blog by slug with tags" });
  }
};

// Update blog
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blog = req.body;
    const updatedBlog = await BlogService.updateBlog(blog);
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog" });
  }
};

// Delete blog
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedBlog = await BlogService.deleteBlog(id);
    res.status(200).json(deletedBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
};

// Get blogs by tag slug
export const getBlogsByTagSlug = async (req: Request, res: Response) => {
  try {
    const { tagSlug } = req.params;
    const blogs = await BlogTagService.getBlogsByTagSlug(tagSlug);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to get blogs by tag slug" });
  }
};

// Get featured blogs latest 3
export const getFeaturedBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await BlogService.getFeaturedBlogs();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to get featured blogs" });
  }
};

// Get all blog tags
export const getAllBlogTags = async (req: Request, res: Response) => {
  try {
    const blogTags = await BlogService.getAllBlogTags();
    res.status(200).json(blogTags);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get all blog tags" });
  }
};

// Pagination for published blogs
export const getPaginatedPublishedBlogs = async (
  req: Request,
  res: Response
) => {
  try {
    const { page, limit } = req.params;
    const blogs = await BlogService.getPaginatedPublishedBlogs(
      Number(page),
      Number(limit)
    );
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to get paginated published blogs" });
  }
};
