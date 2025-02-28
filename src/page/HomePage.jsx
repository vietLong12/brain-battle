import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const WelcomeScreen = ({ onStart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file)); // Tạo URL preview ảnh
    }
  };

  const handleStart = () => {
    if (name.trim() === "") {
      toast.error("Ơ kìa! Bạn định chơi ẩn danh à? Nhập tên vào nào! 🤔");
      return;
    } else if (!avatar) {
      toast.error(
        "Đừng để mình trở thành bóng ma không mặt, chọn avatar ngay! 👻"
      );
      return;
    }

    dispatch(setUser({ name, avatar: preview }));
    navigate("/join");
  };

  useEffect(() => {
    console.log("user: ", user);
    if (user.name) {
      navigate("/join");
    }
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <div className="bg-[#f8fafc] p-8 mx-4 rounded-2xl shadow-lg text-center  text-[#1e293b]">
        <p className="font-bold text-2xl text-pink-500 text-center leading-relaxed">
          💐 Chúc mừng 8/3! <br />
          Chúc bạn luôn xinh đẹp, hạnh phúc và tràn đầy năng lượng 💖✨
        </p>

        <h1 className="text-2xl font-bold mb-4">
          🎉🎉🎉
          <br /> Chào mừng bạn đến với <br />
          <span className="text-4xl">Brain Battle!!!</span>
        </h1>

        <p className="mb-4">Nhập tên & chọn ảnh đại diện để bắt đầu</p>

        {/* Ô nhập tên */}
        <input
          type="text"
          className="input input-bordered w-full mb-4 input-primary"
          placeholder="Nhập tên của bạn..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Upload ảnh đại diện */}
        <label className="cursor-pointer flex justify-start items-center gap-2 px-4 py-2 btn rounded-full btn-info mb-4">
          👀 Nhấn để chọn ảnh đại diện, đừng để trống nha!
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full mb-4 hidden"
            onChange={handleImageChange}
          />
        </label>
        {/* Hiển thị ảnh đã chọn */}
        {preview !== "" ? (
          <img
            src={preview}
            alt="Avatar Preview"
            className="w-36 h-36 rounded-full mx-auto mb-4 border object-cover"
          />
        ) : (
          ""
        )}

        {/* Nút bắt đầu */}
        <button
          className="btn btn-primary w-fit border mt-5 uppercase font-bold text-2xl"
          onClick={handleStart}
        >
          🚀 Bắt đầu ngay
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
