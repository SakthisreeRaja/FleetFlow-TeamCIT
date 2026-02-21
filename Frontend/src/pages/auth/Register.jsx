import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../../assets/auth-bg.png"; // adjust if needed

function Register() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [showRoles, setShowRoles] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const roles = [
    "Manager",
    "Dispatcher",
    "Safety Officer",
    "Financial Analyst",
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowRoles(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRole && formData.fullName && formData.email && formData.password) {
      // Store user info in localStorage
      localStorage.setItem("userName", formData.fullName);
      localStorage.setItem("userRole", selectedRole);
      localStorage.setItem("isAuthenticated", "true");
      
      // Navigate to dashboard
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative">
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
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-[#FDF2F5] animate-fadeIn relative">
        <div className="w-full max-w-md animate-slideInRight">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 lg:p-10 transition-all duration-300 hover:shadow-3xl">

            {/* Company Branding */}
            <div className="text-center mb-8 animate-fadeInScale">
              <h1 className="text-5xl font-bold mb-3 tracking-tight bg-linear-to-r from-[#8B1E3F] via-[#A52342] to-[#8B1E3F] bg-clip-text text-transparent animate-gradientFlow">
                FleetFlow
              </h1>
              <div className="h-1 w-20 bg-linear-to-r from-transparent via-[#8B1E3F] to-transparent mx-auto rounded-full mb-3"></div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">
                Fleet Management System
              </p>
            </div>

            {/* Header with Role Selector */}
            <div className="flex justify-between items-start mb-8">
              <div className="animate-slideInDown">
                <h2 className="text-3xl font-bold text-[#8B1E3F] mb-2">
                  Create Account
                </h2>
                <p className="text-sm text-gray-600">
                  Request role-based access to the system
                </p>
              </div>

              {/* Role Selector - Top Right */}
              <div className="relative animate-slideInDown animation-delay-100">
                <button
                  type="button"
                  onClick={() => setShowRoles(!showRoles)}
                  className={`px-4 py-2 rounded-lg text-sm border transition-all duration-300 whitespace-nowrap
                    ${
                      selectedRole
                        ? "bg-[#8B1E3F] text-white border-[#8B1E3F] shadow-md"
                        : "bg-[#FDF2F5] text-[#8B1E3F] border-[#8B1E3F] hover:bg-[#8B1E3F] hover:text-white"
                    }`}
                >
                  {selectedRole ? selectedRole : "Role"}
                </button>

                {showRoles && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-xl z-10 overflow-hidden animate-slideInDown">
                    {roles.map((role, index) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => handleRoleSelect(role)}
                        className="w-full text-left px-4 py-3 hover:bg-[#FDF2F5] hover:text-[#8B1E3F] text-gray-700 transition-all duration-200 border-b border-gray-100 last:border-b-0"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Inputs */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="animate-slideInDown animation-delay-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="animate-slideInDown animation-delay-300">
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

              <div className="animate-slideInDown animation-delay-400">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                disabled={!selectedRole}
                className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-[1.02] animate-slideInUp animation-delay-500
                  ${
                    selectedRole
                      ? "bg-[#8B1E3F] hover:bg-[#751932] shadow-lg hover:shadow-xl"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
              >
                {selectedRole
                  ? `Register as ${selectedRole}`
                  : "Select Role to Continue"}
              </button>

              <p className="text-sm text-gray-600 text-center mt-6 animate-fadeIn animation-delay-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#8B1E3F] font-semibold hover:underline transition-all duration-200"
                >
                  Login
                </Link>
              </p>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;