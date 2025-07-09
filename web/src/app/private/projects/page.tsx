"use client";
import React, { useState, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiPlus, FiFilter } from "react-icons/fi";

// Force dynamic rendering to avoid SSR issues
export const dynamic = 'force-dynamic';
import {
  ProjectFilters,
  BulkActions,
  Pagination,
  DeleteConfirmationModal,
  ProjectForm,
  ProjectsTable,
  Project,
  ProjectFormData,
} from "@/app/components/admin/projects";

// Mock data for projects
const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Personal Portfolio Website",
    slug: "portfolio-website",
    metaDescription:
      "A modern, responsive portfolio website built with Next.js and Tailwind CSS.",
    description:
      "A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features include dark mode, responsive design, and optimized performance.",
    isPublished: true,
    publishedAt: new Date("2024-06-01"),
    isFeatured: true,
    media:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    githubUrl: "https://github.com/laxmankc/portfolio",
    liveDemoUrl: "https://laxmankc.com",
  },
  {
    id: "2",
    title: "Task Manager App",
    slug: "task-manager",
    metaDescription:
      "A full-featured task management app with authentication and real-time updates.",
    description:
      "A comprehensive task management application built with React and Node.js. Features include user authentication, real-time updates, task categorization, and progress tracking.",
    isPublished: false,
    publishedAt: new Date("2024-05-20"),
    isFeatured: false,
    media:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    githubUrl: "https://github.com/laxmankc/task-manager",
    liveDemoUrl: "https://tasks.laxmankc.com",
  },
  {
    id: "3",
    title: "E-commerce Platform",
    slug: "ecommerce-platform",
    metaDescription:
      "A full-stack e-commerce solution with payment integration.",
    description:
      "Complete e-commerce platform with user authentication, product management, shopping cart, payment processing, and order management.",
    isPublished: true,
    publishedAt: new Date("2024-04-15"),
    isFeatured: true,
    media: "",
    githubUrl: "https://github.com/laxmankc/ecommerce",
    liveDemoUrl: "https://shop.laxmankc.com",
  },
  // Add more mock projects as needed...
];

// Pagination settings
const ITEMS_PER_PAGE = 10;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "draft"
  >("all");
  const [featuredFilter, setFeaturedFilter] = useState<
    "all" | "featured" | "not-featured"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.slug.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && project.isPublished) ||
        (statusFilter === "draft" && !project.isPublished);

      const matchesFeatured =
        featuredFilter === "all" ||
        (featuredFilter === "featured" && project.isFeatured) ||
        (featuredFilter === "not-featured" && !project.isFeatured);

      return matchesSearch && matchesStatus && matchesFeatured;
    });
  }, [projects, searchTerm, statusFilter, featuredFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, featuredFilter]);

  // Handlers
  const openAdd = () => {
    setEditProject(null);
    setShowModal(true);
  };

  const openEdit = (project: Project) => {
    setEditProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditProject(null);
  };

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (editProject) {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === editProject.id
              ? {
                  ...p,
                  ...data,
                  id: editProject.id,
                }
              : p
          )
        );
        toast.success("Project updated successfully!");
      } else {
        const newProject: Project = {
          ...data,
          id: (Math.random() * 100000).toFixed(0),
        };
        setProjects((prev) => [...prev, newProject]);
        toast.success("Project created successfully!");
      }

      closeModal();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (deleteId === "bulk") {
        setProjects((prev) => prev.filter((p) => !selectedProjects.includes(p.id)));
        setSelectedProjects([]);
        toast.success(`${selectedProjects.length} projects deleted successfully!`);
      } else {
        setProjects((prev) => prev.filter((p) => p.id !== deleteId));
        toast.success("Project deleted successfully!");
      }

      setShowDelete(false);
      setDeleteId(null);
    } catch (error) {
      toast.error("Failed to delete project. Please try again.");
    }
  };

  const closeDelete = () => {
    setShowDelete(false);
    setDeleteId(null);
  };

  // Bulk actions
  const handleSelectAll = () => {
    if (selectedProjects.length === paginatedProjects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(paginatedProjects.map((p) => p.id));
    }
  };

  const handleSelectProject = (id: string) => {
    setSelectedProjects((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (selectedProjects.length === 0) return;
    setDeleteId("bulk");
    setShowDelete(true);
  };

  const handleBulkPublish = async () => {
    if (selectedProjects.length === 0) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProjects((prev) =>
        prev.map((p) =>
          selectedProjects.includes(p.id) ? { ...p, isPublished: true } : p
        )
      );
      setSelectedProjects([]);
      toast.success(`${selectedProjects.length} projects published successfully!`);
    } catch (error) {
      toast.error("Failed to publish projects. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Projects
            </h1>
            <p className="text-gray-600 mt-1">
              Create, edit, and manage your portfolio projects
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FiFilter className="w-4 h-4" />
              Filters
            </button>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              <FiPlus className="w-5 h-5" /> Add Project
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <ProjectFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          featuredFilter={featuredFilter}
          onFeaturedFilterChange={setFeaturedFilter}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          onClearFilters={() => {
            setSearchTerm("");
            setStatusFilter("all");
            setFeaturedFilter("all");
          }}
        />

        {/* Bulk Actions */}
        <BulkActions
          selectedCount={selectedProjects.length}
          onPublishAll={handleBulkPublish}
          onDeleteAll={handleBulkDelete}
        />

        {/* Projects Table */}
        <ProjectsTable
          projects={paginatedProjects}
          selectedProjects={selectedProjects}
          onSelectAll={handleSelectAll}
          onSelectProject={handleSelectProject}
          onEdit={openEdit}
          onDelete={confirmDelete}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          featuredFilter={featuredFilter}
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredProjects.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Add/Edit Modal */}
      <ProjectForm
        isOpen={showModal}
        project={editProject}
        onClose={closeModal}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDelete}
        isBulkDelete={deleteId === "bulk"}
        selectedCount={selectedProjects.length}
        onConfirm={handleDelete}
        onCancel={closeDelete}
      />
    </div>
  );
}
