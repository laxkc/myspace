"use client";
import React from "react";
import { FiFolder } from "react-icons/fi";
import ProjectRow from "./ProjectRow";
import { Project } from "./types";

interface ProjectsTableProps {
  projects: Project[];
  selectedProjects: string[];
  onSelectAll: () => void;
  onSelectProject: (id: string) => void;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  searchTerm: string;
  statusFilter: string;
  featuredFilter: string;
}

export default function ProjectsTable({
  projects,
  selectedProjects,
  onSelectAll,
  onSelectProject,
  onEdit,
  onDelete,
  searchTerm,
  statusFilter,
  featuredFilter,
}: ProjectsTableProps) {
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
                  checked={selectedProjects.length === projects.length && projects.length > 0}
                  onChange={onSelectAll}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
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
            {projects.map((project) => (
              <ProjectRow
                key={project.id}
                project={project}
                isSelected={selectedProjects.includes(project.id)}
                onSelect={onSelectProject}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <div className="text-gray-500">
                    <FiFolder className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">
                      {hasFilters
                        ? "No projects match your filters"
                        : "No projects yet"}
                    </p>
                    <p className="text-sm">
                      {hasFilters
                        ? "Try adjusting your search or filters"
                        : "Get started by creating your first project"}
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