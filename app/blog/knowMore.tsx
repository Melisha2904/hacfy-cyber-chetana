"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { assets } from "@/public/assets/assets";
import { motion, useInView } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useRef } from "react";
import Link from "next/link";

const services = [
  {
    id: 1,
    image: assets.blogNews2,
    link: "https://www.moneycontrol.com/technology/karnataka-online-trading-frauds-losses-skyrocket-from-rs-23-crore-in-2022-to-rs-903-crore-by-mid-2024-article-12822623.html",
    name: "Karnataka online trading frauds: Losses skyrocket from Rs 23 crore in 2022 to Rs 903 crore by mid-2024",
    description:
      "Many educated professionals, especially Bengaluru techies, have been duped by fake broking apps promising high returns or IPO allocations. In April, Saurav Kumar from Bengaluru’s Electronics City saw a stock market investment ad on Facebook and joined a suggested WhatsApp group. Members shared investment gains, and admins answered queries to build trust. An admin later shared a trading app link, which Kumar downloaded, assuming it was genuine.",
  },
  {
    id: 2,
    image: assets.investment,
    link: "https://www.thehindu.com/news/cities/Mangalore/investment-fraud-udupi-man-looses-49-lakh/article69049553.ece#:~:text=A%2072%2Dyear%2Dold%20man,invest%20by%20promising%20good%20returns.",
    name: "Investment Fraud , Udupi man loses 49 lakh",
    description:
      "A 72-year-old man, Francis Castalino from Udupi, and his family lost ₹49 lakh in an online investment fraud. His son was added to a WhatsApp group, Stock Market Navigation, where fraudsters promised high returns. Castalino transferred ₹17 lakh, his wife ₹10.5 lakh, and his son ₹21.5 lakh. When they tried to withdraw, the fraudsters demanded more money. Realizing the scam, Castalino filed a complaint with the Udupi Cyber Economic and Narcotic Crime police under Section 318(4) of BNS and Section 66(D) of the IT Act.",
  },
 
  {
    id: 3,
    image: assets. blogNews1,
    link: "https://indianexpress.com/article/cities/bangalore/karnataka-loses-rs-219-crore-to-digital-arrest-fraud-since-2023-9886686/", // Add actual link if available
    name: "Karnataka Loses Rs 219 Crore to Digital Arrest Fraud Since 2023",
    description:
      "Karnataka has lost ₹219.58 crore to ‘digital arrest’ fraud over the past three years, as per data presented by Home Minister G Parameshwara. Fraudsters deceive victims into transferring money under false pretexts. The data was shared in the Karnataka legislative council. This scam has caused significant financial losses since 2023.",
  },
  {
    id: 4,
    image: assets.blogNews,
    link: "https://www.business-standard.com/india-news/karnataka-elderly-couple-loses-50-lakh-to-cyber-scam-dies-by-suicide-125032900386_1.html", // Add actual link if available
    name: "Karnataka elderly couple loses ₹50 lakh to cyber scam, dies by suicide",
    description:
      "An elderly couple in Belagavi, Karnataka, died by suicide after falling victim to a cyber fraud and alleged harassment. Diogjeron Santan Nazareth (82) and his wife Flaviana (79) lost over ₹50 lakh after being tricked by fraudsters posing as officials. The scammers falsely accused Diogjeron of SIM card misuse and pressured him into transferring money. A death note named two accused and detailed financial struggles, including loans and debts. Police have registered a case of abetment to suicide and cyber fraud, launching an investigation to track the culprits.",
  },
];

const ServiceCardItem = ({
  service,
  index,
}: {
  service: { id: number; image: StaticImageData; name: string; description: string; link: string };
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  const slideDirection = index % 2 === 0 ? -100 : 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: slideDirection }}
      animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : slideDirection }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`flex justify-center px-4 md:px-8 w-full ${
        index === 0 ? "mt-10 md:mt-8" : "mt-8"
      }`} // Adjust margin for top card
    >
      <Card className="relative flex flex-col md:flex-row items-center justify-center overflow-hidden w-full max-w-6xl border shadow-lg rounded-2xl p-4 md:p-6">
        <div className="w-full md:w-1/3 flex justify-center">
          <Image
            src={service.image}
            alt={service.name}
            width={900}
            className="rounded-xl object-cover border shadow-md w-full md:w-auto transition-all duration-500"
          />
        </div>

        <CardContent className="w-full md:w-2/3 text-center md:text-left">
          <CardHeader>
            <CardTitle className="text-xl md:text-xl font-bold justify-center items-center flex p-2 md:p-4 text-center"   style={{ color: "var(--primary-orange)" }}>
              {service.name}
            </CardTitle>
          </CardHeader>
          <CardDescription className="text-sm md:text-base px-2 md:px-0"   style={{ color: "var(--primary-blue)" }}>
            {service.description}
          </CardDescription>

          <div className="mt-6 flex justify-end">
            <Link href={service.link} target="_blank" className="font-semibold text-orange-600">
              Know More...
            </Link>
          </div>
        </CardContent>

        <BorderBeam duration={8} size={100} />
      </Card>
    </motion.div>
  );
};

export function KnowMore() {
  return (
    <div className="w-full pt-30 md:pt-35 px-4 pb-16 md:px-12">
      {/* Heading */}
      <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-8" style={{ color: "var(--primary-orange)" }}>
        BLOGS
      </h2>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <ServiceCardItem key={service.id} service={service} index={index} />
        ))}
      </div>
    </div>
  );
}
