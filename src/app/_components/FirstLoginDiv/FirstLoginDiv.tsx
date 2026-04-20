import React from 'react';
import Image from 'next/image';
import login_photo from '../../../assets/images/login_photo.png';
// Importing specific icons from Tabler Icons set
import { FaClock, FaShieldAlt, FaTruck } from 'react-icons/fa';

const FEATURES = [
  { 
    icon: <FaTruck  className="text-xl" />, 
    label: "Free Delivery" 
  },
  { 
    icon: <FaShieldAlt  className="text-xl" />, 
    label: "Secure Payment" 
  },
  { 
    icon: <FaClock  className="text-xl" />, 
    label: "24/7 Support" 
  },
];

export default function FirstLoginDiv() {
  return (
    // Centered flexbox, padding matched to image
    <div className="hidden lg:flex flex-col items-center justify-center w-full px-2 font-sans">
      
      {/* Illustration Section */}
      <div className="relative w-full rounded-3xl shadow">
        <Image 
          src={login_photo} 
          alt="FreshCart Grocery Basket" 
          className="w-full h-96 object-cover"
          priority
        />
      </div>

      {/* Text Section */}
      <div className="text-center mt-12 w-full max-w-md">
        {/* Darker header, matched font size and weight */}
        <h2 className="text-3xl font-extrabold text-slate-900 leading-snug">
          FreshCart - Your One-Stop Shop for Fresh Products
        </h2>
        {/* Lighter description with line height */}
        <p className="text-slate-500 mt-5 mb-12 max-w-sm mx-auto leading-relaxed text-base">
          Join thousands of happy customers who trust FreshCart for their daily grocery needs.
        </p>

        {/* Feature List */}
        <div className="flex items-center justify-center gap-7 pt-2 border-t border-gray-50 max-w-sm mx-auto">
          {FEATURES.map((feature) => (
            <div 
              key={feature.label} 
              className="flex items-center gap-2.5 text-sm font-semibold text-slate-700"
            >
              {/* Feature icons are styled directly */}
              <div className="text-[#0AAD0A]">
                {feature.icon}
              </div>
              <span className="text-[#334155]">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}