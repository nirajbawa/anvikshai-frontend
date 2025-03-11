import React from "react";
import { UserPlus, ListTodo, Route, BookOpen, CheckCircle } from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      icon: <UserPlus className="h-10 w-10 text-purple-700" />,
      title: "Sign Up",
      description:
        "Create your profile with details like qualifications and preferred learning topics.",
      image:
        "https://images.unsplash.com/photo-1484807352052-23338990c6c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      icon: <ListTodo className="h-10 w-10 text-purple-700" />,
      title: "Add Task",
      description: "Input study topics or tasks you want to complete.",
      image:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
    },
    {
      icon: <Route className="h-10 w-10 text-purple-700" />,
      title: "AI-Generated Roadmap",
      description:
        "The system creates a personalized study plan tailored to your goals.",
      image:
        "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-purple-700" />,
      title: "Generate Content & Learn",
      description:
        "The AI provides recommended study materials and quizzes to assess your understanding.",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-purple-700" />,
      title: "Track Progress",
      description:
        "Your progress is tracked, and you move to the next step in the roadmap.",
      image:
        "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  return (
    <section id="how-it-works" className="md:ml-20 md:mr-20 py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="section-title">
          How <span>It Works</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.slice(0, 3).map((step, index) => (
            <div key={index} className="feature-card fade-in">
              <div className="bg-purple-100 p-4 rounded-full w-fit mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600 mb-6">{step.description}</p>
              <div className="rounded-xl overflow-hidden h-48">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {steps.slice(3, 5).map((step, index) => (
            <div key={index} className="feature-card fade-in">
              <div className="bg-purple-100 p-4 rounded-full w-fit mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600 mb-6">{step.description}</p>
              <div className="rounded-xl overflow-hidden h-48">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
