import heading from "./heading.png"

function Choose() {
  return (
    <div class="pb-24">
        <div class="flex items-center space-x-6 justify-center pt-20">
                    <img class="h-20" src={heading}></img>
                    <h1 class="text-[40px] ">Why Choose <span class="text-red-700">us</span> ?</h1>
                    <img  class="h-20" src={heading}></img>
        </div>

        <div class="mr-28 ml-28 mt-28">
            <div class=" text-[17px] grid grid-cols-4 border-none gap-10 ">

                <div class=" transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-2xl text-center col-span-2 p-10 rounded-[50px] border-2 bg-gradient-to-r from-[#722AE6] to-[#E4B5CB] ">
                    <div>
                        <h1 class="font-bold text-[20px]" >Real-Time Progress Tracking:</h1>
                        <h2>Stay on track with instant updates and performance.</h2>
                    </div>
                </div>

                <div class=" transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-2xl  text-center col-span-2 p-10 rounded-[50px] border-2 bg-gradient-to-r from-[#722AE6] to-[#E4B5CB] ">
                    <div>
                        <h1 class="  font-bold text-[20px]" >Interactive Content</h1>
                        <h2>Engaging quizzes, flashcards, and videos make learning fun.</h2>
                    </div>
                </div>

                <div class="transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-2xl  text-center col-span-2 p-10 rounded-[50px] border-2 bg-gradient-to-r from-[#722AE6] to-[#E4B5CB]">
                    <div>
                        <h1 class="font-bold text-[20px]">24/7 AI Support</h1>
                        <h2>Instant help whenever you need  it.</h2>
                    </div>
                </div>

                <div class="transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-2xl  text-center col-span-2 p-10 rounded-[50px] border-2 bg-gradient-to-r from-[#722AE6] to-[#E4B5CB] ">
                    <div>
                        <h1 class="font-bold text-[20px]">Affordable Pricing</h1>
                        <h2>Premium features at an accessible price</h2>
                    </div>
                </div>
                
            </div>
        </div>
        
      
    </div>
  )
}

export default Choose

