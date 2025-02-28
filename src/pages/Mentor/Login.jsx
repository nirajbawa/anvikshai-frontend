import login from './login.jpg'
import React from "react"
import { Link } from "react-router-dom"; 
function Login(){
    return (
        <>

        <div class="text-center  grid grid-cols-2 pl-20 pr-20 ">

            <div class=" pt-12">
                <img class="ml-20 h-[600px]" src={login}></img>
            </div>


            <div class="pt-20 ">
                <div class=" pt-1 pb-1 rounded-full ml-60 mr-60 text-[30px]  shadow-lg"> Mentor Log in </div>

                <div class="text-left ml-28 mt-6">
                    <h1>Your Email:</h1>
                    <div class="pt-1">
                        <input type="email" placeholder="abc@gmail.com" class="border-gray-400 border-2 rounded-lg p-[5px] w-[450px]"></input>
                    </div>
                </div>
                <div class="text-left ml-28 mt-6">
                    <h1>Password:</h1>
                    <div class="pt-1">
                        <input  placeholder="password" type="password" class="border-gray-400 border-2 rounded-lg p-[5px] w-[450px]"></input>
                    </div>
                </div>
                <div class="pt-4 flex justify-start items-center ml-28 space-x-2">
                    <input class="w-4 h-4" type="checkbox"></input>
                    <p class="text-gray-600">I agree the <span class="text-black">Terms and Conditions.</span></p>
                </div>
                <div class="mt-10">
                    <button class="text-lg hover:bg-black active:bg-black hover:text-white active:text-white  bg-[#D2B0FD] pl-20 pr-20 pt-3 pb-3 rounded-[20px]">Login</button>
                </div>
                <div class="pt-6 flex justify-center items-center space-x-2">
                    <p class="text-gray-600">Dont have an account?</p>
                    <Link to={'/signup'} class="cursor-pointer hover:underline">Sign up</Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login