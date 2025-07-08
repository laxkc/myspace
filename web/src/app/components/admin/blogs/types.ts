export interface Blog {
  id: string;
  title: string;
  slug: string;
  metaDescription?: string;
  coverImage?: string;
  isPublished: boolean;
  publishedAt?: Date;
  isFeatured: boolean;
  readTime?: number;
  author: string;
  tags?: string[];
  body?: any;
}

import { z } from "zod";

// Zod schema for form validation
export const blogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    ),
  metaDescription: z
    .string()
    .max(160, "Meta description must be less than 160 characters")
    .optional(),
  body: z.any(), // EditorJS data
  coverImage: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  isPublished: z.boolean(),
  publishedAt: z.date().optional(),
  isFeatured: z.boolean(),
  readTime: z.number().min(1, "Read time must be at least 1 minute").optional(),
  tags: z.array(z.string()).optional(),
});

export type BlogFormData = z.infer<typeof blogSchema>; 