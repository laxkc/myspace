import { z } from "zod";

export interface Project {
  id: string;
  title: string;
  slug: string;
  metaDescription?: string;
  description: string;
  isPublished: boolean;
  publishedAt?: Date;
  isFeatured: boolean;
  media?: string;
  githubUrl: string;
  liveDemoUrl?: string;
}

// Zod schema for form validation
export const projectSchema = z.object({
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
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  isPublished: z.boolean(),
  publishedAt: z.date().optional(),
  isFeatured: z.boolean(),
  media: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  githubUrl: z
    .string()
    .min(1, "GitHub URL is required")
    .url("Must be a valid URL"),
  liveDemoUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
});

export type ProjectFormData = z.infer<typeof projectSchema>; 