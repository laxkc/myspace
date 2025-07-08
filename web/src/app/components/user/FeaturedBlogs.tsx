import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import Link from "next/link";
import { fetchFeaturedBlogs } from "@/lib/api/blogs";

// Calculate read time based on word count
const calculateReadTime = (text: string): number => {
  const wordsPerMinute = 200; // Average reading speed
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

export default function FeaturedBlogs() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["featured-blogs"],
    queryFn: fetchFeaturedBlogs,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Loading state
  if (isLoading) {
    return (
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1 text-center md:text-left">
            Featured Blog Posts
          </h2>
          <p className="text-gray-600 text-base mb-6 md:mb-8 text-center md:text-left">
            Thoughts on software development, engineering, and technology
          </p>
        </div>
        <div className="max-w-6xl mx-auto flex justify-center items-center min-h-[200px]">
          <div className="w-full grid gap-y-8 gap-x-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-0 flex flex-col animate-pulse">
                <div className="h-48 w-full rounded mb-3 bg-gray-200" />
                <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-1/3 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-2/3 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-1/4 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state - user-friendly
  if (error) {
    // Log error for debugging (only in development)
    if (process.env.NODE_ENV === "development") {
      console.error("Blog fetch error:", error);
    }

    return (
      <div className="py-8 text-center">
        <div className="text-gray-500">
          <p>Unable to load featured blogs at the moment.</p>
          <p className="text-sm mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!data?.data || data.data.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="text-gray-500">
          <p>No featured blogs available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1 text-center md:text-left">
          Featured Blog Posts
        </h2>
        <p className="text-gray-600 text-base mb-6 md:mb-8 text-center md:text-left">
          Thoughts on software development, engineering, and technology
        </p>
      </div>

      <div className="grid gap-y-8 gap-x-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {data.data.map((blog: any) => (
          <article key={blog.id} className="p-0">
            <Link href={`/blog/${blog.slug}`} className="block hover:opacity-80 transition-opacity">
              {blog.cover_image && (
                <div
                  className="h-48 w-full rounded mb-3"
                  style={{
                    backgroundImage: `url(${blog.cover_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              )}

              <div className="flex flex-wrap gap-2 mb-2">
                {blog.tags &&
                  blog.tags.length > 0 &&
                  blog.tags.slice(0, 3).map((tag: any) => (
                    <span
                      key={tag.id}
                      className="text-xs text-gray-500 font-normal tracking-wide"
                    >
                      #{tag.slug}
                    </span>
                  ))}
              </div>

                          <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-semibold text-gray-900">
                {blog.title}
              </h3>
              {blog.is_featured && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                  Featured
                </span>
              )}
            </div>

              <p className="text-sm text-gray-700 mb-2 line-clamp-3">
                {blog.body}
              </p>

              <div className="flex justify-between text-xs text-gray-400">
                <span>
                  {new Date(blog.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span>{calculateReadTime(blog.body)} min read</span>
              </div>
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-8 md:mt-10 max-w-6xl mx-auto text-center md:text-left">
        <a
          href="/blog"
          className="text-base font-medium underline underline-offset-4 hover:opacity-70 transition-opacity cursor-pointer"
        >
          View All Posts →
        </a>
      </div>
    </section>
  );
}
