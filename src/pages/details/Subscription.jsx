import "@material-tailwind/react";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router";
import { useRazorpay } from "react-razorpay";
import { useState } from "react";
import useAxios from "../../hook/useAxios";
import { toast } from "react-toastify";

export default function SubscriptionPlans() {
  let navigate = useNavigate();

  const { error, isLoading, Razorpay } = useRazorpay();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosInstance = useAxios();

  const freePlan = {
    name: "Free Plan",
    features: [
      "Basic career roadmaps",
      "Standard assessment tests",
      "Basic AI chatbot support",
    ],
    price: "₹0",
    slashedPrice: "",
    buttonText: "Start for Free",
    path: "/dashboard",
  };

  const premiumPlan = {
    name: "Premium Plan",
    features: [
      "Detailed step-by-step roadmaps",
      "Full access to premium assessments",
      "1-on-1 Expert mentoring",
      "Advanced AI chatbot capabilities",
    ],
    price: "₹199",
    slashedPrice: "₹399",
    period: "/ month",
    buttonText: "UPGRADE NOW",
    popular: true,
  };

  const createOrder = async () => {
    try {
      const response = await axiosInstance.get(
        "/payment/premium-subscription-order"
      );
      return response.data.data;
      // toast.success("Signup successful! Verify your account");
    } catch (error) {
      console.log(error);
      // const errorMessage =
      //   error.response?.data?.detail || "Signup failed. Please try again.";
      // toast.error(errorMessage);
    }
  };

  const insertOrder = async (data) => {
    try {
      await axiosInstance.post("/payment/premium-subscription-order", {
        razorpay_order_id: data,
      });
      toast.success("Payment successful!");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.detail ||
        "Payment unsuccessful. Please try again.";
      toast.error(errorMessage);
    }
  };

  const makePayment = async () => {
    const key = import.meta.env.VITE_RAZORPAY_KEY_ID || "";

    const data = await createOrder();

    const options = {
      key: key,
      name: "Anviksh AI",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      handler: async function (response) {
        console.log(response.razorpay_order_id);
        insertOrder(response.razorpay_order_id);
        navigate("/dashboard");
      },
      modal: {
        ondismiss: function () {
          setIsSubmitting(false);
        },
      },
    };

    const paymentObject = new Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      setIsSubmitting(false);

      toast("Payment failed. Please try again. Contact support for help");
    });
  };

  const paymentHandler = () => {
    console.log("hello");
    setIsSubmitting(true);
    makePayment();
  };
  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#121212] flex flex-col items-center px-6 transition-colors">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-gray-900 dark:text-white tracking-tight text-center transition-colors">
        Choose Your <span className="text-purple-600 dark:text-purple-500">Growth Path</span>
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 md:gap-12 w-full max-w-6xl justify-center items-stretch">
        {/* Free Plan */}
        <div className="group relative bg-white dark:bg-[#151515] border border-gray-100 dark:border-purple-900/20 rounded-3xl p-8 w-full lg:w-[380px] flex flex-col shadow-xl hover:shadow-2xl dark:shadow-purple-500/5 transition-all duration-300 hover:-translate-y-2">
          <div className="mb-8">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 text-gray-600 dark:text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 2L3 14h8l-2 8 10-12h-8l2-8z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors">{freePlan.name}</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Begin your career journey for free.</p>
          </div>

          <div className="space-y-4 mb-8">
            <p className="font-bold text-sm uppercase tracking-wider text-purple-600 dark:text-purple-400 transition-colors">What's Included:</p>
            <ul className="space-y-4">
              {freePlan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors">
                  <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 transition-colors">
                     <div className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400"></div>
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-8 border-t border-gray-100 dark:border-gray-800 transition-colors">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-extrabold text-gray-900 dark:text-white transition-colors">{freePlan.price}</span>
              <span className="text-gray-500 line-through text-lg font-medium transition-colors">{freePlan.slashedPrice}</span>
            </div>

            <button
              onClick={() => navigate(freePlan.path)}
              className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-2xl hover:bg-black dark:hover:bg-gray-200 transition-all shadow-lg active:scale-95"
            >
              {freePlan.buttonText}
            </button>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="group relative bg-white dark:bg-[#1a1a1a] border-2 border-purple-500/50 dark:border-purple-500/30 rounded-3xl p-8 w-full lg:w-[380px] flex flex-col shadow-2xl shadow-purple-500/10 transition-all duration-300 border-glow hover:-translate-y-2">
          {premiumPlan.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-6 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">
              Most Popular
            </div>
          )}

          <div className="mb-8">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-2xl flex items-center justify-center mb-4 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-purple-600 dark:text-purple-400"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors">{premiumPlan.name}</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Unlock your full potential with AI.</p>
          </div>

          <div className="space-y-4 mb-8">
            <p className="font-bold text-sm uppercase tracking-wider text-purple-600 dark:text-purple-400 transition-colors">Premium Benefits:</p>
            <ul className="space-y-4">
              {premiumPlan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors font-semibold">
                  <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                     <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-8 border-t border-gray-100 dark:border-gray-800 transition-colors">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-extrabold text-gray-900 dark:text-white transition-colors">{premiumPlan.price}</span>
              <span className="text-gray-500 line-through text-lg font-medium transition-colors">{premiumPlan.slashedPrice}</span>
              <span className="ml-2 text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">SAVE 50%</span>
            </div>

            <button
              onClick={paymentHandler}
              className="w-full py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/30 active:scale-95 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                   PROCESSING...
                </>
              ) : premiumPlan.buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
