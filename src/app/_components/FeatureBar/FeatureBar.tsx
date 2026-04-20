import React from 'react';
import { BiSupport } from 'react-icons/bi';
import { FaShieldAlt, FaTruck } from 'react-icons/fa';
import { FaArrowRotateLeft } from 'react-icons/fa6';

const features = [
  {
    icon: <FaTruck size={20} className="text-[#0D6EFD]" />,
    title: "Free Shipping",
    description: "On orders over 500 EGP",
    bgColor: "bg-[#E7F1FF]" // Soft Blue
  },
  {
    icon: <FaShieldAlt  size={20} className="text-[#198754]" />,
    title: "Secure Payment",
    description: "100% secure transactions",
    bgColor: "bg-[#E8F5E9]" // Soft Green
  },
  {
    icon: <FaArrowRotateLeft size={20} className="text-[#FD7E14]" />,
    title: "Easy Returns",
    description: "14-day return policy",
    bgColor: "bg-[#FFF4E6]" // Soft Orange
  },
  {
    icon: <BiSupport size={20} className="text-purple-500 " />,
    title: "24/7 Support",
    description: "Dedicated support team",
    bgColor: "bg-[#F3E5F5]" // Soft Purple
  }
];

export default function FeatureBar() {
  return (
    <div className="w-full py-5 px-4 bg-slate-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, index) => (
          <div 
            key={index}
            className="flex bg-white items-center p-4 rounded-2xl text-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Icon Container with dynamic background */}
            <div className={`w-10 h-10 ${item.bgColor} rounded-full flex items-center justify-center shrink-0 mr-4`}>
              {item.icon}
            </div>

            {/* Text details */}
            <div className="flex flex-col">
              <span className="font-bold text-gray-800 text-[15px]">
                {item.title}
              </span>
              <span className="text-gray-500 text-xs mt-0.5">
                {item.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}