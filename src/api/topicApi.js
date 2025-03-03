import ApiClient from "./config";

export const getAllTopics = async () => {
  try {
    const response = await ApiClient.get("/topic/getAllTopics");
    return response.data;
  } catch (error) {
    throw error;
  }
};
