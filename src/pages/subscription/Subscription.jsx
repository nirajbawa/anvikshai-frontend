import "@material-tailwind/react";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router";
import React from "react";
import { useRazorpay } from "react-razorpay";
import { useState } from "react";
import useAxios from "../../hook/useAxios";
import { toast } from "react-toastify";

export default function SubscriptionPlans() {
  let navigate = useNavigate();

  const { error, isLoading, Razorpay } = useRazorpay();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosInstance = useAxios();

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
    <div className="min-h-screen flex flex-col items-center p-8">
      <h2 className="text-5xl font-bold mt-10 mb-6">Subscription Plans</h2>

      <div className="flex flex-col md:flex-row gap-20 mt-10">
        <div
          className="bg-white shadow-xl rounded-lg p-6 w-[350px] h-[400px] flex flex-col justify-between text-center 
                        transition duration-300 transform hover:scale-105 hover:shadow-2xl"
        >
          <h3 className="text-2xl font-bold flex gap-2 mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              strokeWidth="5"
              stroke="black"
              className="w-7 h-8"
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
            <p className="font-semibold text-lg">Features:</p>
            <ul className="text-md text-black-700 font-bold">
              <li className="mt-4">• 10 tasks per month</li>
              <li>• No Ads</li>
            </ul>
          </div>

          <div className="mt-auto mb-6 flex items-center justify-center gap-3">
            <p className="text-black-500 text-xl line-through font-bold">
              &#8377;1000
            </p>
            <p className="text-red-600 text-2xl font-bold">&#8377;500</p>
          </div>

          <button
            onClick={paymentHandler}
            className="bg-black text-white py-3 px-6 rounded-md w-full hover:bg-gray-800 transition text-sm mb-5"
          >
            BUY
          </button>
        </div>
      </div>
    </div>
  );
}
