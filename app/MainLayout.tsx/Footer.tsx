import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

import { assets } from "@/public/assets/assets";
import Image from "next/image";
import Link from "next/link";
import '../styles/colors.css';

export default function Footer() {
  return (
    <div className="bg-white">
      <footer className="px-4 py-10 sm:px-8 text-white pb-10 rounded-3xl w-[95%] mx-auto border-t shadow-2xl">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center gap-2">
                <Image src={assets.logo} alt="Logo" width={80} />
              </div>
              <p className="mt-3 text-gray-300 text-sm" style={{ color: "var(--primary-blue)" }}>
                HacFy Cyber Chetana empowers Karnataka with cybersecurity awareness, focusing on women’s digital safety, youth empowerment, and community resilience. Building a secure and informed digital society.
              </p>
            </div>
            <div className="mx-0 lg:mx-10">
  <h3 className="font-semibold text-[var(--primary-blue)]">Company</h3>
  <ul className="mt-3 space-y-2 text-[var(--primary-blue)]">
    <li className="hover:text-primary-hover cursor-pointer"><Link href="/">Home</Link></li>
    <li className="hover:text-primary-hover cursor-pointer"><Link href="/about">About Us</Link></li>
    <li className="hover:text-primary-hover cursor-pointer"><Link href="/blog">Blog</Link></li>
    <li className="hover:text-primary-hover cursor-pointer"><Link href="/crimes">Crimes</Link></li>
    <li className="hover:text-primary-hover cursor-pointer"><Link href="/#pledge">Pledge</Link></li>
  </ul>
</div>

            <div>
              <h3 className="font-semibold" style={{ color: "var(--primary-blue)" }}>Contact</h3>
              <ul className="mt-3 space-y-2" style={{ color: "var(--primary-blue)" }}>
                <li className="hover:text-primary-hover cursor-pointer">
                  <Link href="mailto:Hacfy@gmail.com" className="hover:text-[#ff8533]">
               info@hacfy.com
                  </Link>
                </li>
                <li className="hover:text-primary-hover cursor-pointer">
                  <Link href="tel:+918660767853" className="hover:text-[#ff8533]">
                 
 +91 8660767853
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold" style={{ color: "var(--primary-blue)" }}>Follow Us</h3>
              <div className="mt-3 flex gap-4">
              <Link href="https://www.instagram.com/hacfycyberchetana?igsh=Yno2bjN1OGV1bDVt" target="_blank">
                <FontAwesomeIcon icon={faInstagram} size="sm" className="text-blue-950 hover:text-red-700 h-5 " />

                </Link>
                <Link href="https://www.youtube.com/@HacFy" target="_blank">
                <FontAwesomeIcon icon={faYoutube} size="sm" className="text-blue-950 hover:text-red-700 h-5 " />

                </Link>
              
                <Link href="https://www.linkedin.com/company/hacfy/" target="_blank">
                <FontAwesomeIcon icon={faLinkedinIn} size="sm" className="text-blue-950 hover:text-red-700 h-5 " />

                </Link>
                
                
              </div>
            </div>
            
            
<div>
           
             
                    
            <div className="  mt-2 md:mt-0 hover:text-[#ff8533]">
              <div>
              <Link href="/terms" className="hover:text-[#ff8533]"  style={{ color: "var(--primary-blue)" }}>User Terms & Conditions</Link>
              </div>
              <Link href="/terms" className="hover:text-[#ff8533]" style={{ color: "var(--primary-blue)" }}>Privacy Policy</Link>
            </div>
            </div>


          </div>

         
          <div className="border-t mt-8 pt-6  md:flex-row justify-between text-sm text-center items-center" style={{ color: "var(--primary-blue)" }}>
            <p>Copyright © 2025 Hacfy Cyber Chetana. All Rights Reserved.</p>
            
          </div>
        </div>
      </footer>
    </div>
  );
}
