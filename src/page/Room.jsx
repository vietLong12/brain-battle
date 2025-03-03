import { useEffect, useState } from "react";
import SliderSelect from "../components/SliderSelect";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaChessKing,
  FaCopy,
  FaGamepad,
  FaHouseUser,
  FaUserFriends,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import socket from "../socket";

export default function Room() {
  const navigate = useNavigate();
  const location = useLocation();
  const roomData = location.state?.roomData || {}; // Lấy data từ navigate

  const user = useSelector((state) => state.user);
  const [players, setPlayers] = useState(roomData.users);
  const [roomInfo, setRoomInfo] = useState(roomData.roomInfo);
  const [selectedTopicIds, setSelectedTopicIds] = useState(new Set());
  // Số người chơi tối đa
  const MAX_PLAYERS = 3;

  const leaveRoom = () => {
    socket.emit("leaveRoom", { roomName: roomInfo.name, userId: user.id });
    navigate("/join");
  };

  const startGame = () => {
    const data = {
      roomName: roomInfo.name,
      userId: user.id,
      topicsIds: [...selectedTopicIds],
    };
    socket.emit("startGame", JSON.stringify(data));
  };

  const copyRoom = () => {
    const input = document.createElement("input");
    input.value = roomInfo.name;
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, 99999); // Đảm bảo chọn toàn bộ nội dung
    document.execCommand("copy");
    document.body.removeChild(input);
    toast.success("📋 Đã sao chép!");
  };

  useEffect(() => {
    const handleRoomDeleted = () => {
      socket.emit("leaveRoom", { roomName: roomInfo.name, userId: user.id });
      navigate("/join");
    };

    socket.on("roomInfo", (data) => {
      console.log("Có thành viên mới gia nhập");
      const parsedData = JSON.parse(data);
      setRoomInfo(parsedData.roomInfo);
      setPlayers(parsedData.users);
    });

    socket.on("gameStarted", (data) => {
      // console.log("data start: ", data);
    });

    socket.on("newTurn", (data) => {
      console.log("data: ", data);
      navigate("/game", data);
    });

    socket.on("roomDeleted", handleRoomDeleted);

    return () => {
      socket.off("newTurn");
      socket.off("roomDeleted", handleRoomDeleted);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {user.id === roomInfo?.owner ? (
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
      {user.id === roomInfo?.owner && players.length === MAX_PLAYERS && (
        <button
          className="px-6 mb-5 bg-green-500 btn btn-primary text-white text-2xl uppercase rounded-full shadow-md hover:bg-green-600 transition flex !items-center font-bold"
          onClick={startGame}
        >
          🎯 Bắt đầu chơi! 🎯
        </button>
      )}
      {/* Danh sach nguoi choi */}
      <div className="w-full max-w-md bg-primary text-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <span className="w-[130px] flex-shrink-0 flex items-center">
            <FaHouseUser className="mr-2" /> Tên phòng:
          </span>
          <span className="text-error flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
            {roomInfo.name}
          </span>
          <FaCopy
            className="ml-3 text-blue-500 cursor-pointer"
            onClick={() => copyRoom(roomInfo?.name)}
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
                <div className="avatar">
                  <div className="w-7 rounded-full">
                    <img src={player.avatar} />
                  </div>
                </div>
              </div>
              <span className="text-[18px] font-medium">{player.name}</span>
              {player.id === roomInfo?.owner && (
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
      <div className="w-full max-w-md flex items-center justify-center">
        <button
          className="btn btn-warning text-gray-700"
          onClick={() => leaveRoom()}
        >
          Rời phòng
        </button>
      </div>
      {/* Chọn chủ đề */}
      <SliderSelect
        isHost={user.id === roomInfo?.owner}
        selectedTopicIds={selectedTopicIds}
        setSelectedTopicIds={setSelectedTopicIds}
      />
      {/* Nút bắt đầu (chỉ hiện khi đủ người & chủ phòng) */}
    </div>
  );
}
