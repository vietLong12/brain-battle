import React from "react";
import { CgLogOut } from "react-icons/cg";
import { PiRankingFill } from "react-icons/pi";
import CircleCountDown from "../components/CircleCountDown";
import AnswerOptions from "../components/AnswerOptions";
import ModalRanking from "../components/ModalRanking";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import socket from "../socket";
import Countdown from "../components/CountDown";
import { useRef } from "react";
import { useState } from "react";

const MainPage = ({ play }) => {
  const navigate = useNavigate();
  const onTimeout = () => {
    alert("Hết giờ");
  };
  const location = useLocation();
  const dataNavigate = location.state || {}; // Lấy data từ navigate

  const countDownRef = useRef(null);

  const onComplete = () => {
    console.log("Bat dau");
    console.log("countDownRef.current: ", countDownRef.current());
    play();
  };

  useEffect(() => {
    console.log(dataNavigate);

    socket.on("newTurn", (data) => {
      console.log("newTurn: ", data);
    });
    // socket.on("updateTimer", (data) => {
    //   setTime(data.timeLeft);
    //   console.log("updateTimer", data);
    // });
    socket.on("updateRoom", (data) => {
      console.log("updateRoom", data);
    });
    return () => {
      socket.off("newTurn");
      socket.off("updateTimer");
      socket.off("updateRoom");
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
            start={countDownRef}
            onTimeout={onTimeout}
            duration={10}
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
            Chủ đề: <span className="font-bold">Truyện tranh & Anime</span>
          </div>
        </div>

        <div className="text-lg font-semibold mb-6 text-center">
          How many students in your class ___ from Korea?
        </div>
        <AnswerOptions />
      </div>
    </div>
  );
};

export default MainPage;
