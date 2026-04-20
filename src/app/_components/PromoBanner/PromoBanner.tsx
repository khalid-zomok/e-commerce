import React from "react";
import { ArrowRight } from "lucide-react"; // Optional: for the arrow icon
import { PromoBannerPropsType } from "@/api/types/product.type";

export default function PromoBanner({
  tag,
  title,
  description,
  discount,
  code,
  buttonText,
  gradientClass,
  tagIcon,
}: PromoBannerPropsType) {
  return (
    <div
      className={`relative overflow-hidden w-1/2 rounded-2xl p-8 text-white shadow-lg ${gradientClass} flex flex-col justify-between min-h-70`}
    >
      {/* Background Decorative Circles */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full" />
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white opacity-10 rounded-full" />

      <div className="relative z-10">
        {/* Tag Label */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium mb-4">
          {tagIcon}
          {tag}
        </div>

        {/* Content */}
        <h2 className="text-3xl font-bold mb-2 leading-tight">{title}</h2>
        <p className="text-white/80 text-sm mb-6 max-w-60">
          {description}
        </p>

        {/* Discount Section */}
        <div className="flex items-baseline gap-3 mb-8">
          <span className="text-4xl font-black">{discount}</span>
          <span className="text-xs uppercase tracking-wider opacity-90">
            Use code: <span className="font-bold">{code}</span>
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button className="relative z-10 w-fit flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors">
        {buttonText}
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
