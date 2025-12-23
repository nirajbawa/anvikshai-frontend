import { MessageSquare, Mail } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="mt-10">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Let's Connect! 🤝
          </h2>
          <p className="text-md text-gray-700 mt-4 max-w-2xl mx-auto">
            Have questions, feedback, or need assistance? We’re here to help!
            Reach out and let’s start a conversation.
          </p>
          <p className="text-gray-600 mt-3 italic">
            Your message matters—let’s make something great together!
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3 text-center">
            <Mail className="mx-auto text-[#D2B0FD]" size={40} />
            <h3 className="text-xl font-semibold mt-4">Reach Out to Us</h3>
            <p className="text-gray-600 mt-2">
              Have any questions? Feel free to email or call us directly.
            </p>
            <a
              href="mailto:shankhapalakash@gmail.com"
              className="text-[#D2B0FD] font-medium mt-4 block transition duration-300 hover:text-[#B494E8] hover:underline"
            >
              contact@yourcompany.com
            </a>
            <a
              href="tel:+918208912469"
              className="text-gray-800 font-medium mt-2 block transition duration-300  hover:underline"
            >
              +91 98765 43210
            </a>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3 text-center">
            <MessageSquare className="mx-auto text-[#D2B0FD]" size={40} />
            <h3 className="text-xl font-semibold mt-4">Contact Support</h3>
            <p className="text-gray-600 mt-2">
              Facing an issue? Don’t worry—our support team is just a message
              away. Start a chat now!
            </p>
            <button className="bg-[#D2B0FD] text-white py-2 px-4 mt-4 rounded-lg transition duration-300 hover:bg-[#B494E8] hover:shadow-lg">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
