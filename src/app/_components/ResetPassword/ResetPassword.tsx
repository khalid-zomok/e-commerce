import React from 'react';
import { MdEmail } from "react-icons/md"; // For Secure Reset
import { FaLock, FaShieldAlt } from 'react-icons/fa';

export default function ResetPassword() {

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white h-full">
      {/* 1. Main Illustration Container */}
      <div className="relative w-full  aspect-4/3 bg-[#EFFFF6] rounded-[2rem] flex items-center justify-center overflow-hidden mb-10 shadow-sm">
        {/* Background Decorative Circles */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#D7F9E8] rounded-full opacity-60" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#D7F9E8] rounded-full opacity-60" />
        
        {/* Floating Icons (Illustration Part) */}
        <div className="relative flex items-center gap-4 z-10">
          {/* Left Mini Card */}
          <div className="bg-white p-4 rounded-2xl shadow-md -rotate-12 translate-y-4">
            <MdEmail className="text-emerald-500 text-3xl" />
          </div>
          
          {/* Center Main Card */}
          <div className="bg-white p-6 rounded-[1.5rem] shadow-xl scale-110 z-20 border-4 border-[#EFFFF6]">
            <FaLock className="text-emerald-600 text-5xl" />
          </div>
          
          {/* Right Mini Card */}
          <div className="bg-white p-4 rounded-2xl shadow-md rotate-12 translate-y-4">
            <FaShieldAlt  className="text-emerald-500 text-3xl" />
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="absolute bottom-8 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-200" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-200" />
        </div>
      </div>

      {/* 2. Text Content */}
      <div className="text-center max-w-sm">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-4">
          Reset Your Password
        </h2>
        <p className="text-slate-500 leading-relaxed mb-8">
          {"Don't worry, it happens to the best of us. We'll help you get back into your account in no time."}
        </p>
      </div>

      {/* 3. Features List */}
      <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-600">
        <div className="flex items-center gap-2">
          <MdEmail className="text-emerald-500 text-lg" />
          <span>Email Verification</span>
        </div>
        <div className="flex items-center gap-2">
          <FaShieldAlt className="text-emerald-500 text-lg" />
          <span>Secure Reset</span>
        </div>
        <div className="flex items-center gap-2">
          <FaLock className="text-emerald-500 text-lg" />
          <span>Encrypted</span>
        </div>
      </div>
    </div>
  );
};