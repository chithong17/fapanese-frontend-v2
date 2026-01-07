import React, { useState } from "react";
import ScrollReveal from "../ScrollReveal";

interface FlashcardsProps {
  cards: { title: string; description: string }[];
  className?: string;
}

const Flashcards: React.FC<FlashcardsProps> = ({ cards, className }) => {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const nextCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % cards.length);
    }, 300); // Đợi lật về xong mới đổi nội dung
  };

  const prevCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + cards.length) % cards.length);
    }, 300);
  };

  const card = cards[current];

  return (
    <ScrollReveal>
      <div className={`flex flex-col items-center space-y-8 ${className}`}>
        
        {/* --- CARD CONTAINER --- */}
        {/* Thêm [perspective:1000px] để tạo không gian 3D */}
        <div
          className="relative w-96 h-64 cursor-pointer [perspective:1000px]"
          onClick={() => setFlipped(!flipped)}
        >
          {/* --- INNER FLIPPER --- */}
          {/* Thêm [transform-style:preserve-3d] và logic xoay */}
          <div
            className={`relative w-full h-full duration-700 transition-all [transform-style:preserve-3d] ${
              flipped ? "[transform:rotateY(180deg)]" : ""
            }`}
          >
            {/* --- FRONT SIDE --- */}
            {/* Giữ nguyên style của bạn, chỉ thêm [backface-visibility:hidden] */}
            <div className="absolute w-full h-full bg-gradient-to-br from-gray-400 to-white rounded-3xl shadow-lg flex flex-col justify-center items-center p-6 [backface-visibility:hidden]">
              <h3 className="text-2xl font-bold text-gray-900">{card.title}</h3>
              <p className="mt-2 text-gray-700 text-center text-sm">
                Click để xem chi tiết
              </p>
              
              {/* Badge */}
              <div className="absolute bottom-4 right-4 bg-gray-200/70 px-3 py-1 rounded-lg text-gray-800 font-semibold text-sm">
                Mặt trước
              </div>
            </div>

            {/* --- BACK SIDE --- */}
            {/* Giữ nguyên style, thêm [transform:rotateY(180deg)] và [backface-visibility:hidden] */}
            <div className="absolute w-full h-full bg-gradient-to-br from-gray-200 to-white rounded-3xl shadow-lg flex flex-col justify-center items-center p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{card.title}</h3>
              <p className="mt-2 text-gray-800 text-center">{card.description}</p>
              
              {/* Badge */}
              <div className="absolute bottom-4 right-4 bg-gray-200/70 px-3 py-1 rounded-lg text-gray-800 font-semibold text-sm">
                Mặt sau
              </div>
            </div>
          </div>
        </div>

        {/* --- NAVIGATION BUTTONS --- */}
        <div className="flex space-x-4">
          <button
            onClick={prevCard}
            className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition shadow-sm"
          >
            Prev
          </button>
          <button
            onClick={nextCard}
            className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition shadow-sm"
          >
            Next
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default Flashcards;