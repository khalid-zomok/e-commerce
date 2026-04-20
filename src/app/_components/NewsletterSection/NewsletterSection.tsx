import React, { ElementType } from 'react';
// Importing from Material Design, Font Awesome, and IonIcons
import { MdEmail, MdOutlineDeliveryDining, MdOutlineLabel } from 'react-icons/md';
import { FaLeaf, FaArrowRight, FaApple, FaGooglePlay, FaStar } from 'react-icons/fa';
import { IoMdPhonePortrait } from 'react-icons/io';

export interface BadgeProps {
  icon: ElementType;
  text: string;
}

const Badge = ({ icon: Icon, text }: BadgeProps) => (
  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm text-sm font-semibold text-gray-700">
    <div className="bg-emerald-50 p-1.5 rounded-full">
      <Icon className="text-emerald-600 text-sm" />
    </div>
    {text}
  </div>
);

const AppButton = ({ icon: Icon, store, action }: { icon: ElementType, store: string, action: string }) => (
  <button className="w-full flex items-center gap-4 bg-[#212b36] hover:bg-[#2c3846] border border-gray-700 p-4 rounded-2xl transition-all text-left group">
    <Icon className="text-3xl text-white group-hover:scale-110 transition-transform" />
    <div>
      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tight">{action}</p>
      <p className="text-lg font-bold leading-tight">{store}</p>
    </div>
  </button>
);
export default function NewsletterSection() {
  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <div className="bg-[#f0f9f6] rounded-[40px] overflow-hidden flex flex-col lg:flex-row gap-8 p-8 lg:p-12 items-center">
        
        {/* Left Side: Newsletter Content */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <div className="bg-[#00b289] p-3 rounded-2xl text-white shadow-lg shadow-emerald-200">
              <MdEmail size={28} />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest text-[#00b289] uppercase">Newsletter</p>
              <p className="text-xs text-gray-500 font-medium">50,000+ subscribers</p>
            </div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1a2b3c] leading-[1.1]">
            Get the Freshest Updates <br />
            <span className="text-[#00b289]">Delivered Free</span>
          </h2>

          <p className="text-gray-500 text-lg font-medium">
            Weekly recipes, seasonal offers & exclusive member perks.
          </p>

          <div className="flex flex-wrap gap-3">
            <Badge icon={FaLeaf} text="Fresh Picks Weekly" />
            <Badge icon={MdOutlineDeliveryDining} text="Free Delivery Codes" />
            <Badge icon={MdOutlineLabel} text="Members-Only Deals" />
          </div>

          <form className="relative max-w-md mt-8">
            <div className="flex gap-2 bg-white p-2 rounded-3xl border border-emerald-100 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500/20 transition-shadow">
              <input 
                type="email" 
                placeholder="you@example.com"
                className="flex-1 bg-transparent px-4 py-2 outline-none text-gray-700 placeholder:text-gray-400"
              />
              <button className="bg-[#00b289] text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#009a76] transition-all active:scale-95">
                Subscribe <FaArrowRight />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-3 flex items-center gap-1 ml-2">
              <span className="text-orange-400">★</span> Unsubscribe anytime. No spam, ever.
            </p>
          </form>
        </div>

        {/* Right Side: App Promotion Card */}
        <div className="w-full lg:w-100 bg-[#141d26] rounded-[32px] p-8 text-white relative shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[60px] rounded-full" />
          
          <div className="inline-flex items-center gap-2 bg-[#1a2b3c] border border-gray-700 px-3 py-1.5 rounded-full text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-6">
            <IoMdPhonePortrait className="text-sm" /> Mobile App
          </div>

          <h3 className="text-2xl font-bold mb-4">Shop Faster on Our App</h3>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Get app-exclusive deals & 15% off your first order.
          </p>

          <div className="space-y-4">
            <AppButton icon={FaApple} store="App Store" action="Download on" />
            <AppButton icon={FaGooglePlay} store="Google Play" action="Get it on" />
          </div>

          <div className="mt-8 flex items-center gap-2">
            <div className="flex text-yellow-500 gap-0.5">
              {[...Array(5)].map((_, i) => <FaStar key={i} size={12} />)}
            </div>
            <span className="text-xs font-bold text-gray-300">4.9 · 100K+ downloads</span>
          </div>
        </div>

      </div>
    </div>
  );
}
