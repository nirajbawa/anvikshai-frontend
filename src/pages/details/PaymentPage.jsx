import "@material-tailwind/react";
import "tailwindcss/tailwind.css";
import { Button } from "@material-tailwind/react";

export default function PaymentPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src="payment.png"
        alt="Illustration"
        className="w-1/5 h-1/5 mt-24 mx-auto"
      />
      <h2 class="font-bold text-xl">Your payment was successful</h2>
      <p>Thank you for your payment.</p>
      <p>We will be in contact with more details shortly.</p>

      <div className="flex flex-wrap justify-center gap-6 mt-10">
        <Button
          color="success"
          className="px-24 py-3 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95"
        >
          Request Mentor
        </Button>
        <Button
          color="info"
          className="px-28 py-3 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95"
        >
          Skip
        </Button>
      </div>
    </div>
  );
}
