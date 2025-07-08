"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiX } from "react-icons/fi";
import { Project, ProjectFormData, projectSchema } from "./types";

// Function to generate dynamic placeholder image based on title
const generatePlaceholderImage = (title: string): string => {
  const seed = title.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&backgroundColor=6366f1,818cf8&shape1Color=ffffff&shape2Color=ffffff&shape3Color=ffffff`;
};

interface ProjectFormProps {
  isOpen: boolean;
  project?: Project | null;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  isSubmitting: boolean;
}

const defaultValues: ProjectFormData = {
  title: "",
  slug: "",
  metaDescription: "",
  description: "",
  isPublished: false,
  publishedAt: undefined,
  isFeatured: false,
  media: "",
  githubUrl: "",
  liveDemoUrl: "",
};

export default function ProjectForm({
  isOpen,
  project,
  onClose,
  onSubmit,
  isSubmitting,
}: ProjectFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  const watchedTitle = watch("title");
  const isEditMode = !!project;

  // Auto-generate slug from title
  useEffect(() => {
    if (watchedTitle && !isEditMode) {
      const slug = watchedTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setValue("slug", slug);
    }
  }, [watchedTitle, setValue, isEditMode]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      if (project) {
        reset({
          title: project.title,
          slug: project.slug,
          metaDescription: project.metaDescription || "",
          description: project.description,
          isPublished: project.isPublished,
          publishedAt: project.publishedAt ? new Date(project.publishedAt) : undefined,
          isFeatured: project.isFeatured,
          media: project.media || "",
          githubUrl: project.githubUrl || "",
          liveDemoUrl: project.liveDemoUrl || "",
        });
      } else {
        reset(defaultValues);
      }
    }
  }, [isOpen, project, reset]);

  const handleFormSubmit = async (data: ProjectFormData) => {
    // Generate placeholder image if no media URL is provided
    const mediaUrl = data.media || generatePlaceholderImage(data.title);
    
    await onSubmit({ ...data, media: mediaUrl });
  };

  const handleClose = () => {
    onClose();
    reset(defaultValues);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditMode ? "Edit Project" : "Add New Project"}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Title *
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                    errors.title
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter project title"
                />
              )}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Slug *
            </label>
            <Controller
              name="slug"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                    errors.slug
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-300"
                  }`}
                  placeholder="project-url-slug"
                />
              )}
            />
            {errors.slug && (
              <p className="mt-1 text-sm text-red-600">
                {errors.slug.message}
              </p>
            )}
          </div>

          {/* Meta Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description
            </label>
            <Controller
              name="metaDescription"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={2}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                    errors.metaDescription
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-300"
                  }`}
                  placeholder="Brief description for SEO (optional)"
                />
              )}
            />
            {errors.metaDescription && (
              <p className="mt-1 text-sm text-red-600">
                {errors.metaDescription.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description *
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                    errors.description
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-300"
                  }`}
                  placeholder="Describe your project in detail"
                />
              )}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub URL *
              </label>
              <Controller
                name="githubUrl"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="url"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                      errors.githubUrl
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-300"
                    }`}
                    placeholder="https://github.com/username/repo (required)"
                  />
                )}
              />
              {errors.githubUrl && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.githubUrl.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Live Demo URL
              </label>
              <Controller
                name="liveDemoUrl"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="url"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                      errors.liveDemoUrl
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-300"
                    }`}
                    placeholder="https://demo.example.com"
                  />
                )}
              />
              {errors.liveDemoUrl && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.liveDemoUrl.message}
                </p>
              )}
            </div>
          </div>

          {/* Media URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Image URL
            </label>
            <Controller
              name="media"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="url"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                    errors.media
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-300"
                  }`}
                  placeholder="https://example.com/image.jpg (optional - will generate placeholder if empty)"
                />
              )}
            />
            {errors.media && (
              <p className="mt-1 text-sm text-red-600">
                {errors.media.message}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Leave empty to generate a unique placeholder image based on
              the project title
            </p>
          </div>

          {/* Published Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Published Date
            </label>
            <Controller
              name="publishedAt"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors"
                  placeholderText="Select publish date"
                  dateFormat="MMMM d, yyyy"
                  isClearable
                />
              )}
            />
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-6">
            <Controller
              name="isPublished"
              control={control}
              render={({ field }) => (
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Published
                  </span>
                </label>
              )}
            />

            <Controller
              name="isFeatured"
              control={control}
              render={({ field }) => (
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Featured
                  </span>
                </label>
              )}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !isDirty}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : isEditMode ? (
                "Update Project"
              ) : (
                "Create Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 