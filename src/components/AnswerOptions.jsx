import React, { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";

const AnswerOptions = () => {
  const [selected, setSelected] = useState("come"); // Câu trả lời đã chọn
  const correctAnswer = "come"; // Đáp án đúng

  return (
    <div className="space-y-3">
      {["come", "comes", "are coming", "came"].map((option) => {
        const isCorrect = option === correctAnswer;
        const isSelected = option === selected;

        return (
          <label
            key={option}
            className={`flex items-center justify-between w-full p-3 border-2 rounded-lg cursor-pointer 
              ${
                isSelected
                  ? isCorrect
                    ? "border-purple-500 text-purple-500"
                    : "border-red-500 text-red-500"
                  : "border-gray-300 text-white"
              }
            `}
          >
            <span>{option}</span>
            <input
              type="radio"
              name="answer"
              value={option}
              checked={isSelected}
              onChange={() => setSelected(option)}
              className="hidden"
            />
            {isSelected && (
              <span
                className={`${isCorrect ? "text-purple-500" : "text-red-500"}`}
              >
                {isCorrect ? <FaRegCheckCircle /> : <FaRegCircleXmark />}
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
};

export default AnswerOptions;
