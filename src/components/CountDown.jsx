import { useState, useEffect } from "react";

const Countdown = ({ onComplete }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onComplete && onComplete(); // Gọi callback khi kết thúc
    }
  }, [count, onComplete]);

  return (
    count > 0 && (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <span className="text-white text-6xl font-bold animate-ping">
          {count}
        </span>
      </div>
    )
  );
};

export default Countdown;
