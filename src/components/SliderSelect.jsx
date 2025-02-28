import { useState } from "react";
import Slider from "react-slick";
import { FaPlus } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from "react-hot-toast";

export default function SliderSelect({ isHost }) {
  const topics = [
    {
      value: "music",
      label: "Âm nhạc",
      bg: "",
    },
    {
      value: "movies",
      label: "Phim ảnh",
      bg: "",
    },
    {
      value: "sports",
      label: "Thể thao",
      bg: "",
    },
    {
      value: "science",
      label: "Truyện tranh & Anime",
      bg: "",
    },
    {
      value: "travel",
      label: "Du lịch",
      bg: "",
    },
    {
      value: "food",
      label: "Ẩm thực",
      bg: "",
    },
  ];

  const [selectedTopics, setSelectedTopics] = useState([]);

  const addTopic = (topic) => {
    if (!selectedTopics.some((t) => t.value === topic.value)) {
      setSelectedTopics([...selectedTopics, topic]);
    } else {
      toast("Đã có chủ đề này rồi!", {
        icon: "🍅",
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    }
  };

  const removeTopic = (topic) => {
    setSelectedTopics(selectedTopics.filter((t) => t.value !== topic.value));
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 100, // Giảm tốc độ trượt
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    arrows: false,
    swipeToSlide: true, // Vuốt mượt hơn
    adaptiveHeight: true, // Chiều cao linh hoạt
  };

  return (
    <div className="p-6 text-center min-h-[250px] min-w-96">
      {isHost && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-2xl">
            Chọn chủ đề:
          </h2>

          <Slider {...settings} className="mb-6 w-96">
            {topics.map((topic) => (
              <div key={topic.value} className="px-2">
                <div
                  className="relative p-4 rounded-lg shadow-md text-center h-[140px] flex justify-center flex-col items-center bg-cover bg-center overflow-hidden"
                  style={{ backgroundImage: `url(${topic.bg})` }}
                  onClick={() => addTopic(topic)}
                >
                  {/* Lớp phủ làm tối nền */}
                  <div className="absolute inset-0 bg-black/50"></div>

                  {/* Nội dung */}
                  <p className="relative text-2xl text-white">{topic.label}</p>
                </div>
              </div>
            ))}
          </Slider>
        </>
      )}

      <div className="mt-4">
        <h3 className="font-semibold text-white text-2xl">📌 Đã chọn:</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedTopics.map((topic) => (
            <span
              key={topic.value}
              className="bg-primary text-white px-3 py-3 rounded-lg w-40 flex items-center"
            >
              {topic.label}
              <button
                className="btn btn-info text-white btn-sm ml-auto"
                onClick={() => removeTopic(topic)}
              >
                X
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
