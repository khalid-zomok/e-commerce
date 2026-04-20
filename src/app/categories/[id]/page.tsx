import React from "react";
import {
  getAllSubCategories,
  getSingleCategories,
} from "@/api/services/routemisr.service";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaFolderOpen } from "react-icons/fa";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const singleCategories = await getSingleCategories(id);
  const allSubCategories = await getAllSubCategories();
  

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
                <BreadcrumbLink
                  className="text-slate-300 hover:text-white"
                  href="/categories"
                >
                  Categories
                </BreadcrumbLink>
              </BreadcrumbItem>
              /
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  {singleCategories?.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* 2. Main Title and Subtitle Area */}
        <div className="flex items-center gap-6">
          {/* Icon Container with subtle white opacity */}
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <img
              width="30"
              height="30"
              src={singleCategories?.image}
              alt={singleCategories?.name}
            />
          </div>

          {/* Text Content */}
          <div>
            <h1 className="text-4xl font-bold leading-tight">
              {singleCategories?.name}
            </h1>
            <p className="text-green-100 text-sm mt-2 font-light">
              Choose a subcategory to browse products
            </p>
          </div>
        </div>
      </div>

      <Link
        className=" flex items-center gap-2 m-4 text-lg text-slate-600 hover:text-green-500"
        href={"/categories"}
      >
        <FaArrowLeft /> Back to Categories
      </Link>
      <h1 className="m-4 text-xl font-bold">
        {"40 Subcategories in Men's Fashion"}
      </h1>
      <div className="flex flex-wrap gap-4 p-4">
        {allSubCategories?.map((item) => (
          <div
            key={item._id}
            className="group grow shrink-0 w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(25%-1rem)] p-6 bg-white border border-slate-100 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-md hover:-translate-y-2 flex flex-col gap-4 cursor-pointer"
          >
            {/* Icon Container */}
            <div className="w-12 h-12 rounded-lg bg-green-50 flex justify-center items-center text-green-600 transition-colors duration-300 group-hover:bg-green-100 ">
              <FaFolderOpen size={24} />
            </div>

            {/* Text Content */}
            <div>
              <h3 className="font-bold text-slate-800 transition-colors duration-300 group-hover:text-green-600">
                {item.name}
              </h3>

              {/* Appear on Hover Link */}
              <p className="flex items-center gap-2 text-sm text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                Browse Products <FaArrowRight size={12} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
