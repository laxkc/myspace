import { Router } from "express";
import * as BlogController from "../controllers/blog.controller";

const router = Router();

// Create blog
router.post("/", BlogController.createBlog);

// Get all blogs
router.get("/", BlogController.getAllBlogs);

// Get all blog tags
router.get("/tags", BlogController.getAllBlogTags);

// // Get all blogs with tags (specific route - must come before /:id)
// router.get("/with-tags", BlogController.getAllBlogsWithTags);

// // Get blogs by tag slug (specific route - must come before /:id)
// router.get("/blog-tag/:tagSlug", BlogController.getBlogsByTagSlug);

// Get blog by slug (more specific route)
router.get("/slug/:slug", BlogController.getBlogBySlug);

// // Get blog by slug with tags
// router.get("/slug/:slug/with-tags", BlogController.getBlogBySlugWithTags);

// // Get blog by id (less specific route - must come after specific routes)
// router.get("/:id", BlogController.getBlogById);

// // Get blog by id with tags
// router.get("/:id/with-tags", BlogController.getBlogByIdWithTags);

// Update blog
router.put("/:id", BlogController.updateBlog);

// Delete blog
router.delete("/:id", BlogController.deleteBlog);

// Get featured blogs latest 3
router.get("/featured", BlogController.getFeaturedBlogs);

// Pagination for published blogs
router.get("/pagination/:page/:limit", BlogController.getPaginatedPublishedBlogs);

export default router;
