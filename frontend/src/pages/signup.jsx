import React, { useState } from 'react';
import {useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Briefcase, ArrowRight } from 'lucide-react';
import { Singup } from "../services/authApi"
import toast from "react-hot-toast"

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async() => {
    try {
      await Singup({
      name,
      email,
      password
    });

    toast.success("Singup successfully");
    navigate("/login");
    
    } catch (error) {
      console.log(error);
      toast.error("something is incorrect");
    }
  };

  return (
    // 1. Full Page Wrapper (Matching Mesh Gradient)
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 p-4 relative overflow-hidden">
      
      {/* Decorative Blur Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />

      {/* 2. Central Card */}
      <div className="w-full max-w-lg bg-white/[0.06] backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl z-10 my-8">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 mb-4 shadow-lg shadow-indigo-500/20">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Create your account</h2>        
        </div>

        {/* Divider */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-white/10"></div>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {/* 3. SignUp Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          
          {/* Two Column Input for Name & Company (CRM specific) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full bg-slate-900/50 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white rounded-xl pl-10 pr-4 py-2 text-sm outline-none transition"
                  required
                />
              </div>
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="email" 
                placeholder="john@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}  
                className="w-full bg-slate-900/50 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white rounded-xl pl-10 pr-4 py-2 text-sm outline-none transition"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder=" 6 characters" 
                value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                className="w-full bg-slate-900/50 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white rounded-xl pl-10 pr-10 py-2 text-sm outline-none transition"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium py-2.5 px-4 rounded-xl transition duration-200 shadow-lg shadow-indigo-500/20 text-sm group mt-2"
          >
            Create Free Account
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition">Sign In</Link>
        </p>

      </div>
    </div>
  );
}