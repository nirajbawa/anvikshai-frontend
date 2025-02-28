import heading from "./heading.png"
import check from "./check.png"

function Premium() {
  return (
    <div class=" pb-24">
        <div class="flex items-center space-x-6 justify-center pt-20">
                <img class="h-20" src={heading}></img>
                <h1 class="text-[40px] ">Discover Your Perfect Price</h1>
                <img  class="h-20" src={heading} ></img>
        </div>
        <div>
            <p class="text-center mt-10 text-gray-500">Unlock the ability to add unlimited tasks to your roadmap while joining vibrant study groups for collaboration, support, and motivation.</p>
        </div>

        <div class="mx-auto mr-28 ml-28" >
            <div class=" grid grid-cols-2 gap-20 h-130 pt-20 pr-40 pl-40 ">
                <div class="pb-12 border-2 border-black bg-gray-200 transition-transform duration-300 ease-in-out hover:scale-110 text-center hover:shadow-2xl hover:shadow-gray-500 rounded-[20px] border-2">
                    <h1 class="text-[30px] mt-5 bg-gradient-to-r from-[#ffb347] to-[#ff6801]" >Standard</h1>
                    <h2 class="text-[30px] mt-3">10.99$</h2>
                    <p class="text-gray-500">Per Month</p>
                    <div class="flex justify-center mt-7 items-center space-x-2">
                        <img class="h-5" src={check}></img>
                        <p>Unlimited Task Creation</p>
                    </div>
                    <hr class="ml-20 mr-20 mt-5 border-t-2 border-gray-400"></hr>

                    <div class="flex justify-center mt-7 items-center space-x-2">
                        <img class="h-5" src={check}></img>
                        <p>Progress Analytics</p>
                    </div>
                    <hr class="ml-20 mr-20 mt-5 border-t-2 border-gray-400"></hr>
                    <div class="flex justify-center mt-7 items-center space-x-2">
                        <img class="h-5" src={check}></img>
                        <p>AI-Powered Task Prioritization</p>
                    </div>

                    <a href="#_" class=" mt-14 inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gradient-to-r from-[#ffb347] to-[#ff6801] rounded-lg sm:w-auto sm:mb-0" data-primary="green-400" data-rounded="rounded-2xl" data-primary-reset="{}">
                        Buy Now
                        <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>

                </div>



                <div class=" pb-12 border-black bg-gray-200 transition-transform duration-300 ease-in-out hover:scale-110 text-center hover:shadow-2xl hover:shadow-gray-500 rounded-[20px] border-2">
                    <h1 class="text-[30px] mt-5 bg-gradient-to-r from-[#4169e1] to-[#89CFF0]" >Premium</h1>
                    <h2 class="text-[30px] mt-3">19.99$</h2>
                    <p class="text-gray-500">Per Month</p>
                    <div class="flex justify-center mt-7 items-center space-x-2">
                        <img class="h-5" src={check}></img>
                        <p>Everything in Gold </p>
                    </div>
                    <hr class="ml-20 mr-20 mt-5 border-t-2 border-gray-400"></hr>
                    <div class="flex justify-center mt-7 items-center space-x-2">
                        <img class="h-5" src={check}></img>
                        <p>Community Group Formation</p>
                    </div>
                    <hr class="ml-20 mr-20 mt-5 border-t-2 border-gray-400"></hr>
                    <div class="flex justify-center mt-7 items-center space-x-2">
                        <img class="h-5" src={check}></img>
                        <p>One-to-one Mentorship</p>
                    </div>

                    <a href="#_" class=" mt-14 inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gradient-to-r from-[#4169e1] to-[#89CFF0] rounded-lg sm:w-auto sm:mb-0" data-primary="green-400" data-rounded="rounded-2xl" data-primary-reset="{}">
                        Buy Now
                        <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>

                </div>
                
                

            </div>
        </div>

        

      
    </div>
  )
}

export default Premium
