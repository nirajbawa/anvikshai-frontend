import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className=" text-gray-900 py-16 px-6 md:px-16 lg:px-32 mt-20">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-blue-600">
          Empowering Learners with AI-Driven Education!
        </h1>
        <p className="mt-4 text-lg text-gray-700 mb-10">
          We make structured, high-quality learning accessible through
          AI-powered roadmaps, personalized feedback, and expert mentorship.
        </p>
        <Link
          to="/login"
          className=" bg-[#D2B0FD] text-black px-6 py-3 rounded-lg shadow-md hover:text-white hover:bg-[#5A189A] transition"
        >
          Get Started
        </Link>
      </motion.div>

      {/* Our Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          class="bg-gray-100 p-6 rounded-lg hover:shadow-lg"
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-blue-600">Our Mission</h2>
          <p className="text-gray-700 mt-2">
            Our mission is to simplify and enhance learning by leveraging AI
            technology, ensuring that anyone can master new skills without
            confusion.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          class="bg-gray-100 p-6 rounded-lg hover:shadow-lg"
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-blue-600">Our Vision</h2>
          <p className="text-gray-700 mt-2">
            We envision a world where education is personalized, accessible, and
            optimized for every learner’s success.
          </p>
        </motion.div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center mb-16 ">
        <h2 className="text-3xl font-bold text-blue-600 ">Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 ">
          {[
            "AI-Powered Roadmaps",
            "Personalized Feedback",
            "Daily Learning Tasks",
            "Quizzes & Assessments",
            "Progress Tracking",
            "Expert Mentorship",
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-300 p-6 rounded-lg shadow-sm hover:shadow-lg  transition"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <h3 className="text-xl font-semibold text-[#333333 ] ">
                {feature}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
