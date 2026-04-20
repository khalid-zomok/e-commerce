import React from 'react'

export default function loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 animate-pulse">
      {/* 1. Hero Slider Skeleton */}
      <div className="w-full h-75 md:h-112.5 bg-gray-200 rounded-3xl mb-10" />

      {/* 2. Feature Bar Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-2xl" />
        ))}
      </div>

      {/* 3. Category Header Skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-2 h-10 bg-gray-200 rounded-full" />
          <div className="w-48 h-8 bg-gray-200 rounded-md" />
        </div>
        <div className="w-32 h-6 bg-gray-200 rounded-md" />
      </div>

      {/* 4. Category Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col items-center p-6 border border-gray-100 rounded-xl">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200 mb-4" />
            <div className="w-20 h-4 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}