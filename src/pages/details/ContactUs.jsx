import { MessageSquare, Mail } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="mt-10">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white leading-tight transition-colors">
            Let's Connect! 🤝
          </h2>
          <p className="text-md text-gray-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto transition-colors">
            Have questions, feedback, or need assistance? We’re here to help!
            Reach out and let’s start a conversation.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-3 italic transition-colors">
            Your message matters—let’s make something great together!
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-purple-900/40 shadow-xl dark:shadow-[0_8px_30px_-15px_rgba(147,51,234,0.2)] rounded-xl p-6 w-full md:w-1/3 text-center transition-colors">
            <Mail className="mx-auto text-purple-500" size={40} />
            <h3 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white transition-colors">Reach Out to Us</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2 transition-colors">
              Have any questions? Feel free to email or call us directly.
            </p>
            <a
              href="mailto:contact@yourcompany.com"
              className="text-purple-600 dark:text-purple-400 font-medium mt-4 block transition duration-300 hover:text-purple-700 hover:underline"
            >
              contact@yourcompany.com
            </a>
            <a
              href="tel:+919876543210"
              className="text-gray-800 dark:text-gray-200 font-medium mt-2 block transition duration-300 hover:text-purple-600 hover:underline"
            >
              +91 98765 43210
            </a>
          </div>

          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-purple-900/40 shadow-xl dark:shadow-[0_8px_30px_-15px_rgba(147,51,234,0.2)] rounded-xl p-6 w-full md:w-1/3 text-center transition-colors">
            <MessageSquare className="mx-auto text-purple-500" size={40} />
            <h3 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white transition-colors">Contact Support</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2 transition-colors">
              Facing an issue? Don’t worry—our support team is just a message
              away. Start a chat now!
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-6 mt-4 rounded-lg font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:opacity-90">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
