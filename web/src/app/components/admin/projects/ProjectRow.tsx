"use client";
import React from "react";
import { FiEdit, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";
import { Project } from "./types";

// Function to generate dynamic placeholder image based on title
const generatePlaceholderImage = (title: string): string => {
  const seed = title.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&backgroundColor=6366f1,818cf8&shape1Color=ffffff&shape2Color=ffffff&shape3Color=ffffff`;
};

interface ProjectRowProps {
  project: Project;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export default function ProjectRow({
  project,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: ProjectRowProps) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(project.id)}
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12">
            <img
              className="h-12 w-12 rounded-lg object-cover"
              src={
                project.media ||
                generatePlaceholderImage(project.title)
              }
              alt={project.title}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {project.title}
            </div>
            <div className="text-sm text-gray-500">
              {project.slug}
            </div>
            <div className="text-xs text-gray-400 mt-1 line-clamp-2">
              {project.metaDescription || project.description}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col gap-1">
          {project.isPublished ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <FiEye className="w-3 h-3 mr-1" />
              Published
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              <FiEyeOff className="w-3 h-3 mr-1" />
              Draft
            </span>
          )}
          {project.isFeatured && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              Featured
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {project.publishedAt
          ? new Date(project.publishedAt).toLocaleDateString()
          : "Not published"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(project)}
            className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-600 transition-colors"
            title="Edit project"
          >
            <FiEdit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
            title="Delete project"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
} 