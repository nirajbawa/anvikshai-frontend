
    function Dashboard () {

    return (
        <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-purple-200 p-5 flex flex-col justify-between">
            <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <ul className="mt-5 space-y-4 text-lg">
                <li className="flex items-center gap-2 cursor-pointer hover:text-purple-700">
                Home
                </li>
                <li className="flex items-center gap-2 cursor-pointer hover:text-purple-700">
                Students
                </li>
                <li className="flex items-center gap-2 cursor-pointer hover:text-purple-700">
                Mentors
                </li>
                <li className="flex items-center gap-2 cursor-pointer hover:text-purple-700">
                Add Mentor
                </li>
                <li className="flex items-center gap-2 cursor-pointer hover:text-purple-700">
                Allocate Mentor
                </li>
                <li className="flex items-center gap-2 cursor-pointer hover:text-purple-700">
                Settings
                </li>
            </ul>
            </div>
            <div className="flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-800">
            Sign Out
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
            {/* Navbar */}
            <div className="h-16 items-center justify-between pt-10 m-10">
                <h1 className="text-5xl font-bold p-10">Hello, Mentor</h1>
            </div>


            {/* Dashboard Content */}
            <div className="flex flex-wrap p-6 gap-6 m-10">
            {/* Student Card */}
                <div className="bg-white shadow-lg p-5 rounded-lg w-72">
                    <h3 className="font-semibold text-lg">Students</h3>
                    <img className = "m-0 p-0" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJDCVt9sVWE2O2qbocfdtChENQGNFKpKY1S5ZOk8yVYTvwdMihVcyUNni-3CmzCwqcfiA&usqp=CAU" alt="" />
                </div>

            {/* Mentors Card */}
                <div className="bg-white shadow-lg p-5 rounded-lg w-72">
                    <h3 className="font-semibold text-lg">Mentors</h3>
                    <img className = "m-0 p-0" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJDCVt9sVWE2O2qbocfdtChENQGNFKpKY1S5ZOk8yVYTvwdMihVcyUNni-3CmzCwqcfiA&usqp=CAU" alt="" />
                </div>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;
