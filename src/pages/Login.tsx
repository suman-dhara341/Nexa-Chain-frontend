import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuMail, LuLock, LuArrowRight, LuShieldCheck } from "react-icons/lu";
import { useLoginMutation } from "../features/auth/authApiSlice";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await login(credentials).unwrap();
      if (response.token) {
        localStorage.setItem("token", response.token);
      }
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Failed:", err);
    }
  };

  // --- TypeScript Error Handling ---
  const getErrorMessage = () => {
    if (!error) return null;
    if ("status" in error) {
      const errorData = error.data as { message?: string };
      return errorData?.message || "Invalid email or password.";
    } else {
      return error.message || "An unexpected error occurred.";
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#F8FAFC] overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* --- Premium Background Ambient Glows --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 gap-10 items-center z-10 px-6 sm:px-12 py-12">
        {/* --- Left Side: Branding & Info (Hidden on small screens) --- */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col pr-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 w-max mb-6">
            <LuShieldCheck size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Secure Portal
            </span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            Deploy Capital.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Maximize Returns.
            </span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-md leading-relaxed mb-8">
            Access your Nexa Chain node, track your matrix uplines, and monitor
            your daily ROI generation in real-time.
          </p>

          <div className="flex items-center gap-4 text-sm font-bold text-slate-400 uppercase tracking-widest">
            <span>Encrypted Connection</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>System Online</span>
          </div>
        </motion.div>

        {/* --- Right Side: Login Form Card --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md mx-auto lg:ml-auto"
        >
          {/* Glassmorphism Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white p-8 sm:p-10 relative overflow-hidden">
            {/* Soft inner glow */}
            <div className="text-center mb-10">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-slate-500 text-sm mt-2 font-medium">
                Log in to your secure dashboard
              </p>
            </div>

            {/* Error Message */}
            {isError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50/80 border border-red-100 rounded-2xl flex items-center justify-center text-center"
              >
                <p className="text-red-600 text-sm font-bold">
                  {getErrorMessage()}
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-600 text-slate-400">
                    <LuMail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300"
                    onChange={handleChange}
                    value={credentials.email}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-600 text-slate-400">
                    <LuLock size={18} />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300"
                    onChange={handleChange}
                    value={credentials.password}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end pt-2">
                <a
                  href="#"
                  className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Gradient Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full relative flex items-center justify-center gap-2 text-white font-bold py-4 px-4 rounded-2xl transition-all duration-300 mt-8 shadow-lg overflow-hidden group ${
                  isLoading
                    ? "bg-slate-300 cursor-not-allowed shadow-none"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0"
                }`}
              >
                {/* Button shine effect */}
                {!isLoading && (
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                )}

                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Access Dashboard{" "}
                    <LuArrowRight
                      className="group-hover:translate-x-1 transition-transform"
                      size={18}
                    />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-slate-500 text-sm font-medium">
                New to Nexa Chain?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 hover:text-blue-700 font-bold ml-1 transition-colors"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
