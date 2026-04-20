"use client"
import React from 'react';
import Link from 'next/link';
import { HiOutlineArrowLeft, HiOutlineHome, HiOutlineShoppingCart } from 'react-icons/hi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fcfefd] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decorative Elements (The floating veggies) */}
      <div className="absolute top-20 left-[15%] opacity-20 rotate-12 text-4xl">🍏</div>
      <div className="absolute bottom-40 left-[10%] opacity-20 -rotate-12 text-3xl">🍋</div>
      <div className="absolute top-40 right-[15%] opacity-20 rotate-45 text-4xl">🥕</div>
      <div className="absolute bottom-20 right-[20%] opacity-20 -rotate-12 text-3xl">🌱</div>

      {/* Main Illustration Area */}
      <div className="relative mb-12">
        <div className="bg-white p-10 rounded-[32px] shadow-sm border border-emerald-50/50 relative">
          <HiOutlineShoppingCart className="text-[#00b289] text-7xl" />
          {/* 404 Badge */}
          <div className="absolute -top-4 -right-4 bg-[#00b289] text-white font-black px-4 py-2 rounded-full text-xl shadow-lg border-4 border-white">
            404
          </div>
        </div>
        {/* Animated dots/smile below icon */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-2 h-2 rounded-full bg-emerald-200" />
          <div className="w-6 h-2 rounded-full bg-[#00b289] opacity-40" />
          <div className="w-2 h-2 rounded-full bg-emerald-200" />
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center max-w-lg mb-10">
        <h1 className="text-5xl font-black text-[#1a2b3c] mb-4 tracking-tight">
          Oops! Nothing Here
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed">
          Looks like this page went out of stock! Don't worry, <br className="hidden md:block" />
          there's plenty more fresh content to explore.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Link 
          href="/" 
          className="flex items-center gap-2 bg-[#00b289] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-[#009a76] hover:-translate-y-1 transition-all"
        >
          <HiOutlineHome size={20} />
          Go to Homepage
        </Link>
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 bg-white text-[#1a2b3c] border border-gray-100 px-8 py-4 rounded-2xl font-bold shadow-sm hover:bg-gray-50 hover:-translate-y-1 transition-all"
        >
          <HiOutlineArrowLeft size={20} />
          Go Back
        </button>
      </div>

      {/* Popular Destinations Tray */}
      <div className="bg-white/60 backdrop-blur-sm border border-gray-100 p-8 rounded-[40px] w-full max-w-2xl">
        <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">
          Popular Destinations
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <DestinationTab label="All Products" active />
          <DestinationTab label="Categories" />
          <DestinationTab label="Today's Deals" />
          <DestinationTab label="Contact Us" />
        </div>
      </div>
    </div>
  );
}

// Sub-component for the bottom tags
const DestinationTab = ({ label, active = false }: { label: string; active?: boolean }) => (
  <Link 
    href="#" 
    className={`px-6 py-3 rounded-xl text-sm font-bold transition-colors ${
      active 
        ? 'bg-emerald-50 text-[#00b289]' 
        : 'bg-gray-100/50 text-gray-600 hover:bg-gray-200/50'
    }`}
  >
    {label}
  </Link>
);