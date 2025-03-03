import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const CircleCountDown = ({ duration = 5, onTimeout, classNameCustom, start, renderTime }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);

  start.current = () => {
    setKey((prev) => prev + 1);
    setIsPlaying(true);
  };

  return (
    <div
      className={`text-center ${classNameCustom} bg-[#3e6e9e] text-white rounded-full`}
    >
      <CountdownCircleTimer
        key={key}
        isPlaying={isPlaying}
        duration={duration}
        size={60}
        strokeWidth={4}
        colors={["#00C9A7", "#FFDD44", "#FF3D00"]}
        colorsTime={[duration * 0.8, duration * 0.4, 0]}
        onComplete={() => {
          setIsPlaying(false);
          onTimeout?.();
        }}
      >
        {({ remainingTime }) => 
          renderTime ? renderTime(remainingTime) : <div className="text-lg font-bold">{remainingTime}</div>
        }
      </CountdownCircleTimer>
    </div>
  );
};

export default CircleCountDown;
