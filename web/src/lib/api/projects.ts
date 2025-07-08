import api from "./axios";

// Featured projects
export const fetchFeaturedProjects = async () => {
    const response = await api.get("/project/featured");
    return response;
}