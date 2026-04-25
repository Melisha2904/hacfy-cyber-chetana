"use client"

import { BorderBeam } from "@/components/magicui/border-beam";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { assets } from "@/public/assets/assets";
import { motion, useInView } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useRef } from "react";

const services = [
  {
    id: 1,
    image: assets.Blogid2,
    name: "Investment Frauds",
    description:
      "Investment frauds involve scammers offering fake investment opportunities with promises of high returns. Victims are often lured through social media or cold calls. Once the money is transferred, the fraudsters disappear. Always verify investment platforms through official regulatory bodies like SEBI.",
  },
  {
    id: 2,
    image: assets.Blogid1,
    name: "Digital Arrest Scams",
    description:
      "In this scam, criminals impersonate law enforcement officials, claiming the victim is involved in illegal activities. They demand immediate payments to avoid arrest. Remember, police or government agencies will never ask for payments through calls or messages.",
  },
  {
    id: 3,
    image: assets.Blogid7,
    name: "FedEx Scams",
    description:
      "Victims receive messages claiming their parcel is stuck due to customs issues or verification problems. The message asks for personal information or payment to resolve the issue. Always contact the courier company directly through their official website.",
  },
  {
    id: 4,
    image: assets.Blogid3,
    name: "Phishing Attacks",
    description:
      "Phishing scams trick people into revealing sensitive information like passwords, bank details, or OTPs. These scams often come through fake emails or websites. Always verify the sender's email and avoid clicking suspicious links.",
  },
  {
    id: 5,
    image: assets.Blogid4,
    name: "Ransomware Attacks",
    description:
      "Ransomware attacks encrypt a victim's files, demanding payment to unlock them. These attacks target both individuals and organizations. Keep your software updated, use strong passwords, and back up data regularly to avoid falling victim.",
  },
  {
    id: 6,
    image: assets.Blogid9,
    name: "Online Job Frauds",
    description:
      "Fake job offers are circulated through social media or email, asking for personal details or money in exchange for job placements. Research the company thoroughly and avoid paying any money for job applications.",
  },
  {
    id: 7,
    image: assets.Blogid8,
    name: "Loan App Scams",
    description:
      "Fraudulent lending apps offer quick loans but misuse borrowers' data and charge hidden fees. Always check app reviews and verify their registration with RBI before applying.",
  },
  {
    id: 8,
    image: assets.Blogid6,
    name: " Cryptocurrency Frauds",
    description:
      "Scammers create fake crypto investment platforms, promising huge profits. Once the money is invested, they disappear. Only invest through registered and verified platforms.",
  },
  {
    id: 9,
    image: assets.Blogid10,
    name: "Sextortion Schemes",
    description:
      "Criminals trick victims into sharing intimate content and later blackmail them for money. Never share sensitive content with strangers and report such incidents to cybercrime portals.",
  },
];
const ServiceCardItem = ({ service, index }: { 
  service: { id: number; image: StaticImageData; name: string; description: string }; 
  index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  const slideDirection = index % 2 === 0 ? -100 : 100; 

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: slideDirection }}
      animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : slideDirection }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex justify-center px-4 md:px-8 w-full"
    >
      <Card className="relative flex flex-col md:flex-row items-center overflow-hidden w-full max-w-6xl border shadow-lg rounded-2xl p-4 md:p-6">
        
        <div className="w-full md:w-1/3 flex justify-center">
          <Image
            src={service.image}
            alt={service.name}
            width={600}
            className="rounded-xl object-cover border shadow-md w-full md:w-auto transition-all duration-500 filter md:grayscale hover:grayscale-0"

          />
        </div>

        <CardContent className="w-full md:w-2/3 text-center md:text-left">
          <CardHeader>
            <CardTitle
              className="text-4xl md:text-4xl font-bold justify-center items-center flex p-2 md:p-4"
              style={{ color: "var(--primary-orange)" }}
            >
              {service.name}
            </CardTitle>
          </CardHeader>
          <CardDescription
            className="text-sm md:text-base px-2 md:px-0"
            style={{ color: "var(--primary-blue)" }}
          >
            {service.description}
          </CardDescription>

        
        </CardContent>

        <BorderBeam duration={8} size={100} />
      </Card>
    </motion.div>
  );
};


export function ServiceCard() {
  return (
    <div className="grid grid-cols-1 gap-8 w-full px-4 pb-16 md:px-12 overflow-x-hidden">
      {services.map((service, index) => (
        <ServiceCardItem key={service.id} service={service} index={index} />
      ))}
    </div>
  );
}
