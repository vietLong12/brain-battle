import React, { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import socket from "../socket";

const AnswerOptions = ({ questions, roomName, userId }) => {
  const [selected, setSelected] = useState(""); // Câu trả lời đã chọn
  const [isCorrect, setIsCorrect] = useState(""); // Câu trả lời đúng
  const [isDisable, setIsDisable] = useState(false); // Câu trả lời đúng

  if (!questions || questions?.options?.length === 0) {
    return <div>No questions available</div>;
  }
  const handleSubmit = (answer) => {
    setSelected(answer);
    socket.emit("answerQuestion", {
      roomName,
      answer,
      userId,
      questionId: questions._id,
    });
    setIsDisable(true);
  };

  useEffect(() => {
    socket.on("resultQuestion", (data) => {
      console.log(data);

      setIsCorrect(data.message);
      setIsDisable(false);
      setSelected("");
    });
  }, []);
  return (
    <div className="space-y-3">
      {questions?.options.map((option) => {
        const isSelected = option.key === selected;

        return (
          <label
            key={option._id}
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
            <span>{option.text}</span>
            <input
              disabled={isDisable}
              type="radio"
              name="answer"
              value={option.text}
              checked={isSelected}
              onClick={() => handleSubmit(option.key)}
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
