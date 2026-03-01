import { apiClient } from "../libs/api";

export const getPublications = async () => {
  const response = await apiClient.get("/publication");
  return response.data;
};
