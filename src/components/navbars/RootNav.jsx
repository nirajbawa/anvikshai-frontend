import { Link, useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="sticky bg-[#D2B0FD] h-18 w-full shadow-lg ">
        <div className="flex justify-between items-center p-3">
          <div className="font-bold ml-8 text-[30px]">AnvikshAI</div>

          <div className="text-[20px] space-x-20 ">
            <>
              <Link
                to="/"
                className="p-2 mx-2 transition-transform duration-300 ease-in-out hover:scale-110 inline-block"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="p-2 mx-2 transition-transform duration-300 ease-in-out hover:scale-110 inline-block"
              >
                About us
              </Link>
              <Link
                to="/contact"
                className="p-2 mx-2 transition-transform duration-300 ease-in-out hover:scale-110 inline-block"
              >
                Contact us
              </Link>
            </>
          </div>

          <div className="space-x-10 mr-7">
            <button
              className="cursor-pointer rounded-md hover:active
                      border-2 border-black p-2.5 px-6 active:bg-black 
                      active:text-white
                      active:border-black"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className=" cursor-pointer mr-10 bg-black text-white p-3 rounded-md px-5 
                      hover:active
                      active:bg-[#3b3939]"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
