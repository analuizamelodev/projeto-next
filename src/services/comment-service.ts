import { apiClient } from "../libs/api";

export const getAllComments = async () => {
  const response = await apiClient.get("/comment");
  return response.data;
};
