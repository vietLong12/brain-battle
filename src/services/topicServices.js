import apiClient from "./apiClient";

const TopicServices = {
  getAllTopics: async () => {
    try {
      const response = await apiClient.get("/topic/getAllTopics");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default TopicServices;
