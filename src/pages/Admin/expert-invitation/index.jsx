import React, { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "react-toastify";
import useAxios from "../../../hook/useAxios";

function ExpertInvitationPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const axiosInstance = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setStatus("error");
      setMessage("Please enter an email address");
      return;
    }

    setStatus("loading");
    setLoading(true);
    // Simulate API call
    try {
      await axiosInstance.post("/admin/expert", {
        email: email,
      });
      setStatus("success");
      setMessage("Invitation sent successfully!");
      setEmail("");
      toast.success("Expert invitation mail sent!");
    } catch (error) {
      setStatus("error");
      setMessage("Failed to send invitation. Please try again.");
      const errorMessage =
        error.response?.data?.detail || "Signup failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3e8ff] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-[#d2b0fd]/20">
          <h1 className="text-2xl font-bold text-[#4a3a61] mb-2">
            Invite an Expert
          </h1>
          <p className="text-[#6b5c82] mb-6">
            Send an invitation to collaborate with an expert
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#4a3a61] mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-[#d2b0fd] rounded-lg focus:ring-2 focus:ring-[#d2b0fd] focus:border-transparent transition-all duration-200 outline-none bg-white/50"
                placeholder="expert@example.com"
                disabled={status === "loading"}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200
                ${
                  status === "loading"
                    ? "bg-[#d2b0fd]/70 cursor-not-allowed"
                    : "bg-[#d2b0fd] hover:bg-[#c49fec] active:bg-[#b68edb]"
                }`}
            >
              <Send size={18} />
              {status === "loading" ? "Sending..." : "Send Invitation"}
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                status === "success"
                  ? "bg-[#d2b0fd]/20 text-[#4a3a61]"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpertInvitationPage;
