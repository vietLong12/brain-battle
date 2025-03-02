import React from "react";
import { CgLogOut } from "react-icons/cg";
import { PiRankingFill } from "react-icons/pi";
import CircleCountDown from "../components/CircleCountDown";
import AnswerOptions from "../components/AnswerOptions";
import ModalRanking from "../components/ModalRanking";

const MainPage = () => {
  const onTimeout = () => {
    alert("Hết giờ");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-primary shadow-lg rounded-lg p-6 w-96 mx-4 text-white ">
        <div className="flex justify-between items-start mb-4 relative">
          <button className="btn btn-outline border-2 border-white btn-sm text-white text-[20px] ">
            <CgLogOut />
          </button>
          <ModalRanking />
          <CircleCountDown
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
