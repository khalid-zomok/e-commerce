import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import FeaturesProducts from "../_components/FeaturesProducts/FeaturesProducts";

export default function page() {
  return (
    <>
      <div className="w-full h-auto p-12 bg-linear-to-l from-green-500 to-green-600 shadow-sm text-white">
        {/* 1. Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-green-100 mb-6">
          <Breadcrumb>
            <BreadcrumbList className="text-slate-300 text-md">
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-slate-300 hover:text-white"
                  href="/"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              /
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  All Products
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* 2. Main Title and Subtitle Area */}
        <div className="flex items-center gap-6">
          {/* Icon Container with subtle white opacity */}
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <svg
              width="35"
              height="31"
              viewBox="0 0 35 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31.544 14.0933C32.1534 14.7847 33.2022 14.937 33.9932 14.4155C34.8545 13.8413 35.0889 12.6753 34.5147 11.814L31.7022 7.59521C31.5381 7.34912 31.3155 7.14404 31.0518 6.99756L19.3038 0.470215C18.1729 -0.156738 16.796 -0.156738 15.6592 0.470215L3.91705 6.9917C3.60064 7.16748 3.34869 7.42529 3.17877 7.7417L0.336971 13.0093C-0.401311 14.3804 0.114314 16.0854 1.48541 16.8237L3.419 17.8608V20.9839C3.419 22.3315 4.14556 23.5796 5.31744 24.2476L15.6299 30.0894C16.7784 30.7397 18.1788 30.7397 19.3272 30.0894L29.6397 24.2476C30.8174 23.5796 31.5381 22.3374 31.5381 20.9839V14.0991L31.544 14.0933ZM17.4815 13.519L8.68658 8.63232L17.4815 3.74561L26.2764 8.63232L17.4815 13.519ZM15.0499 16.4605L13.8018 19.1675L4.08697 13.9644L5.57525 11.1987L15.0499 16.4605Z"
                fill="white"
              />
            </svg>
          </div>

          {/* Text Content */}
          <div>
            <h1 className="text-4xl font-bold leading-tight">All Products</h1>
            <p className="text-green-100 text-sm mt-2 font-light">
              Explore our complete product collection
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="px-4 pt-2 text-slate-600 ">Showing 40 products</p>
        <FeaturesProducts />
      </div>
    </>
  );
}
