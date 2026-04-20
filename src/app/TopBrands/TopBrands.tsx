import { Brand } from "@/api/types/product.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function TopBrands({ Brands }: { Brands: Brand[] | undefined }) {
  return (
    <>
      <div className="flex flex-wrap gap-y-4 my-4">
        {Brands?.map((item) => (
          <Link
            href={`/brands/${item._id}`}
            key={item._id}
            className="group px-2 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 transition-all duration-300"
          >
            <div className="rounded-2xl shadow p-4 flex justify-center items-center flex-col hover:shadow-lg bg-white h-full">
              <div className="p-3 rounded-2xl bg-slate-50 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.slug}
                  height={200}
                  width={200}
                  className="rounded-2xl transition-transform duration-300 group-hover:scale-110 object-cover w-full h-auto"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,..."
                />
              </div>

              <h1 className="font-bold text-center py-2 mt-2">{item.name}</h1>

              <p className="flex py-2 gap-2 items-center text-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                view Product <FaArrowRight />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
