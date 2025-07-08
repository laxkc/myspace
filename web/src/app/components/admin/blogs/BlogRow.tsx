"use client";
import React from "react";
import {
  FiEdit,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiTag,
  FiUser,
  FiCalendar,
} from "react-icons/fi";

import { Blog } from './types';

interface BlogRowProps {
  blog: Blog;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
}

export default function BlogRow({
  blog,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: BlogRowProps) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(blog.id)}
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12">
            <img
              className="h-12 w-12 rounded-lg object-cover"
              src={blog.coverImage || "https://via.placeholder.com/48"}
              alt={blog.title}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {blog.title}
            </div>
            <div className="text-sm text-gray-500">{blog.slug}</div>
            <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
              <span className="flex items-center gap-1">
                <FiUser className="w-3 h-3" />
                {blog.author}
              </span>
              <span className="flex items-center gap-1">
                <FiCalendar className="w-3 h-3" />
                {blog.readTime || 5} min read
              </span>
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col gap-1">
          {blog.isPublished ? (
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
          {blog.isFeatured && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              <FiTag className="w-3 h-3 mr-1" />
              Featured
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-1">
          {blog.tags && blog.tags.length > 0 ? (
            blog.tags
              .slice(0, 3)
              .map((tag: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {tag}
                </span>
              ))
          ) : (
            <span className="text-xs text-gray-400">No tags</span>
          )}
          {blog.tags && blog.tags.length > 3 && (
            <span className="text-xs text-gray-500">
              +{blog.tags.length - 3} more
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {blog.publishedAt
          ? new Date(blog.publishedAt).toLocaleDateString()
          : "Not published"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(blog)}
            className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-600 transition-colors"
            title="Edit blog"
          >
            <FiEdit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(blog.id)}
            className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
            title="Delete blog"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
} 