import { getAllCategories } from "@/api/services/routemisr.service";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default async function AllCategories() {
  const categories = await getAllCategories();
  return (
    <>
      <div className="flex flex-wrap gap-y-4 mx-3 my-6">
        {categories?.map((item) => (
          <Link
            href={`/categories/${item._id}`}
            key={item._id}
            className="group cursor-pointer px-2 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 transition-all duration-300"
          >
            <div className="rounded-2xl shadow-xl border p-4 flex justify-center items-center flex-col hover:shadow-lg bg-white h-full">
              <div className="p-3 rounded-2xl h-50  overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.slug}
                  height={200}
                  width={200}
                  // Added object-cover to keep the aspect ratio professional
                  className="rounded-2xl transition-transform duration-300 group-hover:scale-110 object-cover w-full h-auto"
                  // Optional: adds a smooth blur while the image loads
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,..."
                />
              </div>

              <h1 className="font-bold text-center group-hover:text-green-500 duration-300">
                {item.name}
              </h1>

              <p className="flex gap-2 items-center text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                view Subcategories <FaArrowRight />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
