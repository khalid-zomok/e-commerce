import React from 'react'
import {BiSupport } from "react-icons/bi";
import { FaTruck } from 'react-icons/fa';
import { FaArrowRotateLeft } from 'react-icons/fa6';
import { MdOutlineSecurity } from "react-icons/md"

export default function UpperFooter() {
  const features = [
    { icon: <FaTruck />, title: "Free Shipping", desc: "On orders over 500 EGP" },
    { icon: <FaArrowRotateLeft  />, title: "Easy Returns", desc: "14-day return policy" },
    { icon: <MdOutlineSecurity />, title: "Secure Payment", desc: "100% secure checkout" },
    { icon: <BiSupport />, title: "24/7 Support", desc: "Contact us anytime" },
  ];

  return (
    <div className="bg-[#f0f9f0] py-5 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="text-[#0AAD0A] bg-[#0AAD0A]/10 p-4 rounded-2xl text-xl">
              {f.icon}
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-md">{f.title}</h4>
              <p className="text-sm font-semibold text-slate-500 ">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
