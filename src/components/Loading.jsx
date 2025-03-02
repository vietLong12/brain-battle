import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const FullScreenLoading = () => {
  const { isLoading } = useSelector((state) => state.app);
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden"; // Chặn scroll
    } else {
      document.body.style.overflow = ""; // Cho phép scroll lại khi loading tắt
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 pointer-events-auto">
      <span className="loading loading-spinner loading-lg text-white"></span>
    </div>
  );
};

export default FullScreenLoading;
