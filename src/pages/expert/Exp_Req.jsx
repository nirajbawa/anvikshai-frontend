import React from 'react';

const Exp_Req = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-2xl p-6 max-w-4xl w-full">
                <div className="flex-1 flex justify-center items-center p-4">
                    <img src="/illustration.png" alt="Illustration" className="w-80 h-80 object-contain" />
                </div>
                <div className="flex-1 p-4">
                    <h2 className="text-2xl font-bold text-center mb-4">Enter your Details</h2>
                    <form className="space-y-4">
                        <input type="text" placeholder="Enter your Name" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        <input type="email" placeholder="Expert Email" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        <input type="text" placeholder="Educational Background" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        <textarea placeholder="About Expert" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" rows="3"></textarea>
                        <textarea placeholder="Work Experience" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" rows="3"></textarea>
                        <input type="text" placeholder="Your available time" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        <button type="submit" className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition">Add Expert</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default  Exp_Req;
