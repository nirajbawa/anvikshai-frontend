import "@material-tailwind/react";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router";
import React from "react";
import { useRazorpay } from "react-razorpay";
import { useState } from "react";
import useAxios from "../../hook/useAxios";
import { toast } from "react-toastify";
import useAuthStore from "../../store/useAuthStore";
import { CheckCircle } from "lucide-react";

export default function SubscriptionPlans() {
  let navigate = useNavigate();
  const { user, setUser } = useAuthStore();

  const { error, isLoading, Razorpay } = useRazorpay();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosInstance = useAxios();

  const createOrder = async () => {
    try {
      const response = await axiosInstance.get(
        "/payment/premium-subscription-order"
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const insertOrder = async (data) => {
    try {
      await axiosInstance.post("/payment/premium-subscription-order", {
        razorpay_order_id: data,
      });
      
      // Fetch updated user data to sync premium status
      const userRes = await axiosInstance.get("/auth/get-current-user");
      if (userRes.data) {
        setUser(userRes.data);
      }

      toast.success("Payment successful! You are now a Premium user.");
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
        await insertOrder(response.razorpay_order_id);
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
    setIsSubmitting(true);
    makePayment();
  };

  const isPremium = user?.premium_package === "Premium";

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-transparent transition-colors">
      <h2 className="text-5xl font-bold mt-10 mb-6 text-gray-900 dark:text-white transition-colors">Subscription Plans</h2>

      <div className="flex flex-col md:flex-row gap-20 mt-10">
        <div
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md rounded-lg p-6 w-[350px] min-h-[400px] flex flex-col justify-between text-center 
                        transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          {isPremium ? (
            <div className="flex flex-col items-center justify-center h-full py-10">
              <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Premium Active</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">You are already enjoying the best of Anviksh AI!</p>
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-purple-600 text-white py-3 px-8 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg"
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold flex gap-2 mt-6 text-gray-900 dark:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="5"
                  stroke="currentColor"
                  className="w-7 h-8 text-gray-900 dark:text-white transition-colors"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 2L3 14h8l-2 8 10-12h-8l2-8z"
                  />
                </svg>
                Premium Package
              </h3>

              <div className="mt-8 ml-10 flex flex-col justify-center space-y-3 text-left">
                <p className="font-semibold text-lg text-gray-900 dark:text-white transition-colors">Features:</p>
                <ul className="text-md text-gray-700 dark:text-gray-300 font-bold transition-colors">
                  <li className="mt-4">• 10 tasks per month</li>
                  <li>• No Ads</li>
                </ul>
              </div>

              <div className="mt-auto mb-6">
                <div className="flex items-center justify-center gap-3">
                  <p className="text-gray-500 text-xl line-through font-bold transition-colors">
                    &#8377;1000
                  </p>
                  <p className="text-red-600 text-2xl font-bold">&#8377;500</p>
                </div>
                <p className="text-xs text-gray-400 mt-1 italic">Valid for 1 year</p>
              </div>

              <button
                onClick={paymentHandler}
                disabled={isSubmitting}
                className="bg-gray-900 dark:bg-purple-600 text-white py-4 px-6 rounded-xl w-full hover:bg-gray-800 dark:hover:bg-purple-500 transition-colors font-bold shadow-lg"
              >
                {isSubmitting ? "PROCESSING..." : "BUY NOW"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
