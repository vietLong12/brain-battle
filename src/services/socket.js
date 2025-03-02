import { io } from "socket.io-client";

const socket = io("http://localhost:8000", {
  transports: ["websocket"], // Ép buộc dùng WebSocket, tránh polling
  withCredentials: true,
});

export default socket;
