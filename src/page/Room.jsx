import { useState } from "react";
import SliderSelect from "../components/SliderSelect";
import { useNavigate } from "react-router-dom";
import {
  FaChessKing,
  FaCopy,
  FaGamepad,
  FaHouseUser,
  FaUserFriends,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function Room() {
  const navigate = useNavigate();

  const [players, setPlayers] = useState([
    { id: 1, avatar: "N", name: "Nam", isHost: true },
    { id: 2, avatar: "H", name: "Huy" },
    { id: 3, avatar: "L", name: "Linh" },
    { id: 3, avatar: "L", name: "Linh" },
    { id: 3, avatar: "L", name: "Linh" },
    { id: 3, avatar: "L", name: "Linh" },
  ]);

  const topics = ["Âm nhạc", "Phim ảnh", "Thể thao", "Khoa học", "Lịch sử"];
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);

  // Số người chơi tối đa
  const MAX_PLAYERS = 6;

  const isHost = true;

  const leaveRoom = () => {
    navigate("/");
  };

  const copyRoom = () => {
    const input = document.createElement("input");
    input.value = "hello brain battle";
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, 99999); // Đảm bảo chọn toàn bộ nội dung
    document.execCommand("copy");
    document.body.removeChild(input);
    toast.success("📋 Đã sao chép!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {isHost ? (
        <h1 className="text-2xl font-bold mb-4 text-white text-center">
          Bạn là trùm ở đây! Đợi đủ người rồi nhấn "Bắt đầu chơi" để thị uy
          quyền lực!
          <br />
          😎😎😎
        </h1>
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4 text-white text-center">
            ☕☕☕ <br /> Chủ phòng đang uống trà? Chờ xíu để họ "đánh thức" trò
            chơi nhé!
          </h1>
          <span className="loading loading-dots loading-lg mb-3 text-white"></span>
        </>
      )}

      {isHost && players.length === 6 && (
        <button className="px-6 py-3 mb-5 bg-green-500 btn btn-primary text-white text-2xl uppercase rounded-full shadow-md hover:bg-green-600 transition flex items-center font-bold">
          🎯 Bắt đầu chơi! 🎯
        </button>
      )}

      {/* Danh sách người chơi */}
      <div className="w-full max-w-md bg-primary text-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <span className="w-[130px] flex-shrink-0 flex items-center">
            <FaHouseUser className="mr-2" /> Tên phòng:
          </span>
          <span className="text-error flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
            Việt Long's Room Việt Long's Room Việt Long's Room Việt Long's Room
          </span>
          <FaCopy
            className="ml-3 text-blue-500 cursor-pointer"
            onClick={() => copyRoom()}
          />
        </h2>

        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <FaUserFriends className="mr-2" /> Người chơi:
        </h2>
        <ul className="divide-y divide-gray-300">
          {players.map((player) => (
            <li
              key={player.id}
              className="py-2 flex justify-start items-center"
            >
              <div className="avatar placeholder mr-2">
                <div className="bg-neutral text-neutral-content w-6 rounded-full">
                  <span>{player.avatar}</span>
                </div>
              </div>
              <span className="text-[18px] font-medium">{player.name}</span>
              {player.isHost && (
                <span className="text-sm  ml-auto">
                  <FaChessKing className="text-2xl text-yellow-300" />
                </span>
              )}
            </li>
          ))}
        </ul>
        <p className="text-md mt-2 flex items-center ml-auto w-fit">
          <FaGamepad className="mr-1" />
          {players.length}/{MAX_PLAYERS} người đã tham gia
        </p>
      </div>
      <button
        className="btn btn-warning text-gray-700 ml-auto"
        onClick={() => leaveRoom()}
      >
        Rời phòng
      </button>
      {/* Chọn chủ đề */}
      <SliderSelect isHost={isHost} />

      {/* Nút bắt đầu (chỉ hiện khi đủ người & chủ phòng) */}
    </div>
  );
}
