import React from "react";
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
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#121212] px-4 transition-colors">
      <div className="w-full max-w-md p-10 bg-white dark:bg-[#151515] border border-gray-100 dark:border-purple-900/30 rounded-3xl shadow-2xl dark:shadow-[0_20px_60px_-15px_rgba(147,51,234,0.2)] transition-all">
        <h2
          className="text-center font-extrabold text-3xl mb-3 text-gray-900 dark:text-white tracking-tight transition-colors"
        >
          Admin Verification
        </h2>

        <p className="text-center mb-10 text-sm text-gray-600 dark:text-gray-400 max-w-[280px] mx-auto transition-colors">
          Please enter the secure 6-digit code sent to <span className="font-bold text-purple-600 dark:text-purple-400 break-all">{email}</span>
        </p>

        <div
          className="flex items-center justify-center gap-3 mb-10"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <React.Fragment key={index}>
              <input
                type="text"
                maxLength={1}
                className="w-12 h-16 text-center text-2xl font-bold border-2 border-gray-100 dark:border-gray-800 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all bg-gray-50/50 dark:bg-[#0d0d0d] text-gray-900 dark:text-white"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleBackspace(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
              {index === 2 && <span className="text-2xl text-gray-300 dark:text-gray-700 font-light">|</span>}
            </React.Fragment>
          ))}
        </div>

        <button
          className="w-full py-4 mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/25 hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50 disabled:translate-y-0"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></span>
              VERIFYING...
            </div>
          ) : "VERIFY ADMIN ACCESS"}
        </button>
        
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Secure Admin Channel
          </p>
        </div>
      </div>
    </div>
  );

}



