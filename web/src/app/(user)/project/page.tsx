"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Personal Portfolio Website",
    slug: "portfolio-website",
    description:
      "A modern, responsive portfolio website built with Next.js and Tailwind CSS.",
    imageUrl:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    tags: ["Next.js", "Tailwind", "Portfolio"],
    githubUrl: "https://github.com/laxmankc/portfolio",
    liveUrl: "https://laxmankc.com",
  },
  {
    id: 2,
    title: "Task Manager App",
    slug: "task-manager",
    description:
      "A full-featured task management app with authentication and real-time updates.",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/laxmankc/task-manager",
    liveUrl: "https://tasks.laxmankc.com",
  },
  {
    id: 3,
    title: "Blog Platform",
    slug: "blog-platform",
    description:
      "A scalable blog platform with markdown support and user comments.",
    imageUrl:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    tags: ["Blog", "Platform", "Fullstack"],
    githubUrl: "https://github.com/laxmankc/blog-platform",
    liveUrl: "https://blog.laxmankc.com",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    slug: "weather-dashboard",
    description:
      "A simple weather dashboard that fetches real-time weather data from a public API.",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    tags: ["API", "Weather", "Dashboard"],
    githubUrl: "https://github.com/laxmankc/weather-dashboard",
    liveUrl: "https://weather.laxmankc.com",
  },
  {
    id: 5,
    title: "Expense Tracker",
    slug: "expense-tracker",
    description:
      "A minimal expense tracker app to manage your daily spending.",
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    tags: ["Finance", "Tracker", "React"],
    githubUrl: "https://github.com/laxmankc/expense-tracker",
    liveUrl: "https://expenses.laxmankc.com",
  },
];

// Extract unique tags
const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();
const PROJECTS_PER_PAGE = 4;

const ProjectsPage = () => {
  const [selectedTag, setSelectedTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered projects
  const filteredProjects =
    selectedTag === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(selectedTag));

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  );

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTag]);

  return (
    <main className="min-h-screen py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Projects</h1>
        <p className="text-gray-600 text-base mb-2">
          A collection of my personal and open-source projects. Explore the code, try the demos, or connect with me on GitHub.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex flex-nowrap overflow-x-auto gap-3 items-center justify-start pl-2 pr-2 hide-scrollbar">
          <button
            className={`px-4 py-1 rounded-full border text-sm font-medium transition-colors duration-200 whitespace-nowrap ${selectedTag === "All" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
            onClick={() => setSelectedTag("All")}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`px-4 py-1 rounded-full border text-sm font-medium transition-colors duration-200 whitespace-nowrap ${selectedTag === tag ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <ul className="max-w-3xl mx-auto grid grid-cols-1 gap-8">
        {paginatedProjects.map((project) => (
          <li
            key={project.id}
            className="flex flex-col sm:flex-row bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden min-h-[220px]"
          >
            <div className="sm:w-48 w-full h-40 sm:h-auto flex-shrink-0">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  {project.title}
                </h2>
                <p className="text-sm text-gray-700 mb-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 rounded px-2 py-0.5 whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline text-sm font-medium"
                  >
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline text-sm font-medium"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            className="px-4 py-2 rounded border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 rounded border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
};

export default ProjectsPage;