import React from "react"
import { Link, useLocation , useNavigate } from "react-router-dom";


function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  
  return (
    <div>
        <nav class="sticky bg-[#D2B0FD] h-18 w-full shadow-lg ">
            <div class="flex justify-between items-center p-3">
                <div class="font-bold ml-8 text-[30px]">AnvikshAI</div>
               
                <div class="text-[20px] space-x-20 ">
                {location.pathname === "/" && (
                  <>
                    <Link to="/" className="p-2 mx-2 transition-transform duration-300 ease-in-out hover:scale-110 inline-block">Home</Link>
                    <Link to="/about-us" className="p-2 mx-2 transition-transform duration-300 ease-in-out hover:scale-110 inline-block">About us</Link>
                    <Link to="/contact" className="p-2 mx-2 transition-transform duration-300 ease-in-out hover:scale-110 inline-block">Contact us</Link>
                  </>
                )}
                </div>

                {location.pathname === "/" && (
                <div class="space-x-10 mr-7">
                      <button class="cursor-pointer rounded-md hover:active
                      border-2 border-black p-2.5 px-6 active:bg-black 
                      active:text-white
                      active:border-black" onClick={() => navigate("/login")}>Login</button>
                      <button class=" cursor-pointer mr-10 bg-black text-white p-3 rounded-md px-5 
                      hover:active
                      active:bg-[#3b3939]" onClick={() => navigate("/signup")}>Signup</button>
                </div>
                
                
                )}
                {location.pathname === "/dashboard" && (
                  <Link to="/create-task">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Create Task
                  </button>
                  </Link>
                
                
                
                )}
                

            </div>
        </nav>
    </div>
  )
}

export default Navbar