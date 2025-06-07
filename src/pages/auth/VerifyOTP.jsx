import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, CheckCircle } from "lucide-react";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  const signupData = JSON.parse(localStorage.getItem("signupData") || "{}");

  useEffect(() => {
    if (!signupData.phoneNumber) {
      navigate("/signup");
      return;
    }

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      setError("Please enter the complete OTP");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (otpValue === "1234") {
        // Store successful signup
        localStorage.setItem("userEmail", signupData.email);
        localStorage.setItem("userRole", signupData.role);
        localStorage.removeItem("signupData");

        // Navigate to login with prefilled data
        navigate("/login", {
          state: {
            email: signupData.email,
            password: signupData.password,
            verified: true,
          },
        });
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setCanResend(false);
    setTimer(30);
    setError("");

    // Simulate resend API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700/50">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Verify Your Phone Number
            </h1>
            <p className="text-gray-300 mb-2">We've sent a 4-digit code to</p>
            <p className="text-indigo-400 font-medium">
              {signupData.phoneNumber}
            </p>
          </div>

          {/* OTP Input */}
          <div className="mb-8">
            <div className="flex justify-center space-x-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-14 text-center text-xl font-bold bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-900/20 border border-red-700 rounded-lg mb-4"
              >
                <p className="text-sm text-red-400 text-center">{error}</p>
              </motion.div>
            )}

            {/* Timer and Resend */}
            <div className="text-center">
              {!canResend ? (
                <p className="text-gray-400 text-sm">Resend OTP in {timer}s</p>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center space-x-1 mx-auto"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Resend OTP</span>
                </button>
              )}
            </div>
          </div>

          {/* Verify Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleVerify}
            disabled={isLoading || otp.join("").length !== 4}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <CheckCircle className="h-5 w-5" />
                <span>Verify & Continue</span>
              </>
            )}
          </motion.button>

          {/* Back Button */}
          <button
            onClick={() => navigate("/signup")}
            className="w-full mt-4 py-2 text-gray-400 hover:text-white transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Signup</span>
          </button>

          {/* Demo Note */}
          <div className="mt-6 p-3 bg-indigo-900/20 border border-indigo-700 rounded-lg">
            <p className="text-xs text-indigo-400 text-center">
              Demo: Use OTP 1234 for verification
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
