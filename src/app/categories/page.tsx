import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import AllCategories from "../_components/AllCategories/AllCategories";

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
                  Categories
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
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.623 0.303223C14.4961 -0.101074 15.5039 -0.101074 16.377 0.303223L29.1855 6.22119C29.6836 6.44971 30 6.94775 30 7.49854C30 8.04932 29.6836 8.54736 29.1855 8.77588L16.377 14.6938C15.5039 15.0981 14.4961 15.0981 13.623 14.6938L0.814453 8.77588C0.316406 8.5415 0 8.04346 0 7.49854C0 6.95361 0.316406 6.44971 0.814453 6.22119L13.623 0.303223ZM2.81836 12.7954L12.4453 17.2427C14.0684 17.9927 15.9375 17.9927 17.5605 17.2427L27.1875 12.7954L29.1855 13.7212C29.6836 13.9497 30 14.4478 30 14.9985C30 15.5493 29.6836 16.0474 29.1855 16.2759L16.377 22.1938C15.5039 22.5981 14.4961 22.5981 13.623 22.1938L0.814453 16.2759C0.316406 16.0415 0 15.5435 0 14.9985C0 14.4536 0.316406 13.9497 0.814453 13.7212L2.8125 12.7954H2.81836ZM0.814453 21.2212L2.8125 20.2954L12.4395 24.7427C14.0625 25.4927 15.9316 25.4927 17.5547 24.7427L27.1816 20.2954L29.1797 21.2212C29.6777 21.4497 29.9941 21.9478 29.9941 22.4985C29.9941 23.0493 29.6777 23.5474 29.1797 23.7759L16.3711 29.6938C15.498 30.0981 14.4902 30.0981 13.6172 29.6938L0.814453 23.7759C0.316406 23.5415 0 23.0435 0 22.4985C0 21.9536 0.316406 21.4497 0.814453 21.2212Z"
                fill="white"
              />
            </svg>
          </div>

          {/* Text Content */}
          <div>
            <h1 className="text-4xl font-bold leading-tight">All Categories</h1>
            <p className="text-green-100 text-sm mt-2 font-light">
              Browse our wide range of product categories
            </p>
          </div>
        </div>
      </div>
      <div>
        <AllCategories />
      </div>
    </>
  );
}
