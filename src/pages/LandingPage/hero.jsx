import React from "react";
import { ArrowRight, BookOpen, Brain, Sparkles } from "lucide-react";
import { Link } from "react-router";

function Hero() {
  return (
    <section className="md:ml-20 md:mr-20 pt-28 pb-20 px-6 md:px-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="fade-in-left">
            <div className="hidden md:flex items-center space-x-3 mb-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-4 py-1 rounded-full text-sm font-medium transition-colors">
                AI-Powered Learning
              </div>
              <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 px-4 py-1 rounded-full text-sm font-medium transition-colors">
                Personalized Education
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white transition-colors">
              <span className="hero-gradient">AnvikshAI</span>
            </h1>

            <div className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white transition-colors">
              Master the <span className="changing-text"></span>
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 transition-colors">
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
                <button className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center">
                  Learn More
                </button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-5">
              <div className="flex items-center space-x-2">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full transition-colors">
                  <Brain className="h-5 w-5 text-purple-700 dark:text-purple-400" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white transition-colors">AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full transition-colors">
                  <BookOpen className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white transition-colors">Personalized</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-full transition-colors">
                  <Sparkles className="h-5 w-5 text-pink-700 dark:text-pink-400" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white transition-colors">Interactive</span>
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
