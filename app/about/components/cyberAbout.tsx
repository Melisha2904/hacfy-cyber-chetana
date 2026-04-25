import Image from "next/image";
// import { assets } from "@/public/assets/assets";

export default function BackgroundImage() {
  return (
    <div className="w-full relative">
      {/* Background Image with Centered Text */}
      <div className="relative w-full h-[60vh]">
        <Image 
          src="/assets/cyber.jpg" 
          alt="Background" 
          layout="fill"
          objectFit="cover"
          priority
          className="top-0 left-0"
        />
        {/* Centered Text */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <h1 
            className="font-extrabold text-white tracking-wide text-center"
            style={{ fontSize: "clamp(2rem, 8vw, 5rem)" }}
          >
            <span>WHAT IS HACFY CYBER CHETANA</span>?
          </h1>
        </div>
      </div>

      {/* Text Section */}
      <div className="text-[#09437d] p-6 text-center mt-10 sm:mt-16 md:mt-20 bg-white shadow-lg rounded-lg max-w-[90%] mx-auto">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed">
          HacFy Cyber Chetana is a pioneering initiative committed to enhancing cybersecurity awareness and digital literacy across Karnataka. The platform empowers individuals by equipping them with knowledge, tools, and proactive measures to safeguard against emerging cyber threats. With a core focus on women’s digital safety, youth empowerment, and community resilience, it aims to create a secure digital ecosystem for all. HacFy Cyber Chetana envisions building a digitally aware society where every individual can navigate the online world with confidence, responsibility, and security.
        </p>
      </div>
    </div>
  );
}
