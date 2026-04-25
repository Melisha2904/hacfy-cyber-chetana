// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { assets } from "@/public/assets/assets";
// import "../styles/colors.css"

// export default function Navbar() {
//     const [isScroll, setIsScroll] = useState(false);
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             setIsScroll(window.scrollY > 50);
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     const scrollToPledge = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
//         e.preventDefault();
//         const section = document.getElementById("pledge");
//         if (section) {
//             section.scrollIntoView({ behavior: "smooth" });
//         }
//         setIsMenuOpen(false); // Close menu if mobile menu is open
//     };

//     return (
//         <>
//             <nav className={`w-full pt-10 lg:pt-4 fixed px-5 lg:px-16 xl:px-[10%] py-4 flex items-center justify-between z-50 transition-all duration-300 ${isScroll ? "bg-white backdrop-blur-lg shadow-md" : "bg-white"}`}>
//                 {/* Logo */}
//                 <Link href="/">
//                     <Image 
//                         src={assets.logo} 
//                         alt="Logo" 
//                         className="w-[100%] cursor-pointer h-10"
//                     />
//                 </Link>

//                 {/* Desktop Menu */}
//                 <ul className="hidden lg:flex items-center gap-6 lg:gap-10 rounded-full px-12 py-3 font-medium text-lg text-[var(--primary-blue)] ">

//                     <li><Link href="/" className="hover:text-[#ff8533]">Home</Link></li>
//                     <li><Link href="/about" className="hover:text-[#ff8533]">About Us</Link></li>
//                     <li><Link href="/crimes" className="hover:text-[#ff8533]">Crimes</Link></li>
//                     <li><Link href="/blog" className="hover:text-[#ff8533]">Blogs</Link></li>
//                 </ul>

//                 {/* Right Section */}
//                 <div className="flex items-center gap-4">
                    
//                      <Link href="/#pledge" className="hidden lg:flex items-center gap-3 px-14 py-2 border font-medium text-lg border-gray-500 rounded-2xl ml-4 relative overflow-hidden group transition-colors duration-500" style={{ color: "var(--primary-blue)"}}>
//                     <span className="relative z-10">Pledge</span>
//                     <span className="absolute inset-0 bg-[#ff8533] scale-x-0 origin-left transition-transform duration-1000 ease-out group-hover:scale-x-100 hover:text-white"></span>
//                 </Link>


//                     {/* Hamburger Menu */}
//                     <button onClick={() => setIsMenuOpen(true)}>
//                         <Image 
//                             src={assets.menublack} 
//                             alt="Menu" 
//                             className="w-6 block lg:hidden ml-3" 
//                         />
//                     </button>
//                 </div>

//                 {/* Mobile Menu */}
//                 <ul className={`fixed top-0 right-0 w-64 h-screen bg-white shadow-lg py-20 px-10 transform transition-transform duration-500 ease-in-out z-[1000] ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
//                     <div className="absolute right-6 top-6 cursor-pointer" onClick={() => setIsMenuOpen(false)}>
//                         <span className="text-3xl">×</span> {/* Unicode close icon */}
//                     </div>

//                     {/* Mobile Menu Links */}
//                     <li className="text-lg font-medium  my-4" style={{ color: "var(--primary-blue)" }}><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
//                     <li className="text-lg font-medium  my-4" style={{ color: "var(--primary-blue)" }}><Link href="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
//                     <li className="text-lg font-medium  my-4" style={{ color: "var(--primary-blue)" }}><Link href="/crimes" onClick={() => setIsMenuOpen(false)}>Crimes</Link></li>
//                     <li className="text-lg font-medium  my-4" style={{ color: "var(--primary-blue)" }}><Link href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
//                     <li className="text-lg font-medium  my-4" style={{ color: "var(--primary-blue)" }}><Link href="/#pledge" onClick={scrollToPledge}>Pledge</Link></li>
//                 </ul>  
//             </nav>
//         </>
//     );
// }
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { assets } from "@/public/assets/assets";
import "../styles/colors.css";

export default function Navbar() {
    const [isScroll, setIsScroll] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show navbar if scrolling up, hide if scrolling down
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }

            setIsScroll(currentScrollY > 50);
            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToPledge = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const section = document.getElementById("pledge");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
        setIsMenuOpen(false); // Close menu if mobile menu is open
    };

    return (
        <nav className={`w-full fixed px-5 lg:px-16 xl:px-[10%] py-4 flex items-center justify-between z-50 transition-all duration-300 ${isScroll ? "bg-white backdrop-blur-lg shadow-md" : "bg-white"} ${showNavbar ? "top-0" : "-top-24"}`}>
            {/* Logo */}
            <Link href="/">
                <Image 
                    src={assets.logo} 
                    alt="Logo" 
                    className="w-[100%] cursor-pointer h-10"
                />
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center gap-6 lg:gap-10 rounded-full px-12 py-3 font-medium text-lg text-[var(--primary-blue)] ">
                <li><Link href="/" className="hover:text-[#ff8533]">Home</Link></li>
                <li><Link href="/about" className="hover:text-[#ff8533]">About Us</Link></li>
                <li><Link href="/crimes" className="hover:text-[#ff8533]">Crimes</Link></li>
                <li><Link href="/blog" className="hover:text-[#ff8533]">Blogs</Link></li>
            </ul>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                <Link href="/#pledge" className="hidden lg:flex items-center gap-3 px-14 py-2 border font-medium text-lg border-gray-500 rounded-2xl ml-4 relative overflow-hidden group transition-colors duration-500" style={{ color: "var(--primary-blue)"}}>
                    <span className="relative z-10">Pledge</span>
                    <span className="absolute inset-0 bg-[#ff8533] scale-x-0 origin-left transition-transform duration-1000 ease-out group-hover:scale-x-100 hover:text-white"></span>
                </Link>

                {/* Hamburger Menu */}
                <button onClick={() => setIsMenuOpen(true)}>
                    <Image 
                        src={assets.menublack} 
                        alt="Menu" 
                        className="w-6 block lg:hidden ml-3" 
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <ul className={`fixed top-0 right-0 w-64 h-screen bg-white shadow-lg py-20 px-10 transform transition-transform duration-500 ease-in-out z-[1000] ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="absolute right-6 top-6 cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                    <span className="text-3xl">×</span>
                </div>

                <li className="text-lg font-medium my-4" style={{ color: "var(--primary-blue)" }}><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                <li className="text-lg font-medium my-4" style={{ color: "var(--primary-blue)" }}><Link href="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
                <li className="text-lg font-medium my-4" style={{ color: "var(--primary-blue)" }}><Link href="/crimes" onClick={() => setIsMenuOpen(false)}>Crimes</Link></li>
                <li className="text-lg font-medium my-4" style={{ color: "var(--primary-blue)" }}><Link href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
                <li className="text-lg font-medium my-4" style={{ color: "var(--primary-blue)" }}><Link href="/#pledge" onClick={scrollToPledge}>Pledge</Link></li>
            </ul>
        </nav>
    );
}
