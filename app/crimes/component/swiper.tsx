"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image"; // Import Next.js Image component
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import { assets } from "@/public/assets/assets"; // Make sure assets file uses direct public paths

const slides = [
  {
    id: 1,
    image: assets.Blogid2,
    title: "Investment Frauds",
    text: "Scammers promise huge profits on fake investments, tricking people into losing their money.",
  },
  {
    id: 2,
    image: assets.Blogid1,
    title: "Digital Arrest Scams",
    text: "Fraudsters pose as police or officials, threatening arrest unless victims pay money",
  },
  {
    id: 3,
    image: assets.Blogid7,
    title: "FedEx Scams",
    text: "Fake courier messages claim parcel issues to steal personal information or payments.",
  },
  {
    id: 4,
    image: assets.Blogid3,
    title: "Phishing Attacks",
    text: "Fake emails or websites trick users into sharing sensitive details like passwords or bank info.",
  },
  {
    id: 5,
    image: assets.Blogid4,
    title: "Ransomware Attacks",
    text: "Hackers lock personal or business data and demand money to unlock it.",
  },
  {
    id: 6,
    image: assets.Blogid9,
    title: "Online Job Frauds",
    text: "Fake job offers steal personal information or ask for money in return for jobs.",
  },
  {
    id: 7,
    image: assets.Blogid8,
    title: "Loan App Scams",
    text: "Fraud apps offer quick loans but misuse data and charge hidden fees.",
  },
  {
    id: 8,
    image: assets.Blogid6,
    title: "Cryptocurrency Frauds",
    text: "Fake crypto schemes lure people into investing and disappear with their money.",
  },
  {
    id: 9,
    image: assets.Blogid10,
    title: "Sextortion Schemes:",
    text: " Criminals blackmail victims after tricking them into sharing private photos or videos.",
  }

];

const ImageSwiper = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col md:flex-row-reverse items-center justify-center w-full px-6 md:px-16 gap-10 h-screen">
     
      <div className="w-full md:w-1/2 flex justify-center">
        <Swiper
          effect="cube"
          grabCursor={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[EffectCube, Pagination, Autoplay]}
          loop={true}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
            
          }}
          className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-2xl bg-transparent shadow-none justify-center items-center"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} 
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Image
                src={slide.image}
                alt={slide.title}
              
                
                className=" h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold transition duration-500"     style={{ color: "var(--primary-orange)" }}>
          {slides[activeIndex]?.title}
        </h1>
        <p className="text-lg md:text-xl mt-4 leading-relaxed font-bold transition duration-500"     style={{ color: "var(--primary-blue)" }}>
          {slides[activeIndex]?.text}
        </p>
      </div>
    </div>
  );
};

export default ImageSwiper;
