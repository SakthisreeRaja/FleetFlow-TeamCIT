import { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../../assets/auth-bg.png"; // adjust if needed

function Register() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showRoles, setShowRoles] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Image */}
      <div className="lg:w-1/2 h-64 lg:h-screen relative overflow-hidden group">
        <img
          src={bgImage}
          alt="Fleet Operations"
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#8B1E3F]/20 to-transparent"></div>
      </div>

      {/* Right Side - Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gray-50 animate-fadeIn">
        <div className="w-full max-w-md animate-slideInRight">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 lg:p-10 transition-all duration-300 hover:shadow-3xl">

            {/* Header with Role Selector */}
            <div className="flex justify-between items-start mb-8">
              <div className="animate-slideInDown">
                <h2 className="text-3xl font-bold text-[#8B1E3F] mb-2">
                  FleetFlow User Onboarding
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
            <div className="space-y-5">
              <div className="animate-slideInDown animation-delay-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="animate-slideInDown animation-delay-300">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="animate-slideInDown animation-delay-400">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all duration-300"
                />
              </div>

              <button
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
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;