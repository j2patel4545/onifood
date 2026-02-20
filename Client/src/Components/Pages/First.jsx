import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const First = () => {
  const images = [
    "https://source.unsplash.com/random/800x400?sig=1",
    "https://source.unsplash.com/random/800x400?sig=2",
    "https://source.unsplash.com/random/800x400?sig=3",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="rounded-lg bg-amber-700 shadow-lg"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default First;
