"use client";
import React from "react";
import { FiFileText } from "react-icons/fi";
import BlogRow from "./BlogRow";

import { Blog } from './types';

interface BlogsTableProps {
  blogs: Blog[];
  selectedBlogs: string[];
  onSelectAll: () => void;
  onSelectBlog: (id: string) => void;
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
  searchTerm: string;
  statusFilter: string;
  featuredFilter: string;
}

export default function BlogsTable({
  blogs,
  selectedBlogs,
  onSelectAll,
  onSelectBlog,
  onEdit,
  onDelete,
  searchTerm,
  statusFilter,
  featuredFilter,
}: BlogsTableProps) {
  const hasFilters = searchTerm || statusFilter !== "all" || featuredFilter !== "all";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedBlogs.length === blogs.length && blogs.length > 0}
                  onChange={onSelectAll}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Blog Post
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tags
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Published
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.map((blog) => (
              <BlogRow
                key={blog.id}
                blog={blog}
                isSelected={selectedBlogs.includes(blog.id)}
                onSelect={onSelectBlog}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="text-gray-500">
                    <FiFileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">
                      {hasFilters
                        ? "No blogs match your filters"
                        : "No blogs yet"}
                    </p>
                    <p className="text-sm">
                      {hasFilters
                        ? "Try adjusting your search or filters"
                        : "Get started by creating your first blog post"}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 