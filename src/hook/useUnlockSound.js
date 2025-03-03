import { useEffect } from "react";
import useSound from "use-sound";
import soundCountDown from "../assets/sound/countdown-sound.mp3";

const useUnlockAudio = () => {
  const [play, { stop }] = useSound(soundCountDown, { volume: 0 });

  useEffect(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const unlockAudio = () => {
      if (audioContext.state === "suspended") {
        audioContext.resume().then(() => {
          console.log("🔓 Âm thanh đã được mở khóa!");
        });
      }
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
      document.removeEventListener("touchstart", unlockAudio);
    };

    document.addEventListener("click", unlockAudio, { once: true });
    document.addEventListener("keydown", unlockAudio, { once: true });
    document.addEventListener("touchstart", unlockAudio, { once: true });

    return () => {
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
      document.removeEventListener("touchstart", unlockAudio);
    };
  }, []);

  // Lắng nghe thay đổi URL để dừng âm thanh
  useEffect(() => {
    const handleRouteChange = () => {
      stop(); // Dừng âm thanh khi URL thay đổi
    };

    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("pushstate", handleRouteChange);
    window.addEventListener("replacestate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("pushstate", handleRouteChange);
      window.removeEventListener("replacestate", handleRouteChange);
    };
  }, []);

  return play;
};

export default useUnlockAudio;
