import { useState, forwardRef, useImperativeHandle } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import useSound from "use-sound";
import soundCountDown from "../assets/sound/countdown-sound.mp3";

const CircleCountDown = ({ duration = 5, onTimeout, classNameCustom }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);
  const [play] = useSound(soundCountDown, { volume: 1 });
  const start = () => {
    setKey((prev) => prev + 1);
    setIsPlaying(true);
    play();
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
        {({ remainingTime }) => (
          <div className="text-lg font-bold" onClick={() => start()}>
            {remainingTime}
          </div>
        )}
      </CountdownCircleTimer>
    </div>
  );
};

export default CircleCountDown;
