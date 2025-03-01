import React from "react";
import { Input, Typography, Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import axiosInstance from "../../middleware/axiosInstance";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

export default function OtpPage() {
  const inputRefs = React.useRef([]);
  const [otp, setOtp] = React.useState(Array(6).fill(""));
  const [loading, setLoading] = React.useState(false);
  let { email } = useParams();
  let navigate = useNavigate();

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, "");
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (event, index) => {
    if (event.key === "Backspace" && !event.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      setLoading(true); // Start loading
      try {
        await axiosInstance.post("/auth/verify", {
          email: email,
          otp: otpValue,
        });

        toast.success("Signup successful!");
        navigate("/login");
      } catch (error) {
        const errorMessage =
          error.response?.data?.detail || "Signup failed. Please try again.";
        toast.error(errorMessage);
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      toast.error("Please enter a complete 6-digit OTP.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg my-20">
      <Typography
        variant="h5"
        color="blue-gray"
        className="text-center font-semibold mb-4"
      >
        Verify Your Account
      </Typography>

      <Typography variant="small" color="gray" className="text-center mb-6">
        Enter the 6-digit OTP sent to <span className="font-bold">{email}</span>
      </Typography>

      <div className="flex items-center justify-center gap-3 mb-6">
        {otp.map((digit, index) => (
          <React.Fragment key={index}>
            <Input
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleBackspace(e, index)}
              inputRef={(el) => (inputRefs.current[index] = el)}
            />
            {index === 2 && <span className="text-2xl text-gray-500">-</span>}
          </React.Fragment>
        ))}
      </div>

      <Button
        color="blue"
        className="w-full py-2 mb-4 bg-[#020617] text-white"
        onClick={handleSubmit}
        disabled={loading} // Disable button while loading
      >
        {loading ? "Verifying..." : "Submit OTP"}
      </Button>
    </div>
  );
}
