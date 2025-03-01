import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

function RootNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-[#D2B0FD] h-18 w-full shadow-lg z-50">
      <div className="flex justify-between items-center p-3">
        <div className="font-bold ml-8 text-[30px]">AnvikshAI</div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
          </button>
        </div>

        <div className="hidden md:flex space-x-4">
          <button className="cursor-pointer rounded-md border-1 p-2.5 px-6 active:bg-black active:text-white active:border-black">
            Login
          </button>
          <button className="cursor-pointer mr-10 bg-black text-white p-3 rounded-md px-5 active:bg-[#3b3939]">
            Signup
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-[#D2B0FD] p-4 space-y-3">
          <button className="cursor-pointer rounded-md border-1 p-2.5 px-6 active:bg-black active:text-white active:border-black">
            Login
          </button>
          <button className="cursor-pointer bg-black text-white p-3 rounded-md px-5 active:bg-[#3b3939]">
            Signup
          </button>
        </div>
      )}
    </nav>
  );
}

export default RootNav;
