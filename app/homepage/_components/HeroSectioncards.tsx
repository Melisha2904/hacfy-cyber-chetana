import * as React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { assets } from "@/public/assets/assets";
import Link from "next/link";

export function HeroCard() {
  return (
    <div className="w-full py-24 md:py-36 px-4 md:px-12 bg-white text-black">
      <div className="w-full flex flex-col items-center py-12 rounded-3xl text-black px-6 md:px-12">
        <div className="w-full text-center mb-16">
          <h1 className="text-3xl md:text-6xl font-extrabold leading-tight tracking-tight" style={{ color: "var(--primary-blue)" }}>
            Why We Created <span className="text-orange-500">HacFy Cyber Chetana?</span>
          </h1>
        </div>

      
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {[
            { 
              id: "cybercrime-awareness",
              title: "Cybercrime Awareness", 
              text: "Educating communities to identify, prevent, and respond to emerging cyber threats.", 
              image: assets.awarness
            },
            { 
              id: "women-digital-safety",
              title: "Women Digital Safety", 
              text: "Empowering women with knowledge and tools to navigate the digital world securely",  
              image: assets.Safety
            },
            { 
              id: "youth-empowerment",
              title: "Youth Empowerment", 
              text: "Equipping the next generation with cybersecurity skills to build a safer digital future", 
              image: assets.Empowerment 
            },
            { 
              id: "secure-digital-society",
              title: "Secure Digital Society", 
              text: "Creating a digitally resilient ecosystem through awareness, education, and community collaboration.",  
              image: assets.society
            },
          ].map((item, index) => (
            <Link href={`/awareness/${item.id}`} key={index} className="block group">
              <Card className="h-full bg-white text-black shadow-lg transition-all duration-300 group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:border-orange-500/50">
                <CardHeader className="flex flex-col items-center">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    width={180} 
                    height={80} 
                    className="mb-4 group-hover:scale-110 transition-transform"
                  />
                  <CardTitle className="text-xl md:text-2xl font-semibold text-center" style={{ color: "var(--primary-orange)" }}>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm md:text-lg text-center" style={{ color: "var(--primary-blue)" }}>
                  {item.text}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
