import React from "react";
import { Input, Typography, Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import useAxios from "../../hook/useAxios";
import { useParams, useNavigate } from "react-router";
import useAuthStore from "../../store/useAuthStore";

export default function AdminOtpLogin() {
  const inputRefs = React.useRef([]);
  const [otp, setOtp] = React.useState(Array(6).fill(""));
  const [loading, setLoading] = React.useState(false);
  let { email } = useParams();
  let navigate = useNavigate();
  let axiosInstance = useAxios();
  const { setToken } = useAuthStore();

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    const sanitizedValue = value.replace(/[^0-9]/g, ""); // Allow only numbers

    if (sanitizedValue) {
      newOtp[index] = sanitizedValue;
      setOtp(newOtp);

      // Move focus to the next input box
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleBackspace = (event, index) => {
    if (event.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = ""; // Clear the current box
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus(); // Move to the previous box
      }

      setOtp(newOtp);
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData
      .getData("text")
      .slice(0, 6)
      .replace(/[^0-9]/g, "");
    if (pastedData.length === 6) {
      setOtp([...pastedData]);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      setLoading(true);
      try {
        const response = await axiosInstance.post("/admin/verify", {
          email,
          otp: otpValue,
        });

        setToken(response.data?.access_token);
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } catch (error) {
        toast.error(
          error.response?.data?.detail || "Login failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please enter a complete 6-digit OTP.");
    }
  };

  return (
    <div className="w-full max-w-md mt-36 mx-auto p-6 bg-white rounded-lg shadow-lg my-20">
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

      <div
        className="flex items-center justify-center gap-3 mb-6"
        onPaste={handlePaste}
      >
        {otp.map((digit, index) => (
          <React.Fragment key={index}>
            <Input
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleBackspace(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
            {index === 2 && <span className="text-2xl text-gray-500">-</span>}
          </React.Fragment>
        ))}
      </div>

      <Button
        color="blue"
        className="w-full py-2 mb-4 bg-[#020617] text-white"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Submit OTP"}
      </Button>
    </div>
  );
}
