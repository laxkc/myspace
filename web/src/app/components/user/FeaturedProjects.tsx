import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchFeaturedProjects } from "@/lib/api/projects";

export default function FeaturedProjects() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: fetchFeaturedProjects,
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
            Featured Projects
          </h2>
          <p className="text-gray-600 text-base mb-6 md:mb-8 text-center md:text-left">
            A selection of my recent work and side projects
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

  // Error state
  if (error) {
    // Log error for debugging (only in development)
    if (process.env.NODE_ENV === "development") {
      console.error("Project fetch error:", error);
    }

    return (
      <div className="py-8 text-center">
        <div className="text-gray-500">
          <p>Unable to load featured projects at the moment.</p>
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
          <p>No featured projects available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1 text-center md:text-left">
          Featured Projects
        </h2>
        <p className="text-gray-600 text-base mb-6 md:mb-8 text-center md:text-left">
          A selection of my recent work and side projects
        </p>
      </div>
      <div className="grid gap-y-8 gap-x-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {data.data.map((project: any) => (
          <article key={project.id} className="p-0 flex flex-col">
            {project.github_url ? (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition-opacity"
              >
                {project.media && (
                  <div
                    className="h-48 w-full rounded mb-3"
                    style={{
                      backgroundImage: `url(${project.media})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                )}
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags &&
                    project.tags.length > 0 &&
                    project.tags.slice(0, 3).map((tag: any) => (
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
                    {project.title}
                  </h3>
                  {project.is_featured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700 flex-1 mb-2">
                  {project.description}
                </p>
                <div className="mt-auto flex gap-4 text-xs text-gray-500">
                  <span className="hover:underline">GitHub →</span>
                  {project.live_demo_url && (
                    <span className="hover:underline">Live Demo →</span>
                  )}
                </div>
              </a>
            ) : (
              <>
                {project.media && (
                  <div
                    className="h-48 w-full rounded mb-3"
                    style={{
                      backgroundImage: `url(${project.media})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                )}
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags &&
                    project.tags.length > 0 &&
                    project.tags.slice(0, 3).map((tag: any) => (
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
                    {project.title}
                  </h3>
                  {project.is_featured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700 flex-1 mb-2">
                  {project.description}
                </p>
                <div className="mt-auto flex gap-4 text-xs text-gray-500">
                  {project.live_demo_url && (
                    <a
                      href={project.live_demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Live Demo →
                    </a>
                  )}
                </div>
              </>
            )}
          </article>
        ))}
      </div>
      <div className="mt-8 md:mt-10 max-w-6xl mx-auto text-center md:text-left">
        <Link
          href="/project"
          className="text-base font-medium underline underline-offset-4 hover:opacity-70 transition-opacity cursor-pointer"
        >
          View All Projects →
        </Link>
      </div>
    </section>
  );
}
