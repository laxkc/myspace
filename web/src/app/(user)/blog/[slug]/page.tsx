"use client";

import React from "react";
import Link from "next/link";
import { marked } from "marked";
import "github-markdown-css/github-markdown.css";
import { useParams, notFound } from "next/navigation";
import { fetchBlogBySlug } from "@/lib/api/blogs";
import { useQuery } from "@tanstack/react-query";

const BlogPage = () => {
  const params = useParams();
  const slug = params?.slug;
  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => fetchBlogBySlug(slug as string),
    enabled: !!slug,
  });
  if (isLoading) {
    return (
      <main className="min-h-screen py-12 px-4 bg-white text-gray-800">
        <div className="max-w-2xl mx-auto text-center py-20 text-gray-400">
          Loading...
        </div>
      </main>
    );
  }
  if (!blog) return notFound();
  return (
    <main className="min-h-screen py-12 px-4 bg-white text-gray-800">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/blog"
          className="inline-block mb-6 text-indigo-600 hover:underline text-sm"
        >
          ← Back to all blogs
        </Link>

        {/* Cover + Metadata */}
        <div className="mb-6">
          <img
            src={blog.cover_image}
            alt={blog.title}
            width={800}
            height={300}
            className="w-full h-56 object-cover rounded-xl mb-4"
          />

          <div className="flex flex-wrap gap-2 mb-2">
            {blog.tags.map((tag: any) => (
              <span
                key={tag.id}
                className="text-xs bg-gray-100 text-gray-600 rounded px-2 py-0.5"
              >
                {tag.slug}
              </span>
            ))}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {blog.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
            <span>
              {new Date(blog.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                timeZone: "UTC",
              })}
            </span>
          </div>
        </div>

        {/* Blog Content */}
        <article
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: marked.parse(blog.body) }}
        />
      </div>
    </main>
  );
};

export default BlogPage;
