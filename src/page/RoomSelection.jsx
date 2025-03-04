import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import socket from "../socket";

let toastId = null; // Biến lưu ID của toast

const toastConfirm = (message) => {
  return new Promise((resolve) => {
    if (toastId !== null) {
      toast.dismiss(toastId); // Nếu có toast cũ, đóng nó trước
    }

    toastId = toast(
      (t) => (
        <div>
          <p>{message}</p>
          <div className="flex gap-2 mt-2 justify-between">
            <button
              className="btn btn-sm btn-warning text-gray-700"
              onClick={() => {
                toast.dismiss(t.id);
                toastId = null;
                resolve(true);
              }}
            >
              Tạm biệt... 😭
            </button>
            <button
              className="btn btn-sm btn-primary text-white"
              onClick={() => {
                toast.dismiss(t.id);
                toastId = null;
                resolve(false);
              }}
            >
              Khoan đã, tôi đùa 🤯
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  });
};

export default function RoomSelection() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [roomNameJoin, setRoomNameJoin] = useState("");
  const [roomNameCreate, setRoomNameCreate] = useState("");

  const onJoinRoom = () => {
    socket.emit("joinRoom", {
      userId: user.id,
      roomName: roomNameJoin,
    });
  };

  const onCreateRoom = () => {
    socket.emit("createRoom", {
      userId: user.id,
      name: roomNameCreate,
    });
  };

  const logout = async () => {
    const confirmed = await toastConfirm(
      "Bạn có chắc muốn đăng xuất không? Một cú click thôi là tôi quên bạn luôn đấy! 😢"
    );
    if (confirmed) {
      socket.emit("logout", JSON.stringify({ userId: user.id }));
      dispatch(logoutUser());
      navigate("/");
      toast.success(
        "Bạn đã rời đi! Hy vọng bạn không bỏ tôi như người yêu cũ! 💔!"
      );
    } else {
      // toast.error("Hủy xóa!");
    }
  };

  useEffect(() => {
    socket.on("roomInfo", (data) => {
      const parsedData = JSON.parse(data);
      navigate("/room", { state: { roomData: parsedData } });
    });

    return () => {
      socket.off("roomInfo");
    };
  }, []);

  useEffect(() => {
    // Nếu chưa đăng nhập thì chuyển về trang chủ
    if (!user?.id) {
      navigate("/");
      return;
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen to-pink-500 text-white p-6 ">
      <div className="p-6 rounded-2xl shadow-xl w-full mx-4 max-w-96 bg-primary text-white">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={user?.avatar || null}
            alt="Avatar"
            className="w-12 h-12 rounded-full border-2 border-purple-500 object-cover"
          />
          <h2 className="text-lg font-bold">Chào, {user?.name}! </h2>
          <button className="btn btn-xs ml-auto" onClick={logout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-box-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
              />
              <path
                fillRule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
              />
            </svg>
          </button>
        </div>

        <h3 className="text-lg font-semibold mb-3">Chơi cùng bạn bè:</h3>
        <input
          type="text"
          placeholder="Nhập tên phòng của bạn bè"
          value={roomNameJoin}
          onChange={(e) => setRoomNameJoin(e.target.value)}
          className="input input-bordered w-full mb-3 text-black"
        />
        <button
          onClick={() => onJoinRoom()}
          className="btn btn-primary w-full text-white"
          disabled={!roomNameJoin.trim()}
        >
          Vào phòng 🚀
        </button>

        <div className="divider">Hoặc</div>

        <h3 className="text-lg font-semibold mb-2">Tạo phòng mới:</h3>
        <input
          type="text"
          placeholder="Nhập tên phòng"
          value={roomNameCreate}
          onChange={(e) => setRoomNameCreate(e.target.value)}
          className="input input-bordered w-full mb-3 text-black"
        />
        <button
          onClick={() => onCreateRoom()}
          className="btn btn-success w-full text-white"
          disabled={!roomNameCreate.trim()}
        >
          Tạo phòng 🏠
        </button>
      </div>
    </div>
  );
}
