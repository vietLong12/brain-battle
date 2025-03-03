import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../src/App.css";
import WelcomeScreen from "./page/HomePage";
import RoomSelection from "./page/RoomSelection";
import { Toaster } from "react-hot-toast";
import NotFound from "./page/NotFound";
import Room from "./page/Room";
import MainPage from "./page/MainPage";
import FullScreenLoading from "./components/Loading";
import { useEffect } from "react";
import socket from "./socket";
import toast from "react-hot-toast";
function App() {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Đã kết nối tới server!");
    });

    socket.on("error", (msg) => {
      console.log("msg: ", msg);
      toast.error(JSON.parse(msg).message);
    });
    return () => {
      socket.off("error");
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div>
        <Toaster />
        <FullScreenLoading />
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/game" element={<MainPage />} />
          <Route path="/join" element={<RoomSelection />} />
          <Route path="/room" element={<Room />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
