import { apiClient } from "../libs/api";

export const loginUser = async (email: string, password: string) => {
    const response = await apiClient.post("/login", {
        email,
        password,
    });
    return response.data;
};

export const registerUser = async (name: string, email: string, password: string) => {
    const response = await apiClient.post("/register", {
        name,
        email,
        password,
    });
    return response.data;
};