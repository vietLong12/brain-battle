import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaChessKing, FaCrown } from "react-icons/fa";
import { FaChessQueen } from "react-icons/fa6";
import { GiTrophyCup } from "react-icons/gi";

const leaderboardData = [
  {
    name: "Derrick VegaNorman SantosNorman SantosNorman SantosNorman SantosNorman Santos",
    score: 892456,
    img: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Victoria Cole",
    score: 729234,
    img: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Victoria Cole",
    score: 679234,
    img: "https://i.pravatar.cc/100?img=6",
  },
  {
    name: "Norman SantosNorman SantosNorman SantosNorman SantosNorman Santos",
    score: 325123,
    img: "https://i.pravatar.cc/50?img=7",
  },
  { name: "Nora Parks", score: 303849, img: "https://i.pravatar.cc/50?img=8" },
  { name: "Tony", score: 300000, img: "https://i.pravatar.cc/50?img=9" },
];

const ModalRanking = () => {
  const [rankingPlayers, setRankingPlayers] = useState([]);

  useEffect(() => {
    console.log("leaderboardData: ", leaderboardData);

    const dataSort = [...leaderboardData].sort((a, b) => b.score - a.score);

    if (dataSort.length > 1) {
      [dataSort[0], dataSort[1]] = [dataSort[1], dataSort[0]];
    }

    setRankingPlayers(dataSort);
  }, [leaderboardData]);

  return (
    <dialog
      id="modal_ranking"
      className="modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          document.getElementById("modal_ranking").close();
        }
      }}
    >
      <div className="modal-box bg-primary text-white">
        <h2 className="text-center text-2xl font-bold mb-4 uppercase flex items-center justify-center text-">
          <GiTrophyCup /> <span className="mx-1">Bảng xếp hạng</span>{" "}
          <GiTrophyCup />
        </h2>

        {/* Top 3 */}
        <div className="flex justify-center gap-4 mb-6 mt-10  grid grid-cols-3">
          {rankingPlayers.slice(0, 3).map((player, index) => (
            <div
              key={index}
              style={{
                background:
                  index === 1
                    ? "linear-gradient(to bottom, #ff4d6d, #ff002b)" // Hồng tươi -> Đỏ đậm
                    : "linear-gradient(to bottom, #007bff, #4b0082)", // Xanh dương -> Xanh tím
                borderRadius: "12px",
                padding: "16px",
                color: "white",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
              }}
              className={`relative flex flex-col items-center ${
                index === 1 ? "mb-8" : "mt-8"
              }`}
            >
              <img
                src={player.img}
                alt={player.name}
                className="w-16 h-16 rounded-full border-4 border-white"
              />
              <p className="text-sm font-bold mt-2 text-center line-clamp-2">
                {player.name}
              </p>
              <p className="text-lg font-semibold">{player.score}</p>
              {index === 1 ? (
                <FaChessKing className="absolute -top-9 text-yellow-300  text-3xl" />
              ) : (
                <FaChessQueen className="absolute -top-7 text-yellow-300 text-xl" />
              )}
            </div>
          ))}
        </div>

        {/* Danh sách top còn lại */}
        <div className="bg-[#1E123D] p-4 rounded-lg">
          {rankingPlayers.slice(3).map((player, index) => (
            <div
              key={index + 3}
              className="flex items-center justify-between py-2 border-b border-gray-600 last:border-none"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold">#{index + 4}</span>
                <img
                  src={player.img}
                  alt={player.name}
                  className="w-10 h-10 rounded-full"
                />
                <p className="text-sm line-clamp-1 mr-3">{player.name}</p>
              </div>
              <p className="font-semibold">{player.score}</p>
            </div>
          ))}
        </div>

        {/* Đóng modal */}
        {/* <form method="dialog" className="modal-backdrop">
          <button className="btn btn-primary mt-4">Đóng</button>
        </form> */}
      </div>
    </dialog>
  );
};

export default ModalRanking;
