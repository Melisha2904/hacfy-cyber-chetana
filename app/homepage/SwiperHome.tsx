'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import Image from 'next/image';

const links = [
  // {image :'/assets/sbi5.png',text :'Scam 0'},
  { image: '/assets/sbiimage.png', text: 'Scam 1' },
  { image: '/assets/sbiimage1.png', text: 'Scam 2' },
  { image: '/assets/sbiimage2.png', text: 'Scam 3' },
  { image: '/assets/sbiimage3.png', text: 'Scam 4' },
  {image : '/assets/tickets.png' , text :'Scam 6'},
  {image : '/assets/gibli.png' , text :'Scam 7'},
  {image : '/assets/delivary.png', text : 'Scam 8'}
 
];

const SwiperHome = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-6 md:mt-10 lg:mt-14 mb-30">
      <div className="text-2xl md:text-5xl  font-extrabold mb-30 text-center" style={{ color: "var(--primary-blue)" }}>
        Recent Scams Happened in Karnataka
      </div>

      <div className="w-full max-h-screen flex items-center justify-center">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          freeMode={true}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          speed={1000}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          modules={[Pagination, FreeMode, Autoplay]}
          className="h-full"
        >
          {links.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-center h-full w-full">
              <Image
  src={item.image}
  alt={item.text}
  width={300}
  height={100}
  quality={100}
  className="h-auto rounded-lg shadow-2xl border-blue-100 border-2"
/>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperHome;
