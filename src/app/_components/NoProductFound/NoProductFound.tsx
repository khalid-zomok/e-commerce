import React from 'react';
import { LuPackageOpen } from 'react-icons/lu';
import Link from 'next/link';

export default function NoProductFound(){
  return (
    <div className="bg-white p-8 rounded-xl w-full min-h-125">
      <div className="flex flex-col items-center justify-center text-center gap-4 min-h-75">
        
        {/* Icon Container */}
        <div className="flex items-center justify-center w-20 h-20 bg-slate-50 rounded-full mb-2">
          <LuPackageOpen className="text-4xl text-slate-500" />
        </div>
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          No Products Found
        </h2>
        
        {/* Subtitle */}
        <p className="text-sm text-slate-600 max-w-sm">
          No products match your current filters.
        </p>
        
        {/* Primary Action Button */}
        <Link href={"/shop"} className="mt-6 px-10 py-3 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition duration-150 ease-in-out shadow-sm">
          View All Products
        </Link>
      </div>
    </div>
  );
};
