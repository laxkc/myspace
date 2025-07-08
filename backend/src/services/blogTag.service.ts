import * as TagService from "./tag.service.ts";
import * as BlogModel from "../models/blog.model.ts";
import * as BlogTagModel from "../models/blogTag.model.ts";

// Get all blog with tags
export const getAllBlogsWithTags = async () => {
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
        return {
          ...blog,
          tags,
        };
      })
    );
    return blogsWithTags;
  } catch (error) {
    throw new Error("Failed to get all blogs with tags");
  }
};

// Get blog by id with tags
export const getBlogByIdWithTags = async (id: string) => {
  try {
    const blog = await BlogModel.getBlogById(id);
    if (!blog) return null;

    const blogTags = await BlogTagModel.getBlogTagsByBlogId(blog.id);
    const tags = await Promise.all(
      blogTags.map(async (blogTag) => {
        return await TagService.getTagById(blogTag.tag_id);
      })
    );

    return {
      ...blog,
      tags,
    };
  } catch (error) {
    throw new Error("Failed to get blog by id with tags");
  }
};

// Get blog by slug with tags
export const getBlogBySlugWithTags = async (slug: string) => {
  try {
    const blog = await BlogModel.getBlogBySlug(slug);
    if (!blog) return null;

    const blogTags = await BlogTagModel.getBlogTagsByBlogId(blog.id);
    const tags = await Promise.all(
      blogTags.map(async (blogTag) => {
        return await TagService.getTagById(blogTag.tag_id);
      })
    );

    return {
      ...blog,
      tags,
    };
  } catch (error) {
    throw new Error("Failed to get blog by slug with tags");
  }
};

// Get all blogs by tag slug
export const getBlogsByTagSlug = async (tagSlug: string) => {
  try {
    // First get the tag by slug
    const tag = await TagService.getTagBySlug(tagSlug);
    if (!tag) {
      return [];
    }

    // Get all blog-tag relationships for this tag
    const blogTags = await BlogTagModel.getBlogTagsByTagId(tag.id);

    // Get all blogs for these relationships
    const blogs = await Promise.all(
      blogTags.map(async (blogTag) => {
        const blog = await BlogModel.getBlogById(blogTag.blog_id);
        if (blog) {
          // Get tags for this blog
          const blogTags = await BlogTagModel.getBlogTagsByBlogId(blog.id);
          const tags = await Promise.all(
            blogTags.map(async (blogTag) => {
              return await TagService.getTagById(blogTag.tag_id);
            })
          );
          return { ...blog, tags };
        }
        return null;
      })
    );

    // Filter out null blogs and return
    const validBlogs = blogs.filter((blog) => blog !== null);
    return validBlogs;
  } catch (error) {
    throw new Error("Failed to get blogs by tag slug");
  }
};
