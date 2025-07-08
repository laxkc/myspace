"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  fetchAllBlogTags,
  fetchPaginatedPublishedBlogs,
} from "@/lib/api/blogs";
import { useQuery } from "@tanstack/react-query";

const BLOGS_PER_PAGE = 6;

// Calculate read time based on word count
const calculateReadTime = (text: string): number => {
  const wordsPerMinute = 200; // Average reading speed
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

const BlogsPage = () => {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: allTags, isLoading: isLoadingTags } = useQuery({
    queryKey: ["all-blog-tags"],
    queryFn: fetchAllBlogTags,
  });

  const { data: blogs = [], isLoading: isLoadingPaginatedBlogs } = useQuery({
    queryKey: ["paginated-published-blogs", currentPage],
    queryFn: () => fetchPaginatedPublishedBlogs(currentPage, BLOGS_PER_PAGE),
  });

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTag]);

  const hasNextPage = blogs.length === BLOGS_PER_PAGE;

  return (
    <main className="min-h-screen py-12 px-2 sm:px-4 bg-white">
      <div className="max-w-4xl mx-auto mb-10 sm:mb-12 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center md:text-left">
          Blog
        </h1>
        <p className="text-gray-600 text-base mb-2 text-center md:text-left">
          Insights, tutorials, and thoughts on AI, Web applications, design
          patterns, and more.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-nowrap overflow-x-auto gap-3 items-center justify-start pl-2 pr-2 hide-scrollbar">
          <button
            className={`px-4 py-1 rounded-full border text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
              selectedTag === "All"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setSelectedTag("All")}
          >
            All
          </button>
          {allTags?.data.map((tag: any) => (
            <button
              key={tag.slug}
              className={`px-4 py-1 rounded-full border text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                selectedTag === tag.slug
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setSelectedTag(tag.slug)}
            >
              {tag.slug}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-y-8 gap-x-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {isLoadingPaginatedBlogs ? (
          [...Array(BLOGS_PER_PAGE)].map((_, i) => (
            <article
              key={i}
              className="bg-white rounded-xl shadow-sm transition p-0 flex flex-col min-h-[370px] animate-pulse"
            >
              <div className="h-44 w-full rounded-t-xl mb-3 bg-gray-200" />
              <div className="flex flex-wrap gap-2 mb-2 px-4">
                {[...Array(2)].map((_, j) => (
                  <span
                    key={j}
                    className="h-4 w-12 bg-gray-200 rounded"
                  />
                ))}
              </div>
              <div className="flex-1 flex flex-col">
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-2 px-4" />
                <div className="h-4 w-full bg-gray-200 rounded mb-2 px-4" />
                <div className="flex justify-between text-xs text-gray-400 px-4 pb-4 mt-auto">
                  <span className="h-4 w-16 bg-gray-200 rounded" />
                  <span className="h-4 w-12 bg-gray-200 rounded" />
                </div>
              </div>
            </article>
          ))
        ) : (
          blogs.map((blog: any) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group"
            >
              <article
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-0 flex flex-col min-h-[370px] cursor-pointer"
              >
                <div
                  className="h-44 w-full rounded-t-xl mb-3 bg-gray-100"
                  style={{
                    backgroundImage: `url(${blog.cover_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="flex flex-wrap gap-2 mb-2 px-4">
                  {blog.tags.map((tag: any) => (
                    <span
                      key={tag.id}
                      className="text-xs text-gray-500 font-normal tracking-wide"
                    >
                      #{tag.slug}
                    </span>
                  ))}
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="text-base font-semibold text-gray-900 mb-1 px-4 group-hover:underline underline-offset-4">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-700 mb-2 px-4">
                    {blog.meta_description}
                  </p>
                  <div className="flex justify-between text-xs text-gray-400 px-4 pb-4 mt-auto">
                    <span>
                      {new Date(blog.published_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        timeZone: "UTC",
                      })}
                    </span>
                    <span>{calculateReadTime(blog.body)} min read</span>
                  </div>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-12">
        <button
          className="px-4 py-2 rounded border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">Page {currentPage}</span>
        <button
          className="px-4 py-2 rounded border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage((p) => (hasNextPage ? p + 1 : p))}
          disabled={!hasNextPage}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default BlogsPage;
