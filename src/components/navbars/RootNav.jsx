// import { useState } from "react";
// import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
// import { Link, useNavigate } from "react-router-dom";
// import useAuthStore from "../../store/useAuthStore";

// function RootNav() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const { token } = useAuthStore();

//   return (
//     <div>
//       <nav className="sticky bg-[#D2B0FD] h-18 w-full shadow-lg px-10">
//         <div className="flex justify-between items-center p-3">
//           <Link to="/">
//             <div className="font-bold ml-8 text-[30px]">AnvikshAI</div>
//           </Link>
//           <div className="text-[20px] space-x-20 hidden md:flex">
//             <Link
//               to="/"
//               className="p-2 mx-2 transition-transform duration-300 ease-in-out hover:scale-110 inline-block"
//             >
//               Home
//             </Link>
//             <Link
//               to="/about"
//               className="p-2 mx-2 transition-transform duration-300 ease-in-out hover:scale-110 inline-block"
//             >
//               About us
//             </Link>
//             <Link
//               to="/contact-us"
//               className="p-2 mx-2 transition-transform duration-300 ease-in-out hover:scale-110 inline-block"
//             >
//               Contact us
//             </Link>
//           </div>
//           {token == null ? (
//             <div className="space-x-10 mr-7 hidden md:flex">
//               <button
//                 className="cursor-pointer rounded-md hover:active border-2 border-black p-2.5 px-6 active:bg-black active:text-white active:border-black"
//                 onClick={() => navigate("/login")}
//               >
//                 Login
//               </button>
//               <button
//                 className="cursor-pointer mr-10 bg-black text-white p-3 rounded-md px-5 hover:active active:bg-[#3b3939]"
//                 onClick={() => navigate("/signup")}
//               >
//                 Signup
//               </button>
//             </div>
//           ) : (
//             <Link
//               to="/dashboard"
//               className="p-2 mx-2 transition-transform duration-300 ease-in-out hover:scale-110 inline-block"
//             >
//               Dashboard
//             </Link>
//           )}

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button onClick={() => setMenuOpen(!menuOpen)}>
//               {menuOpen ? (
//                 <HiOutlineX className="text-3xl" />
//               ) : (
//                 <HiOutlineMenu className="text-3xl" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className="md:hidden flex flex-col items-center bg-[#D2B0FD] py-5">
//             <Link
//               to="/"
//               className="p-2 transition-transform duration-300 ease-in-out hover:scale-110"
//               onClick={() => setMenuOpen(false)}
//             >
//               Home
//             </Link>
//             <Link
//               to="/about"
//               className="p-2 transition-transform duration-300 ease-in-out hover:scale-110"
//               onClick={() => setMenuOpen(false)}
//             >
//               About us
//             </Link>
//             <Link
//               to="/contact"
//               className="p-2 transition-transform duration-300 ease-in-out hover:scale-110"
//               onClick={() => setMenuOpen(false)}
//             >
//               Contact us
//             </Link>
//             <button
//               className="cursor-pointer rounded-md border-2 border-black p-2.5 px-6 active:bg-black active:text-white active:border-black my-2"
//               onClick={() => {
//                 navigate("/login");
//                 setMenuOpen(false);
//               }}
//             >
//               Login
//             </button>
//             <button
//               className="cursor-pointer bg-black text-white p-3 rounded-md px-5 active:bg-[#3b3939]"
//               onClick={() => {
//                 navigate("/signup");
//                 setMenuOpen(false);
//               }}
//             >
//               Signup
//             </button>
//           </div>
//         )}
//       </nav>
//     </div>
//   );
// }

// export default RootNav;

import React, { useState, useEffect } from "react";
import { BrainCog, Menu, X } from "lucide-react";
import { Link } from "react-router";

const RootNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BrainCog className="h-8 w-8 text-purple-700" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-500 text-transparent bg-clip-text">
            AnvikshAI
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="font-medium hover:text-purple-700 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="font-medium hover:text-purple-700 transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact-us"
            className="font-medium hover:text-purple-700 transition-colors"
          >
            Contact Us
          </Link>
          <Link
            to="/login"
            className="font-medium hover:text-purple-700 transition-colors"
          >
            Sign In
          </Link>
          <Link to="/signup">
            <button className="btn-primary">Sign Up</button>
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-800" />
            ) : (
              <Menu className="h-6 w-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full py-4 px-6 flex flex-col space-y-4">
          <a
            href="#"
            className="font-medium hover:text-purple-700 transition-colors"
          >
            Home
          </a>
          <a
            href="#how-it-works"
            className="font-medium hover:text-purple-700 transition-colors"
          >
            How It Works
          </a>
          <a
            href="#why-choose-us"
            className="font-medium hover:text-purple-700 transition-colors"
          >
            Why Choose Us
          </a>
          <a
            href="#pricing"
            className="font-medium hover:text-purple-700 transition-colors"
          >
            Pricing
          </a>
          <button className="btn-primary">Sign In</button>
        </div>
      )}
    </nav>
  );
};

export default RootNav;
