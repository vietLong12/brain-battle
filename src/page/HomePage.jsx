import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCameraRetro } from "react-icons/fa";
import UserServices from "../services/userServices";
import handelError from "../utils/handelError";

const WelcomeScreen = ({ onStart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfor);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file)); // Tạo URL preview ảnh
    }
  };

  const handleStart = async () => {
    if (name.trim() === "") {
      toast.error("Ơ kìa! Bạn định chơi ẩn danh à? Nhập tên vào nào! 🤔");
      return;
    } else if (!avatar) {
      toast.error(
        "Đừng để mình trở thành bóng ma không mặt, chọn avatar ngay! 👻"
      );
      return;
    }
    setLoading(true);

    try {
      const data = {
        name: name,
        avatar: avatar,
      };
      const res = await UserServices.registerAccount(data);
      dispatch(
        setUser({
          name: res.data.name,
          avatar: res.data.avatar,
          id: res.data._id,
        })
      );
      navigate("/join");
    } catch (error) {
      toast.error(handelError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("user: ", user);
    if (user.name) {
      navigate("/join");
    }
  }, [user.name]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <div className="bg-[#663399] text-orange p-8 mx-4 rounded-2xl shadow-lg text-center  text-white">
        <p className="font-bold text-2xl text-pink-500 text-center leading-relaxed hidden">
          Chúc mừng 8/3! <br />
          Chúc bạn luôn xinh đẹp, hạnh phúc và tràn đầy năng lượng
        </p>
        <h1 className="text-2xl font-bold mb-4">
          🎉🎉🎉
          <br /> Chào mừng bạn đến với <br />
          <img
            src="./src/assets/logo-brain-battle.png"
            alt=""
            className="w-11/12 mx-auto my-2 drop-shadow-2xl"
          />
        </h1>
        <p className="mb-4 text-lg">Nhập tên & chọn ảnh đại diện để bắt đầu</p>
        {/* Ô nhập tên */}
        <input
          type="text"
          className="input input-bordered w-full mb-4 input-primary text-black focus:outline-none focus:ring-0"
          placeholder="Nhập tên của bạn..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* Hiển thị ảnh đã chọn */}
        <h3 className="font-medium mt-2 mb-4">Ảnh đại diện của bạn:</h3>
        {preview !== "" ? (
          <>
            <label className="cursor-pointer flex justify-center mx-auto items-center !w-36 !h-36 rounded-full mb-4 bg-primary">
              <div>
                <img
                  src={preview}
                  alt="Avatar Preview"
                  className="!w-36 !h-36 rounded-full mx-auto border object-cover !bg-[#6e3e9e]"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full mb-4 hidden"
                onChange={handleImageChange}
              />
            </label>
          </>
        ) : (
          <label className="cursor-pointer flex justify-center mx-auto items-center !w-36 !h-36 rounded-full gap-2 px-4 py-2 btn btn-info mb-4 border-dashed !bg-[#8854c0] hover:opacity-80 shadow-fuchsia-700 shadow-xl">
            <div>
              <FaCameraRetro className="text-white text-4xl" />
            </div>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full mb-4 hidden"
              onChange={handleImageChange}
            />
          </label>
        )}
        {/* Nút bắt đầu */}
        <button
          disabled={loading}
          className="btn btn-primary min-w-72 mt-5 uppercase font-bold text-2xl text-white"
          onClick={handleStart}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            " 🚀 Bắt đầu ngay 🚀"
          )}
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
