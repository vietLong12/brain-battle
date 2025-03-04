import React, { useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { PiRankingFill } from "react-icons/pi";
import CircleCountDown from "../components/CircleCountDown";
import AnswerOptions from "../components/AnswerOptions";
import ModalRanking from "../components/ModalRanking";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import socket from "../socket";
import Countdown from "../components/CountDown";
import { useSelector } from "react-redux";

const MainPage = ({ play }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const { name, id } = location.state.room || {};

  const [questionData, setQuestionData] = useState({});
  const [endTime, setEndTime] = useState(0);

  const onComplete = () => {
    socket.emit("getQuestionRoom", { roomName: name, userId: user.id });
  };

  useEffect(() => {
    socket.on("newQuestion", (data) => {
      console.log(data);
      setEndTime(data.endTime); // Nhận endTime từ server
      setQuestionData(data.question);
    });

    socket.emit("reJoinRoom", { idRoom: id });

    return () => {
      socket.off("newQuestion");
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Countdown onComplete={onComplete} />
      <div className="bg-primary shadow-lg rounded-lg p-6 w-96 mx-4 text-white ">
        <div className="flex justify-between items-start mb-4 relative">
          <button
            className="btn btn-outline border-2 border-white btn-sm text-white text-[20px] "
            onClick={() => navigate("/join")}
          >
            <CgLogOut />
          </button>
          <ModalRanking />
          <CircleCountDown
            endTime={endTime}
            classNameCustom="relative top-[-53px]"
          />
          <button
            className="btn btn-outline border-2 border-white btn-sm text-white text-[20px]"
            onClick={() => document.getElementById("modal_ranking").showModal()}
          >
            <PiRankingFill />
          </button>
        </div>
        <div className="flex justify-center items-center mb-4">
          <div className="text-[20px]">
            Chủ đề:{" "}
            <span className="font-bold">{questionData?.topicInfo?.name}</span>
          </div>
        </div>

        <div className="text-lg font-semibold mb-6 text-center">
          {questionData?.question}
        </div>
        {questionData.question && (
          <AnswerOptions
            questions={questionData}
            roomName={name}
            userId={user.id}
          />
        )}
      </div>
    </div>
  );
};

export default MainPage;
