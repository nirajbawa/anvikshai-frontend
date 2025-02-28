function Navbar() {
  return (
    <div>
        <nav class="sticky bg-[#D2B0FD] h-18 w-full shadow-lg ">
            <div class="flex justify-between items-center p-3 space-x-11">
                <div class=" font-bold ml-8 flex flex-1/2 text-[30px]">AnvikshAI</div>
                <div><button class="cursor-pointer rounded-md hover:active
                border-1 p-2.5 px-6 active:bg-black
                active:text-white
                active:border-black">Login</button>
                <button class=" cursor-pointer mr-10 bg-black text-white p-3 rounded-md px-5 
                hover:active
                active:bg-[#3b3939]">Signup</button>
              </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar