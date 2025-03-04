import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const CircleCountDown = ({ endTime, classNameCustom }) => {
  // Tính thời gian còn lại ngay khi component render
  const getRemainingTime = () =>
    Math.max(0, Math.floor((endTime - Date.now()) / 1000));

  const [remainingTime, setRemainingTime] = useState(getRemainingTime());

  useEffect(() => {
    if (!endTime) return;

    const timer = setInterval(() => {
      const timeLeft = getRemainingTime();
      setRemainingTime(timeLeft);
      if (timeLeft <= 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div
      className={`text-center ${classNameCustom} bg-[#3e6e9e] text-white rounded-full`}
    >
      <span>{remainingTime}</span>
      {/* <CountdownCircleTimer
        key={endTime} // Reset timer khi endTime thay đổi
        isPlaying={remainingTime > 0}
        initialRemainingTime={remainingTime} // Tránh reset mỗi giây
        duration={remainingTime}
        size={60}
        strokeWidth={4}
        colors={["#00C9A7", "#FFDD44", "#FF3D00"]}
        colorsTime={[remainingTime * 0.8, remainingTime * 0.4, 0]}
        onComplete={() => {}}
      >
        {({ remainingTime }) => (
          <div className="text-lg font-bold">{remainingTime}</div>
        )}
      </CountdownCircleTimer> */}
    </div>
  );
};

export default CircleCountDown;
