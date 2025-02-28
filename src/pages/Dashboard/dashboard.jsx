import home from './home.svg'
import certification from './certification.svg'
import profile from './profile.svg'
import settings from './settings.svg'
import subscriptions from './subscriptions.svg'
import signout from './signout.svg'
import task from './task.svg'
import { Link } from "react-router-dom"



function Dashboard({ tasks }){
    return (
        <div>
            <div class="flex h-screen">
                <div class="w-64 h-full sticky bg-gray-800 text-white p-4">
                    <div class="flex justify-start items-center space-x-2 mt-8 ml-2 text-lg p-3 hover:bg-gray-700 rounded-lg">
                        <img src={home}></img>
                        <Link>Home</Link>
                    </div>
                    <div class="flex justify-start items-center space-x-2 mt-4 ml-2 text-lg p-3 hover:bg-gray-700 rounded-lg">
                        <img src={profile}></img>
                        <Link>Profile</Link>
                    </div>
                    <div class="flex justify-start items-center space-x-2 mt-4 ml-2 text-lg p-3 hover:bg-gray-700 rounded-lg">
                        <img src={subscriptions}></img>
                        <Link>Subscriptions</Link>
                    </div>
                    <div class="flex justify-start items-center space-x-2 mt-4 ml-2 text-lg p-3 hover:bg-gray-700 rounded-lg">
                        <img src={certification}></img>
                        <Link>Certification</Link>
                    </div>
                    <div class="flex justify-start items-center space-x-2 mt-4 ml-2 text-lg p-3 hover:bg-gray-700 rounded-lg">
                        <img src={settings}></img>
                        <Link>Settings</Link>
                    </div>
                    <div class=" transition-transform duration-300 ease-in-out hover:scale-110 flex justify-start items-center mt-48 space-x-2 ml-2 text-lg p-2 hover:bg-gray-700 rounded-lg">
                        <img src={signout}></img>
                        <Link>Sign out</Link>
                    </div>

                </div>

                <div class="flex-1 h-screen overflow-y-auto pl-16 pt-5 bg-gray-100">
                    <div class=" text-[30px] flex justify-start items-center space-x-2">
                        <img class="h-12 w-12" src={task}></img>
                        <h1>Your Tasks</h1>
                    </div>
                    <div class="">
                    
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tasks.map((task) => (
                                <div key={task.id} className="bg-white p-4 rounded-lg shadow-md">
                                        <h3 className="text-lg font-bold">{task.title}</h3>
                                        <p className="text-gray-600 truncate">{task.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    

                </div>

            </div>

        </div>
    )

}

export default Dashboard