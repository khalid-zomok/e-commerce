"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

export default function Slider({
  spaceBetween = 0,
  slidesPerView = 1, // Default to 1 to show a full banner
  listOfImages,
}: {
  spaceBetween?: number;
  slidesPerView?: number;
  listOfImages: string[];
}) {
  return (
    <div className="relative">
      <Swiper
        className="h-100 w-full"
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        navigation={true}
        loop={listOfImages.length > 0}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {listOfImages.map((src, index) => (
          <SwiperSlide key={index}>
            {/* Background Image */}
            <Image
            height={200}
            width={200}
              src={src}
              alt={`Banner ${index}`}
              className="w-full h-100 object-cover"
            />

            {/* Content Overlay - Matching image_f18737.jpg */}

            {index == 0 &&  <div className="absolute inset-0 bg-linear-to-r from-[#06c606e6] via-[#08e50866] to-[#08e50866] flex flex-col justify-center px-12 md:px-24 text-white gap-2">

              <h1 className="font-bold text-[30px] max-w-lg leading-tight">
                Fresh Products Delivered <br /> to your Door
              </h1>
              <p className="font-bold text-xl opacity-90">
                Get 20% off your first order
              </p>
              <div className="flex gap-1">
                <button className="bg-white text-[#0AAD0A] px-8 py-1 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                  Shop Now
                </button>
                <button className="border-2 border-white text-white px-8 py-1 rounded-lg font-bold hover:bg-white/10 transition-colors">
                  View Deals
                </button>
              </div>
            </div> }


            {index == 1 &&  <div className="absolute inset-0 bg-linear-to-r from-[#06c606e6] via-[#08e50866] to-[#08e50866] flex flex-col justify-center px-12 md:px-24 text-white gap-2">

              <h1 className="font-bold text-[30px] max-w-lg leading-tight">
                Premium Quality  <br /> Guaranteed
              </h1>
              <p className="font-bold text-xl opacity-90">
               Fresh from farm to your table
              </p>
              <div className="flex gap-1">
                <button className="bg-white text-blue-600 px-8 py-1 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                  Shop Now
                </button>
                <button className="border-2 border-white text-white px-8 py-1 rounded-lg font-bold hover:bg-white/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div> }


            {index == 2 &&  <div className="absolute inset-0 bg-linear-to-r from-[#06c606e6] via-[#08e50866] to-[#08e50866] flex flex-col justify-center px-12 md:px-24 text-white gap-2">

              <h1 className="font-bold text-[30px] max-w-lg leading-tight">
                Fast & Free Delivery
              </h1>
              <p className="font-bold text-xl opacity-90">
                Same day delivery available
              </p>
              <div className="flex gap-1">
                <button className="bg-white text-purple-500 px-8 py-1 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                  Order Now
                </button>
                <button className="border-2 border-white text-white px-8 py-1 rounded-lg font-bold hover:bg-white/10 transition-colors">
                 Delivery Info
                </button>
              </div>
            </div> }
           
          </SwiperSlide>
        ))}
      </Swiper>

      
    </div>
  );
}
