import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../src/App.css";
import WelcomeScreen from "./page/HomePage";
import RoomSelection from "./page/RoomSelection";
import { Toaster } from "react-hot-toast";
import NotFound from "./page/NotFound";
import Room from "./page/Room";
import SliderSelect from "./components/SliderSelect";
<<<<<<< HEAD

=======
import MainPage from "./page/MainPage";
import FullScreenLoading from "./components/Loading";
import { useEffect } from "react";
import socket from "./socket";
import toast from "react-hot-toast";
>>>>>>> 7b12379b0a1b2d4d6eb344ef173478eb9d648cc2
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
<<<<<<< HEAD
          <Route path="/room/:roomName" element={<Room />} />
=======
          <Route path="/room" element={<Room />} />
>>>>>>> 7b12379b0a1b2d4d6eb344ef173478eb9d648cc2
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
