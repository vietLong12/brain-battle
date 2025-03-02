import apiClient from "./apiClient";

const UserServices = {
  registerAccount: async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      const response = await apiClient.post("/user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createRoom: async (data) => {
    try {
      const response = await apiClient.post("/user/createRoom", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default UserServices;
