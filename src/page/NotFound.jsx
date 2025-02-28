import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-purple-600">404</h1>
      <p className="text-xl text-gray-700 mt-4">
        Ôi không! Trang bạn tìm kiếm không tồn tại! 🥲
      </p>
      <img
        src="https://media.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif"
        alt="Lost"
        className="w-64 my-6 rounded-lg shadow-lg"
      />
      <Link
        to="/"
        className="px-6 py-2 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 transition"
      >
        🏠 Quay về trang chủ
      </Link>
    </div>
  );
}
