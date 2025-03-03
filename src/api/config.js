import axios from "axios";
import toast from "react-hot-toast";

// Tạo một instance của axios
const ApiClient = axios.create({
    baseURL: "http://localhost:8000/v1/quizzApp",
    timeout: 20000, // 10s timeout
    headers: {
        "Content-Type": "application/json",
    },
});

// Xử lý lỗi response
ApiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        toast.error("API Error:", error.response?.data || error.message)
        return Promise.reject(error);
    }
);

export default ApiClient;
