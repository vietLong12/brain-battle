import ApiClient from "./config";

export const createUser = async ({ name, file }) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("avatar", file);
  try {
    const res = await ApiClient.post("/user/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    console.log("error: ", error);
  }
};
