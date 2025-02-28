import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

export default function RoomSelection() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const nagivate = useNavigate()
  const [roomNameJoin, setRoomNameJoin] = useState("");
  const [roomNameCreate, setRoomNameCreate] = useState("");

  const onJoinRoom = () => {
    console.log(`Người dùng ${user.name} muốn tham gia phòng ${roomNameJoin}`);
  };

  const onCreateRoom = () => {
    console.log(`Người dùng ${user.name} muốn tạo phòng ${roomNameCreate}`);
  };

  const logout = () => {
    dispatch(logoutUser());
    nagivate("/");
  };

  useEffect(() => {
    console.log("user: ", user);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
      <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-xl w-96">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={user?.avatar}
            alt="Avatar"
            className="w-12 h-12 rounded-full border-2 border-purple-500 object-cover"
          />
          <h2 className="text-lg font-bold">Chào, {user.name}! </h2>
          <button className="btn btn-xs" onClick={logout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-box-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
              />
              <path
                fill-rule="evenodd"
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
          className="input input-bordered w-full mb-3"
        />
        <button
          onClick={() => onJoinRoom()}
          className="btn btn-primary w-full"
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
          className="input input-bordered w-full mb-3"
        />
        <button
          onClick={() => onCreateRoom()}
          className="btn btn-success w-full"
          disabled={!roomNameCreate.trim()}
        >
          Tạo phòng 🏠
        </button>
      </div>
    </div>
  );
}
