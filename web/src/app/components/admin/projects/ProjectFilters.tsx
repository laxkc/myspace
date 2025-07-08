"use client";
import React from "react";
import { FiSearch } from "react-icons/fi";

interface ProjectFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: "all" | "published" | "draft";
  onStatusFilterChange: (filter: "all" | "published" | "draft") => void;
  featuredFilter: "all" | "featured" | "not-featured";
  onFeaturedFilterChange: (filter: "all" | "featured" | "not-featured") => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  onClearFilters: () => void;
}

export default function ProjectFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  featuredFilter,
  onFeaturedFilterChange,
  showFilters,
  onToggleFilters,
  onClearFilters,
}: ProjectFiltersProps) {
  return (
    <div className="mb-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search projects by title, description, or slug..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
        />
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
          <h3 className="font-medium text-gray-900">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured
              </label>
              <select
                value={featuredFilter}
                onChange={(e) => onFeaturedFilterChange(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                <option value="all">All Projects</option>
                <option value="featured">Featured Only</option>
                <option value="not-featured">Not Featured</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={onClearFilters}
                className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 