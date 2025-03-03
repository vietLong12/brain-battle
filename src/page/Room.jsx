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
<<<<<<< HEAD
import { useParams } from "react-router-dom";
import socket from "../services/socket";

export default function Room() {
  const navigate = useNavigate();
  const { roomName } = useParams();
  const user = useSelector((state) => state.user.userInfor);

  const [players, setPlayers] = useState([]);
  const [infor, setInfor] = useState({});

  const [selectedTopicIds, setSelectedTopicIds] = useState(new Set());

  // Số người chơi tối đa
  const MAX_PLAYERS = 3;

  const leaveRoom = () => {
    socket.emit(
      "leaveRoom",
      JSON.stringify({ roomName: roomName, userId: user.id })
    );
=======
import { useEffect } from "react";
import socket from "../socket";

export default function Room() {
  const navigate = useNavigate();
  const location = useLocation();
  const roomData = location.state?.roomData || {}; // Lấy data từ navigate
  const user = useSelector((state) => state.user);
  const [players, setPlayers] = useState(roomData.users);
  const [roomInfo, setRoomInfo] = useState(roomData.roomInfo);
  const topics = ["Âm nhạc", "Phim ảnh", "Thể thao", "Khoa học", "Lịch sử"];
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [isHost, setIsHost] = useState(roomInfo.owner === user.id);
  // Số người chơi tối đa
  const MAX_PLAYERS = 6;

  const leaveRoom = () => {
    socket.emit("leaveRoom", { roomName: roomInfo.name, userId: user.id });
>>>>>>> 7b12379b0a1b2d4d6eb344ef173478eb9d648cc2
    navigate("/");
  };

  const copyRoom = (name) => {
    const input = document.createElement("input");
    input.value = name;
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, 99999); // Đảm bảo chọn toàn bộ nội dung
    document.execCommand("copy");
    document.body.removeChild(input);
    toast.success("📋 Đã sao chép!");
  };

<<<<<<< HEAD
  const startGame = () => {
    socket.emit(
      "startGame",
      JSON.stringify({
        roomName,
        userId: user.id,
        topicsIds: Array.from(selectedTopicIds),
      })
    );
  };

  // Lấy thông tin của phòng chơi khi ngừo chơi reload lại
  useEffect(() => {
    socket.on("roomInfo", (data) => {
      const room = JSON.parse(data);
      setPlayers(room.users);
      setInfor(room.roomInfo);
    });
    socket.on("roomDeleted", () => {
      navigate("/join");
      toast.error("Phòng đã bị xóa bởi chủ phòng");
    });
    socket.on("gameStarted", (data) => {
      const room = JSON.parse(data);
      console.log(room);
    });
  }, []);

  // Lấy thông tin phòng chơi khi người chơi vào phòng
  useEffect(() => {
    if (!user.id || !roomName) {
      navigate("/");
      return;
    }

    socket.emit(
      "getRoomInfo",
      JSON.stringify({ roomName: roomName, userId: user.id })
    );
  }, []);

  // lăng nghe sự kiện lỗi từ server
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
=======
  useEffect(() => {
    const handleRoomDeleted = () => {
      socket.emit("leaveRoom", { roomName: roomInfo.name, userId: user.id });
      navigate("/");
    };

    socket.on("roomInfo", (data) => {
      console.log("Có thành viên mới gia nhập");
      const parsedData = JSON.parse(data);
      console.log('parsedData: ', parsedData);
      setIsHost(roomInfo.owner === user.id);
      setRoomInfo(parsedData.roomInfo);
      setPlayers(parsedData.users)
    });

    socket.on("roomDeleted", handleRoomDeleted);

    return () => {
      socket.off("roomDeleted", handleRoomDeleted);
>>>>>>> 7b12379b0a1b2d4d6eb344ef173478eb9d648cc2
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {user.id === infor?.owner ? (
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
      {user.id === infor?.owner && players.length === MAX_PLAYERS && (
        <button
          className="px-6 py-3 mb-5 bg-green-500 btn btn-primary text-white text-2xl uppercase rounded-full shadow-md hover:bg-green-600 transition flex items-center font-bold"
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
<<<<<<< HEAD
            {infor?.name}
=======
            {roomInfo.name}
>>>>>>> 7b12379b0a1b2d4d6eb344ef173478eb9d648cc2
          </span>
          <FaCopy
            className="ml-3 text-blue-500 cursor-pointer"
            onClick={() => copyRoom(infor?.name)}
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
<<<<<<< HEAD
                <div className="bg-neutral text-neutral-content w-6 rounded-full">
                  <img src={player.avatar}></img>
=======
                <div className="avatar">
                  <div className="w-7 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
>>>>>>> 7b12379b0a1b2d4d6eb344ef173478eb9d648cc2
                </div>
              </div>
              <span className="text-[18px] font-medium">{player.name}</span>
              {player.id === infor?.owner && (
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
        isHost={user.id === infor?.owner}
        selectedTopicIds={selectedTopicIds}
        setSelectedTopicIds={setSelectedTopicIds}
      />
      {/* Nút bắt đầu (chỉ hiện khi đủ người & chủ phòng) */}
    </div>
  );
}
