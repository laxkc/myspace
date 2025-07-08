"use client";
import React, { useState, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiPlus, FiFilter } from "react-icons/fi";
import {
  BlogFilters,
  BulkActions,
  Pagination,
  DeleteConfirmationModal,
  BlogForm,
  BlogsTable,
} from "@/app/components/admin/blogs";
import { Blog, BlogFormData } from "@/app/components/admin/blogs/types";

// Mock data for blogs
const MOCK_BLOGS: Blog[] = [
  {
    id: "1",
    title: "Getting Started with Next.js 14",
    slug: "getting-started-nextjs-14",
    metaDescription:
      "A comprehensive guide to building modern web applications with Next.js 14.",
    body: {
      time: 1635603431943,
      blocks: [
        {
          id: "header-1",
          type: "header",
          data: {
            text: "Introduction to Next.js 14",
            level: 1,
          },
        },
        {
          id: "paragraph-1",
          type: "paragraph",
          data: {
            text: "Next.js 14 brings exciting new features that make building React applications faster and more efficient than ever before.",
          },
        },
      ],
    },
    coverImage:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    isPublished: true,
    publishedAt: new Date("2024-06-01"),
    isFeatured: true,
    readTime: 8,
    author: "Laxman KC",
    tags: ["Next.js", "React", "Frontend", "JavaScript"],
  },
  {
    id: "2",
    title: "TypeScript Best Practices for Large Projects",
    slug: "typescript-best-practices",
    metaDescription:
      "Essential TypeScript patterns and practices for scaling large codebases.",
    body: {
      time: 1635603431943,
      blocks: [
        {
          id: "header-1",
          type: "header",
          data: {
            text: "TypeScript Best Practices",
            level: 1,
          },
        },
        {
          id: "paragraph-1",
          type: "paragraph",
          data: {
            text: "TypeScript has become the standard for large-scale JavaScript applications. Here are the best practices to follow.",
          },
        },
      ],
    },
    coverImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    isPublished: false,
    publishedAt: new Date("2024-05-20"),
    isFeatured: false,
    readTime: 12,
    author: "Laxman KC",
    tags: ["TypeScript", "JavaScript", "Programming"],
  },
  // Add more mock blogs as needed...
];

// Pagination settings
const ITEMS_PER_PAGE = 10;

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>(MOCK_BLOGS);
  const [showModal, setShowModal] = useState(false);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
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
  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and search logic
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.metaDescription
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        blog.slug.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && blog.isPublished) ||
        (statusFilter === "draft" && !blog.isPublished);

      const matchesFeatured =
        featuredFilter === "all" ||
        (featuredFilter === "featured" && blog.isFeatured) ||
        (featuredFilter === "not-featured" && !blog.isFeatured);

      return matchesSearch && matchesStatus && matchesFeatured;
    });
  }, [blogs, searchTerm, statusFilter, featuredFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, featuredFilter]);

  // Handlers
  const openAdd = () => {
    setEditBlog(null);
    setShowModal(true);
  };

  const openEdit = (blog: Blog) => {
    setEditBlog(blog);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditBlog(null);
  };

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editBlog) {
        setBlogs((prev) =>
          prev.map((b) =>
            b.id === editBlog.id
              ? {
                  ...b,
                  ...data,
                  id: editBlog.id,
                  author: editBlog.author,
                }
              : b
          )
        );
        toast.success("Blog updated successfully!");
      } else {
        const newBlog: Blog = {
          ...data,
          id: (Math.random() * 100000).toFixed(0),
          author: "Laxman KC",
        };
        setBlogs((prev) => [...prev, newBlog]);
        toast.success("Blog created successfully!");
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
        setBlogs((prev) => prev.filter((b) => !selectedBlogs.includes(b.id)));
        setSelectedBlogs([]);
        toast.success(`${selectedBlogs.length} blogs deleted successfully!`);
      } else {
        setBlogs((prev) => prev.filter((b) => b.id !== deleteId));
        toast.success("Blog deleted successfully!");
      }

      setShowDelete(false);
      setDeleteId(null);
    } catch (error) {
      toast.error("Failed to delete blog. Please try again.");
    }
  };

  const closeDelete = () => {
    setShowDelete(false);
    setDeleteId(null);
  };

  // Bulk actions
  const handleSelectAll = () => {
    if (selectedBlogs.length === paginatedBlogs.length) {
      setSelectedBlogs([]);
    } else {
      setSelectedBlogs(paginatedBlogs.map((b) => b.id));
    }
  };

  const handleSelectBlog = (id: string) => {
    setSelectedBlogs((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (selectedBlogs.length === 0) return;
    setDeleteId("bulk");
    setShowDelete(true);
  };

  const handleBulkPublish = async () => {
    if (selectedBlogs.length === 0) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setBlogs((prev) =>
        prev.map((b) =>
          selectedBlogs.includes(b.id) ? { ...b, isPublished: true } : b
        )
      );
      setSelectedBlogs([]);
      toast.success(`${selectedBlogs.length} blogs published successfully!`);
    } catch (error) {
      toast.error("Failed to publish blogs. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Blogs</h1>
            <p className="text-gray-600 mt-1">
              Create, edit, and manage your blog posts
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
              <FiPlus className="w-5 h-5" /> Add Blog
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <BlogFilters
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
          selectedCount={selectedBlogs.length}
          onPublishAll={handleBulkPublish}
          onDeleteAll={handleBulkDelete}
        />

        {/* Blogs Table */}
        <BlogsTable
          blogs={paginatedBlogs}
          selectedBlogs={selectedBlogs}
          onSelectAll={handleSelectAll}
          onSelectBlog={handleSelectBlog}
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
          totalItems={filteredBlogs.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Add/Edit Modal */}
      <BlogForm
        isOpen={showModal}
        blog={editBlog}
        onClose={closeModal}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDelete}
        isBulkDelete={deleteId === "bulk"}
        selectedCount={selectedBlogs.length}
        onConfirm={handleDelete}
        onCancel={closeDelete}
      />
    </div>
  );
}
