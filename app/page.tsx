import { HeroCard } from "./homepage/_components/HeroSectioncards";
import PledgeForm from "./homepage/_components/pledgeForm";
import { HeroSection } from "./homepage/header";
import { MarqueeDemo } from "./homepage/Merquee";
import SwiperHome from "./homepage/SwiperHome";
import SwiperComponent from "./homepage/SwiperImage";

export default function Home() {
  return (
    <div className="w-full mx-auto">
      <HeroSection />

      <div className="w-full flex flex-col h-auto">
        <div>
          <MarqueeDemo />
        </div>
        <div>
          <SwiperHome />
        </div>
      </div>

      <div className="h-auto w-full pt-20 lg:pt-20 sm:mt-0">
        <HeroCard />
      </div>

      {/* Pledge Form Section */}
      <div className="container mx-auto w-full justify-center items-center">
        <PledgeForm />
      </div>

      {/* Swiper Component */}
      <div className="w-full h-auto md:h-1/2 mt-20 md:mt-0 sm:mt-0 mb-20 flex justify-center items-center">
        <SwiperComponent />
      </div>
    </div>
  );
}
