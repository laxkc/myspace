import api from "./axios";

// Get featured blogs
export const fetchFeaturedBlogs = async () => {
    const response = await api.get("/blog/featured");
    return response;
}


// Get all tags based on blogs
export const fetchAllBlogTags = async () => {
    const response = await api.get("/blog/tags");
    return response;
}

// Get blog by slug
export const fetchBlogBySlug = async (slug: string) => {
    const response = await api.get(`/blog/slug/${slug}`);
    return response.data;
}


// Pagination for published blogs
export const fetchPaginatedPublishedBlogs = async (page: number, limit: number) => {
    const response = await api.get(`/blog/pagination/${page}/${limit}`);
    return response.data;
}

