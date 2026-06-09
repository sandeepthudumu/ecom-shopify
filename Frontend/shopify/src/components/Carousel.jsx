import { useState, useEffect } from "react";
import img1 from "../public/img1.jpg"
import img2 from "../public/img2.jpg"
import img3 from "../public/img3.jpg"
import img4 from "../public/img4.jpg"

function Carousel() {
  const images = [
    img1,
    img2,
    img3,
    img4
    
  ];

  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  // Next Button
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  // Previous Button
  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative w-full max-w-1xl mx-auto overflow-hidden rounded-lg shadow-lg">

      {/* Image */}
      <img
        src={images[current]}
        alt={`slide-${current}`}
        className="w-full h-[500px] object-cover"
      />

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index
                ? "bg-white"
                : "bg-gray-400"
            }`}
          />
        ))}
      </div>

    </div>
  );
}

export default Carousel;