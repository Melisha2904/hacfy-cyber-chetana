'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import Image from 'next/image';
import { assets } from '@/public/assets/assets';

const links = [
  { image: '/assets/ncpcr.png', url: 'https://ncpcr.gov.in/' },
  { image: '/assets/nielit.png', url: 'https://nielitcyberforensics.in/' },
  { image: '/assets/isea.png', url: 'https://isea.gov.in/' },
  { image: '/assets/cybercrime.png', url: 'https://elibrary.svpnpa.gov.in/user#/home' },
  { image: '/assets/crtn.jpg', url: 'https://www.cert-in.org.in/' },
];

const SwiperComponent = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center  py-10">
      {/* Title Section */}
      <div
        className="text-3xl md:text-5xl font-extrabold mb-10 text-center"
        style={{ color: "var(--primary-blue)" }}
      >
        <Image src={assets.weblink} alt="link" className="w-10 inline mr-3 h-10" quality={100} />
        Useful Links
      </div>

      {/* Swiper Section */}
      <div className="w-full max-w-screen-lg flex items-center justify-center">
        <Swiper
          spaceBetween={20}
          freeMode={true}
          loop={true}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={6000}
          breakpoints={{
            320: { slidesPerView: 2 }, // 2 slides on mobile
            768: { slidesPerView: 3 }, // 3 slides on tablets
            1024: { slidesPerView: 4 }, // 4 slides on desktops
          }}
          modules={[Pagination, FreeMode, Autoplay]}
          className="h-full"
        >
          {links.map((item, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center m-10">
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <div className="flex flex-col items-center justify-center min-h-[150px] h-full text-lg p-4 rounded-full shadow-lg bg-white w-40">
                  <Image src={item.image} alt="" width={100} height={100} quality={100} className="h-24 w-24 object-contain" />
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperComponent;
