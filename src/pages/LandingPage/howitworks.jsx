import heading from "./heading.png" 
import img1 from "./img1.jpg"
import img2 from "./img2.jpg"
import img3 from "./img3.jpg"
import img4 from "./img4.jpg"
import img5 from "./img5.jpg"
function Work() {

  return (
    <div class=" pb-24">
       <div class="flex items-center space-x-6 justify-center">
            <img class="h-20" src={heading}></img>
            <h1 class="text-[40px] ">How does it works?</h1>
            <img  class="h-20" src={heading}></img>
        </div>
         
        <div class="grid grid-cols-3 border-none h-100 ml-40 mr-40 mt-20 gap-10 ">
            <div class="text-center border-none hover:border-2 hover:bg-gray-300 hover:shadow-black hover:shadow-lg">
                <img class=" mt-5 mx-auto rounded-full h-40" src={img1}></img>
                <h2 class="text-lg mt-5 ">Signup</h2>
                <p class="bg-[#D2B0FD] text-black mt-5 p-8">Users sign up and create their profile with details like qualifications and preferred learning topics.</p>
            </div>
            <div class="text-center border-none hover:border-2 hover:bg-gray-300  hover:shadow-black hover:shadow-lg">
                <img class=" mt-5 mx-auto rounded-full w-40 h-40" src={img2}></img>
                <h2 class="text-lg mt-5">Add Task</h2>
                <p class="bg-[#D2B0FD] text-black mt-5 p-11"> Users input study topics or tasks they want to complete.</p>
            </div>
            <div class=" text-center border-none hover:border-2 hover:bg-gray-300  hover:shadow-black hover:shadow-lg">
                <img class=" mt-5 mx-auto rounded-full w-40 h-40" src={img3}></img>
                <h2 class=" text-lg mt-5">AI-Generated Roadmap</h2>
                <p class="bg-[#D2B0FD] text-black mt-5 p-11" >The system creates a personalized study plan.</p>
            </div>
        </div>
        <div class="grid grid-cols-2 border-none ml-80 mr-80 mt-10 h-100 gap-10">
            <div class="text-center border-none hover:border-2 hover:bg-gray-300 hover:shadow-black hover:shadow-lg">
                <img class="mt-5 mx-auto rounded-full h-40" src={img4}></img>
                <h2 class="text-lg mt-5">Generate Content / Learn
                Take Quiz</h2>
                <p class="bg-[#D2B0FD] text-black mt-5 p-6"> The AI provides recommended study materials (articles, videos, etc.) and  Users complete quizzes to assess their understanding</p>
            </div>
            <div class=" text-center border-none hover:border-2 hover:bg-gray-300 hover:shadow-black hover:shadow-lg">
                <img class="mt-5 mx-auto rounded-full h-40" src={img5}></img>
                <h2 class="text-lg mt-5">Task Completed for Today</h2>
                <p class="bg-[#D2B0FD] text-black mt-5 p-12">The progress is tracked, and the user moves to the next step in the roadmap.</p>
            </div>
            
        </div>
      
      </div>
  )
}

export default Work
