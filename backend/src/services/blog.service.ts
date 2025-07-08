import * as BlogModel from "../models/blog.model.ts";
import slugify from "slugify";
import * as BlogTagModel from "../models/blogTag.model.ts";
import * as TagService from "./tag.service.ts";

// Create blog
export const createBlog = async (blogData: any) => {
  try {
    // Map snake_case request fields to camelCase for the blog model
    const blog: BlogModel.Blog = {
      adminId: blogData.admin_id || blogData.adminId,
      title: blogData.title,
      metaDescription: blogData.metaDescription || blogData.meta_description,
      body: blogData.body,
      coverImage: blogData.coverImage || blogData.cover_image || "",
      isPublished:
        blogData.isPublished ||
        blogData.is_published === "true" ||
        blogData.is_published === true,
      publishedAt: blogData.publishedAt || blogData.published_at || new Date(),
      isFeatured:
        blogData.isFeatured ||
        blogData.is_featured === "true" ||
        blogData.is_featured === true,
      slug: "", // Will be generated
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: blogData.tags || [],
    };

    const slug = slugify(blog.title, { lower: true, strict: true });
    const existingBlog = await BlogModel.getBlogBySlug(slug);
    if (existingBlog) {
      throw new Error("Blog with this title already exists");
    }

    // Create the blog first
    const newBlog = await BlogModel.insertBlog({
      ...blog,
      slug,
    });

    // Handle tags if provided
    let tags = [];
    if (blog.tags && blog.tags.length > 0) {
      // Create or get existing tags
      tags = await TagService.createOrGetTags(blog.tags);

      // Create blog-tag relationships
      for (const tag of tags) {
        await BlogTagModel.insertBlogTag({
          blogId: newBlog.id,
          tagId: tag.id,
        });
      }
    }

    // Return blog with tags
    return {
      ...newBlog,
      tags,
    };
  } catch (error) {
    throw new Error("Failed to create blog");
  }
};

// Get all blogs order
export const getAllBlogs = async () => {
  try {
    const blogs = await BlogModel.getAllBlogs();
    const blogsWithTags = await Promise.all(
      blogs.map(async (blog) => {
        const blogTags = await BlogTagModel.getBlogTagsByBlogId(blog.id);
        const tags = await Promise.all(
          blogTags.map(async (blogTag) => {
            return await TagService.getTagById(blogTag.tag_id);
          })
        );
        return { ...blog, tags };
      })
    );
    return blogsWithTags;
  } catch (error) {
    throw new Error("Failed to get all blogs");
  }
};

// Get blog by id
export const getBlogById = async (id: string) => {
  try {
    const blog = await BlogModel.getBlogById(id);
    const blogTags = await BlogTagModel.getBlogTagsByBlogId(blog.id);
    const tags = await Promise.all(
      blogTags.map(async (blogTag) => {
        return await TagService.getTagById(blogTag.tag_id);
      })
    );
    return { ...blog, tags };
  } catch (error) {
    throw new Error("Failed to get blog by id");
  }
};

// Get blog by slug
export const getBlogBySlug = async (slug: string) => {
  try {
    const blog = await BlogModel.getBlogBySlug(slug);
    const blogTags = await BlogTagModel.getBlogTagsByBlogId(blog.id);
    const tags = await Promise.all(
      blogTags.map(async (blogTag) => {
        return await TagService.getTagById(blogTag.tag_id);
      })
    );
    return { ...blog, tags };
  } catch (error) {
    throw new Error("Failed to get blog by slug");
  }
};

// Update blog
export const updateBlog = async (blog: BlogModel.Blog) => {
  try {
    return await BlogModel.updateBlog(blog);
  } catch (error) {
    throw new Error("Failed to update blog");
  }
};

// Delete blog
export const deleteBlog = async (id: string) => {
  try {
    return await BlogModel.deleteBlog(id);
  } catch (error) {
    throw new Error("Failed to delete blog");
  }
};

// Get featured blogs latest 3 with tags
export const getFeaturedBlogs = async () => {
  try {
    const blogs = await BlogModel.getFeaturedBlogs();
    const blogsWithTags = await Promise.all(
      blogs.map(async (blog) => {
        const blogTags = await BlogTagModel.getBlogTagsByBlogId(blog.id);
        const tags = await Promise.all(
          blogTags.map(async (blogTag) => {
            return await TagService.getTagById(blogTag.tag_id);
          })
        );
        return { ...blog, tags };
      })
    );
    return blogsWithTags;
  } catch (error) {
    throw new Error("Failed to get featured blogs");
  }
};

// Get all blog tags
export const getAllBlogTags = async () => {
  try {
    const blogTags = await BlogTagModel.getAllBlogTags();
    return blogTags;
  } catch (error) {
    throw new Error("Failed to get all blog tags");
  }
};

// Pagination for published blogs with tags
export const getPaginatedPublishedBlogs = async (
  page: number,
  limit: number
) => {
  try {
    const blogs = await BlogModel.getPaginatedPublishedBlogs(page, limit);
    const blogsWithTags = await Promise.all(
      blogs.map(async (blog) => {
        const blogTags = await BlogTagModel.getBlogTagsByBlogId(blog.id);
        const tags = await Promise.all(
          blogTags.map(async (blogTag) => {
            return await TagService.getTagById(blogTag.tag_id);
          })
        );
        return { ...blog, tags };
      })
    );
    return blogsWithTags;
  } catch (error) {
    throw new Error("Failed to get paginated published blogs");
  }
};
