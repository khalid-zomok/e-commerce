import React from 'react'
import Link from "next/link";
import { FaRegHeart, FaArrowRight } from "react-icons/fa";
export default function EmptyWishlist() {
 return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl">
      {/* Icon Container */}
      <div className="bg-gray-50 p-8 rounded-[2.5rem] mb-6 border border-gray-100/50">
        <FaRegHeart className="text-gray-300 text-5xl" />
      </div>

      {/* Typography Section */}
      <h2 className="text-2xl font-extrabold text-[#1A1C1E] mb-2">
        Your wishlist is empty
      </h2>
      <p className="text-gray-400 font-medium mb-10 text-sm md:text-base">
        Browse products and save your favorites here.
      </p>

      {/* Call to Action Button */}
      <Link
        href="/products"
        className="bg-[#0AAD0A] hover:bg-green-700 text-white font-bold py-4 px-10 rounded-2xl flex items-center gap-3 transition-all duration-300 shadow-lg shadow-green-100 group"
      >
        <span>Browse Products</span>
        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
      </Link>
    </div>
  );
}
