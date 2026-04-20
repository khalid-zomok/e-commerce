import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import { getAllCategories } from "@/api/services/routemisr.service";
import Image from "next/image";
export default async function HomeCategories() {
  const allCategories = await getAllCategories();

  return (
    <>
      <div className="flex justify-between">
        <h1 className="flex items-center px-4 my-8 text-4xl font-bold gap-3">
          <div className="w-2 h-10 rounded-full bg-linear-to-b from-[#0AAD0A] to-[#065f06]" />

          <div className="ps-1">
            Shop By
            <span className="ml-2 bg-linear-to-r from-[#0AAD0A] to-[#065f06] bg-clip-text text-transparent">
              Category
            </span>
          </div>
        </h1>
        <Link
          href={"/categories"}
          className="text-[#0AAD0A] mx-2 text-lg hover:text-[#067606]  cursor-pointer  flex gap-2 items-center "
        >
          View All Categories <FaArrowRightLong />
        </Link>
      </div>
      <div className="flex flex-wrap w-full my-8 px-2 justify-start mx-auto">
        {allCategories?.map((category) => (
          <div
            key={category._id}
            /* Child: Added p-1 (padding) to create space between cards without breaking the w-1/6 math */
            className="flex flex-col items-center justify-center p-1 w-1/2 md:w-1/3 lg:w-1/6"
          >
            {/* Internal Wrapper: This handles the border and shadow */}
            <div className="flex flex-col items-center justify-center w-full p-4 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-white">
              {/* Circular Image Container */}
              <div className="w-15 h-15 md:w-20 md:h-20 rounded-full bg-gray-50 flex items-center justify-center mb-3 overflow-hidden">
                <Image
                  width={200}
                  height={200}
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Category Name */}
              <h1 className="text-gray-700 font-medium text-sm text-center line-clamp-1">
                {category.name}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
