import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from "react-hot-toast";
import { getAllTopics } from "../api/topicApi";

export default function SliderSelect({
  isHost,
  selectedTopicIds,
  setSelectedTopicIds,
}) {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await getAllTopics();

        setTopics(response);
      } catch (error) {
        console.error("Lỗi khi tải chủ đề:", error);
      }
    };
    fetchTopic();
  }, []);

  const toggleTopic = (topic) => {
    setSelectedTopicIds((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(topic._id)) {
        newSelected.delete(topic._id);
      } else {
        newSelected.add(topic._id);
      }
      return newSelected;
    });
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 2,
    centerMode: false,
    arrows: true,
    swipeToSlide: true,
    adaptiveHeight: true,
  };

  return (
    <div className="p-6 text-center min-h-[250px] min-w-96">
      {isHost && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-2xl">
            Chọn chủ đề:
          </h2>

          {topics ? (
            <Slider {...settings} className="mb-6 w-96">
              {topics.map((topic) => (
                <div key={topic._id} className="px-2">
                  <div
                    className={`relative p-4 rounded-lg shadow-md text-center h-[140px] flex justify-center flex-col items-center bg-cover bg-center overflow-hidden cursor-pointer ${
                      selectedTopicIds.has(topic._id)
                        ? "border-4 border-yellow-400 opacity-100"
                        : "opacity-70"
                    }`}
                    style={{ backgroundImage: `url(${topic.bg})` }}
                    onClick={() => toggleTopic(topic)}
                  >
                    <div className="absolute inset-0 bg-black/50"></div>
                    <p className="relative text-xl text-white">{topic.name}</p>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-white">Không có chủ đề nào để hiển thị.</p>
          )}
        </>
      )}
    </div>
  );
}
