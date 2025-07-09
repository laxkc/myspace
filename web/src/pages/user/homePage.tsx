"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import FeaturedBlogs from "@/app/components/user/FeaturedBlogs";
import FeaturedProjects from "@/app/components/user/FeaturedProjects";
import ClientOnly from "@/app/components/user/ClientOnly";

// Force dynamic rendering to avoid SSR issues with React Query
export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-12 md:py-24">
        <div className="max-w-2xl mx-auto flex flex-col justify-center min-h-[240px]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight text-center md:text-left">
            Hi, I'm Laxman KC
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-xl mb-8 leading-relaxed text-center md:text-left">
            Software Developer passionate about solving real-world problems
            through technology. I explore cloud computing, system design, AI,
            programming languages, and design patterns to craft impactful
            solutions.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center md:justify-start w-full">
            <Link
              href="/blog"
              className="text-base font-medium underline underline-offset-4 hover:opacity-70 transition-opacity text-center sm:text-left cursor-pointer"
            >
              Read My Blog
            </Link>
            <Link
              href="/project"
              className="text-base font-medium underline underline-offset-4 hover:opacity-70 transition-opacity text-center sm:text-left cursor-pointer"
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Blogs */}
      <ClientOnly fallback={<div>Loading...</div>}>
        <FeaturedBlogs />
      </ClientOnly>

      {/* Featured Projects */}
      <ClientOnly fallback={<div>Loading...</div>}>
        <FeaturedProjects />
      </ClientOnly>
    </main>
  );
}
