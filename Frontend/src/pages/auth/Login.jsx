import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import bgImage from "../../assets/auth-bg.png";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showNoAccountModal, setShowNoAccountModal] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      const errorMessage = err.response?.data?.detail || "Login failed. Please check your credentials.";
      const statusCode = err.response?.status;
      
      // Check if error is "No account found" (404 status)
      if (statusCode === 404 || errorMessage.toLowerCase().includes("no account found")) {
        setShowNoAccountModal(true);
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoToRegister = () => {
    setShowNoAccountModal(false);
    navigate("/register");
  };

  const handleCloseModal = () => {
    setShowNoAccountModal(false);
    setError("");
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row relative overflow-hidden">
      {/* Left Side - Image */}
      <div className="lg:w-1/2 h-64 lg:h-screen relative overflow-hidden">
        <img
          src={bgImage}
          alt="Fleet Operations"
          className="w-full h-full object-cover"
        />
        {/* Minimal tint on left, concentrated fade on right edge only */}
        <div className="absolute inset-0 bg-[#8B1E3F]/5"></div>
        <div className="absolute inset-y-0 right-0 w-12 bg-linear-to-r from-transparent to-[#FDF2F5] hidden lg:block"></div>
      </div>

      {/* Right Side - Form */}
      <div className="lg:w-1/2 h-screen overflow-y-auto bg-[#FDF2F5] animate-fadeIn relative">
        <div className="min-h-full flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md animate-slideInRight">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 lg:p-10 transition-all duration-300 hover:shadow-3xl">

            {/* Company Branding */}
            <div className="text-center mb-8 animate-fadeInScale">
              <img 
                src="/logo.png" 
                alt="FleetFlow Logo" 
                className="w-16 h-16 mx-auto mb-4 object-contain"
              />
              <h1 className="text-5xl font-bold mb-3 tracking-tight bg-linear-to-r from-[#8B1E3F] via-[#A52342] to-[#8B1E3F] bg-clip-text text-transparent animate-gradientFlow">
                FleetFlow
              </h1>
              <div className="h-1 w-20 bg-linear-to-r from-transparent via-[#8B1E3F] to-transparent mx-auto rounded-full mb-3"></div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">
                Fleet Management System
              </p>
            </div>

            {/* Header */}
            <div className="mb-8 animate-slideInDown">
              <h2 className="text-3xl font-bold text-[#8B1E3F] mb-2">
                Welcome Back
              </h2>
              <p className="text-sm text-gray-600">
                Secure access to fleet operations
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-shake">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Inputs */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="animate-slideInDown animation-delay-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="animate-slideInDown animation-delay-300">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-[1.02] animate-slideInUp animation-delay-400
                  ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#8B1E3F] hover:bg-[#751932] shadow-lg hover:shadow-xl"
                  }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>

              <p className="text-sm text-gray-600 text-center mt-6 animate-fadeIn animation-delay-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-[#8B1E3F] font-semibold hover:underline transition-all duration-200"
                >
                  Register
                </Link>
              </p>
            </form>

          </div>
        </div>
        </div>
      </div>

      {/* No Account Found Modal */}
      {showNoAccountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-slideInDown">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg 
                  className="w-8 h-8 text-red-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-3">
              No Account Found
            </h3>

            {/* Message */}
            <p className="text-gray-600 text-center mb-6">
              We couldn't find an account with email <span className="font-semibold text-[#8B1E3F]">{formData.email}</span>. 
              Would you like to create a new account?
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Try Again
              </button>
              <button
                onClick={handleGoToRegister}
                className="flex-1 px-4 py-3 bg-[#8B1E3F] text-white rounded-lg hover:bg-[#751932] transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
