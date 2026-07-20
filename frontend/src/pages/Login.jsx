import React, { useState} from 'react';
import {useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast"

const Login = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [ password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login({
        email,
        password
      });

      toast.success("login successfully!")
      navigate("/");

    } catch (error) {
      console.log(error);
      toast.error("something is incorrect");
    }
  }


  return (
    // 1. Full Page Wrapper with Modern Mesh Gradient Background
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 p-4 relative overflow-hidden">
      
      {/* Decorative Blur Blobs for Premium Aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />

      {/* 2. Central Card (Glassmorphic Effect) */}
      <div className="w-full max-w-md bg-white/[0.06] backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl z-10">
        
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 mb-4 shadow-lg shadow-indigo-500/20">
            {/* Replace with your CRM Logo Icon */}
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <h2 className="text-2xzl font-bold text-white tracking-tight">Welcome back</h2>
          <p className="text-slate-400 text-sm mt-1">Enter your details to access your CRM</p>
        </div>

        {/* Divider */}
        <div className="relative flex py-6 items-center">
          <div className="flex-grow border-t border-white/10"></div>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {/* 4. Login Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          
          {/* Email Input */}
          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none transition"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider">Password</label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white rounded-xl pl-11 pr-11 py-2.5 text-sm outline-none transition"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium py-2.5 px-4 rounded-xl transition duration-200 shadow-lg shadow-indigo-500/20 text-sm group"
          >
            Sign In to Dashboard
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Don't have an account?{' '}
          <Link to="/signup"  className="text-indigo-400 hover:text-indigo-300 font-medium transition">Create one</Link>
        </p>

      </div>
    </div>
  );
}

export default Login