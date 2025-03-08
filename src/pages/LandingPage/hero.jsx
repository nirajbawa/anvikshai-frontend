import React from "react";
import { ArrowRight, BookOpen, Brain, Sparkles } from "lucide-react";
import { Link } from "react-router";

function Hero() {
  return (
    <section className=" ml-20 mr-20 pt-28 pb-20 px-6 md:px-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="fade-in-left">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-medium">
                AI-Powered Learning
              </div>
              <div className="bg-pink-100 text-pink-700 px-4 py-1 rounded-full text-sm font-medium">
                Personalized Education
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="hero-gradient">AnvikshAI</span>
            </h1>

            <div className="text-4xl md:text-5xl font-bold mb-6">
              Master the <span className="changing-text"></span>
            </div>

            <p className="text-xl text-gray-600 mb-8">
              Your Personalized Learning Journey, Powered by AI – Study Smarter,
              Not Harder!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <button className="btn-primary">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <Link to="/about">
                <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                  Learn More
                </button>
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Brain className="h-5 w-5 text-purple-700" />
                </div>
                <span className="font-medium">AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-blue-700" />
                </div>
                <span className="font-medium">Personalized</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-pink-100 p-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-pink-700" />
                </div>
                <span className="font-medium">Interactive</span>
              </div>
            </div>
          </div>

          <div className="fade-in-right">
            <img
              src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
              alt="Student learning with AI"
              className="rounded-2xl shadow-2xl w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
