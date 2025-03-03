import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
<<<<<<< HEAD
import socket from "../services/socket";
=======
import socket from "../socket";
>>>>>>> 7b12379b0a1b2d4d6eb344ef173478eb9d648cc2

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
  const user = useSelector((state) => state.user.userInfor);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [roomNameJoin, setRoomNameJoin] = useState("");
  const [roomNameCreate, setRoomNameCreate] = useState("");
  const [loading, setLoading] = useState(false);

  const onJoinRoom = () => {
<<<<<<< HEAD
    setLoading(true);

    if (roomNameJoin && user.id) {
      socket.emit(
        "joinRoom",
        JSON.stringify({ roomName: roomNameJoin, userId: user.id })
      );
    } else {
      toast.error("Tên phòng không hợp lệ");
    }
    setLoading(false);
  };

  const onCreateRoom = async () => {
    setLoading(true);
    if (roomNameCreate && user.id) {
      socket.emit(
        "createRoom",
        JSON.stringify({ userId: user.id, name: roomNameCreate })
      );
    } else {
      toast.error("Tên phòng không hợp lệ");
    }
    setLoading(false);
=======
    console.log(`Người dùng ${user.name} muốn tham gia phòng ${roomNameJoin}`);
    socket.emit("joinRoom", {
      userId: user.id,
      roomName: roomNameJoin,
    });
  };

  const onCreateRoom = () => {
    console.log(`Người dùng ${user.name} muốn tạo phòng ${roomNameCreate}`);
    socket.emit("createRoom", {
      userId: user.id,
      name: roomNameCreate,
    });
>>>>>>> 7b12379b0a1b2d4d6eb344ef173478eb9d648cc2
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
<<<<<<< HEAD
    if (!user.name) {
      navigate("/");
      return;
    }
    socket.on("roomInfo", (data) => {
      const room = JSON.parse(data);
      if (room) {
        navigate(`/room/${room.roomInfo.name}`);
      }
    });
=======
    socket.on("roomInfo", (data) => {
      const parsedData = JSON.parse(data);
      console.log("data: ", parsedData);
      navigate("/room", { state: { roomData: parsedData } });
    });

    return () => {
      socket.off("roomInfo");
    };
>>>>>>> 7b12379b0a1b2d4d6eb344ef173478eb9d648cc2
  }, []);

  useEffect(() => {
    const handleError = (data) => {
      const msg = JSON.parse(data);

      // Xóa toast cũ trước khi hiển thị toast mới
      toast.dismiss();
      toast.error(msg.message);
    };

    socket.on("error", handleError);

    return () => {
      socket.off("error", handleError); // Cleanup tránh đăng ký nhiều lần
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen to-pink-500 text-white p-6 ">
      <div className="bg-white  p-6 rounded-2xl shadow-xl w-full mx-4 max-w-96 bg-primary text-white">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={user.avatar || null}
            alt="Avatar"
            className="w-12 h-12 rounded-full border-2 border-purple-500 object-cover"
          />
          <h2 className="text-lg font-bold">Chào, {user.name}! </h2>
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
          disabled={!roomNameJoin.trim() || loading}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "  Vào phòng 🚀"
          )}
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
          disabled={!roomNameCreate.trim() || loading}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Tạo phòng 🏠"
          )}
        </button>
      </div>
    </div>
  );
}
