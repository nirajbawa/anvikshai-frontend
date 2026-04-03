import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="text-gray-900 dark:text-white transition-colors py-16 px-6 md:px-16 lg:px-32 mt-20">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-purple-600 dark:text-purple-400 transition-colors">
          Empowering Learners with AI-Driven Education!
        </h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 mb-10 transition-colors">
          We make structured, high-quality learning accessible through
          AI-powered roadmaps, personalized feedback, and expert mentorship.
        </p>
        <Link
          to="/login"
          className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-md shadow-indigo-100/50 dark:shadow-[0_8px_30px_-15px_rgba(147,51,234,0.2)] text-white px-6 py-3 rounded-lg hover:shadow-lg hover:opacity-90 transition-all font-medium"
        >
          Get Started
        </Link>
      </motion.div>

      {/* Our Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-purple-900/40 shadow-xl dark:shadow-[0_8px_30px_-15px_rgba(147,51,234,0.2)] p-6 rounded-lg transition-colors"
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 transition-colors">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2 transition-colors">
            Our mission is to simplify and enhance learning by leveraging AI
            technology, ensuring that anyone can master new skills without
            confusion.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-purple-900/40 shadow-xl dark:shadow-[0_8px_30px_-15px_rgba(147,51,234,0.2)] p-6 rounded-lg transition-colors"
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 transition-colors">Our Vision</h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2 transition-colors">
            We envision a world where education is personalized, accessible, and
            optimized for every learner’s success.
          </p>
        </motion.div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400 transition-colors">Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
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
              className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-purple-900/40 p-6 rounded-lg shadow-xl dark:shadow-[0_8px_30px_-15px_rgba(147,51,234,0.2)] transition-all hover:-translate-y-1 hover:border-purple-300 dark:hover:border-purple-500/50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors">
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
