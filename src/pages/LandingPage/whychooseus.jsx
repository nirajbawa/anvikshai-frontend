import React from "react";
import { LineChart, Clock, Zap, DollarSign } from "lucide-react";

function WhyChooseUs() {
  const features = [
    {
      icon: <LineChart className="h-8 w-8 text-white" />,
      title: "Real-Time Progress Tracking",
      description:
        "Stay on track with instant updates and performance metrics.",
    },
    {
      icon: <Zap className="h-8 w-8 text-white" />,
      title: "Interactive Content",
      description:
        "Engaging quizzes, flashcards, and videos make learning fun and effective.",
    },
    {
      icon: <Clock className="h-8 w-8 text-white" />,
      title: "24/7 AI Support",
      description:
        "Instant help whenever you need it, no matter the time of day.",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-white" />,
      title: "Affordable Pricing",
      description:
        "Premium features at an accessible price point for all students.",
    },
  ];

  return (
    <section id="why-choose-us" className="md:ml-20 md:mr-20 py-20 bg-transparent transition-colors">
      <div className="container mx-auto px-6">
        <h2 className="section-title">
          Why Choose <span>Us</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg card-hover fade-in"
            >
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6">
                <div className="bg-white/20 p-3 rounded-full w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/90">{feature.description}</p>
              </div>
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 transition-colors">
                <ul className="space-y-2">
                  {[1, 2].map((item) => (
                    <li key={item} className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-purple-600 dark:bg-purple-500"></div>
                      <span className="text-gray-700 dark:text-gray-300 transition-colors">
                        {index === 0 &&
                          item === 1 &&
                          "Goal achievement tracking"}
                        {index === 0 &&
                          item === 2 &&
                          "Daily performance reports"}

                        {index === 1 &&
                          item === 1 &&
                          "Adaptive learning materials"}
                        {index === 1 &&
                          item === 2 &&
                          "Multimedia content library"}

                        {index === 2 &&
                          item === 1 &&
                          "AI-driven learning suggestions"}
                        {index === 2 &&
                          item === 2 &&
                          "Smart study recommendations"}

                        {index === 3 &&
                          item === 1 &&
                          "Flexible subscription plans"}
                        {index === 3 && item === 2 && "No hidden charges"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
