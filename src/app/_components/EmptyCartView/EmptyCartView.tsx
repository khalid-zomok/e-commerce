"use client";

import React from "react";
import Link from "next/link";
// Importing the relevant React Icons
import { FiArrowRight } from "react-icons/fi";
import { LuPackageOpen } from "react-icons/lu";

export default function EmptyCartView() {
  // To simulate the 'Popular Categories' data

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6 bg-gray-50/50 rounded-2xl border border-gray-100/70">
      {/* 1. The Large, Subtle Circle Icon */}
      <div className="flex items-center justify-center w-32 h-32 mb-10 rounded-full bg-gray-100 shadow-inner">
        {/* Utilizing FiPackage with a very soft grey and thick weight */}
        <LuPackageOpen  size={56} strokeWidth={1.5} className="text-gray-300" />
      </div>

      {/* 2. Primary Heading */}
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
        Your cart is empty
      </h1>

      {/* 3. Sub-text Description */}
      <p className="text-lg text-gray-500 max-w-md leading-relaxed mb-10">
        Looks like you haven&apos;t added anything to your cart yet.
        <br />
        Start exploring our products!
      </p>

      {/* 4. Action Button with dynamic hover and shadow */}
      <Link href="/">
        <button className="flex cursor-pointer items-center gap-3 px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-green-200 transition-all duration-300">
          <span>Start Shopping</span>
          <FiArrowRight size={20} className="stroke-3" />
        </button>
      </Link>

      {/* 5. Horizontal Divider */}
      <div className="w-full max-w-2xl border-t border-gray-100 my-16"></div>

      {/* 6. Footer section (Popular Categories) */}
      <div className="w-full max-w-2xl text-center">
        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
          Popular Categories
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/shop/6439d2d167d9aa4ca970649f">
            <span className="cursor-pointer px-6 py-2.5 bg-gray-100 hover:bg-green-100 text-gray-700 font-medium text-sm rounded-full transition-colors duration-200 shadow-sm hover:shadow">
              Electronics
            </span>
          </Link>
          <Link href="/shop/6439d58a0049ad0b52b9003f">
            <span className="cursor-pointer px-6 py-2.5 bg-gray-100 hover:bg-green-100 text-gray-700 font-medium text-sm rounded-full transition-colors duration-200 shadow-sm hover:shadow">
              {"Women's Fashion"}
            </span>
          </Link>
          <Link href="/shop/6439d5b90049ad0b52b90048">
            <span className="cursor-pointer px-6 py-2.5 bg-gray-100 hover:bg-green-100 text-gray-700 font-medium text-sm rounded-full transition-colors duration-200 shadow-sm hover:shadow">
              {"Men's Fashion"}
            </span>
          </Link>
          <Link href="/shop/6439d30b67d9aa4ca97064b1">
            <span className="cursor-pointer px-6 py-2.5 bg-gray-100 hover:bg-green-100 text-gray-700 font-medium text-sm rounded-full transition-colors duration-200 shadow-sm hover:shadow">
              Beauty
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
