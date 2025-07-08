import * as TagModel from "../models/tag.model.ts";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";

// Interface for tag
export interface Tag {
  id: string;
  title: string;
  slug: string;
}

// Create tag
export const createTag = async (tag: { title: string }) => {
  try {
    const slug = slugify(tag.title, { lower: true, strict: true });
    const existingTag = await TagModel.getTagBySlug(slug);
    if (existingTag) {
      return existingTag; // Return existing tag if it already exists
    }
    const newTag = await TagModel.insertTag({
      id: uuidv4(),
      title: tag.title,
      slug,
    });
    return newTag;
  } catch (error) {
    throw new Error("Failed to create tag");
  }
};

// Get all tags
export const getAllTags = async () => {
  try {
    return await TagModel.getAllTags();
  } catch (error) {
    throw new Error("Failed to get all tags");
  }
};

// Get tag by id
export const getTagById = async (id: string) => {
  try {
    return await TagModel.getTagById(id);
  } catch (error) {
    throw new Error("Failed to get tag by id");
  }
};

// Get tag by slug
export const getTagBySlug = async (slug: string) => {
  try {
    return await TagModel.getTagBySlug(slug);
  } catch (error) {
    throw new Error("Failed to get tag by slug");
  }
};

// Create or get existing tag
export const createOrGetTags = async (tagTitles: string[]) => {
  try {
    const tags = [];
    for (const title of tagTitles) {
      const tag = await createTag({ title });
      tags.push(tag);
    }
    return tags;
  } catch (error) {
    throw new Error("Failed to create or get tags");
  }
};

// Update tag
export const updateTag = async (tag: Tag) => {
  try {
    return await TagModel.updateTag(tag);
  } catch (error) {
    throw new Error("Failed to update tag");
  }
};

// Delete tag
export const deleteTag = async (id: string) => {
  try {
    return await TagModel.deleteTag(id);
  } catch (error) {
    throw new Error("Failed to delete tag");
  }
};
