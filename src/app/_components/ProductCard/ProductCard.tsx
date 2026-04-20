import { ProductType } from "@/api/types/product.type";
import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import {  FiPlus } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import AddButton from "../AddButton/AddButton";
import { Check } from "lucide-react";
import HoverActionBar from "../HoverActionBar/HoverActionBar";
export default function ProductCard({
  product,
}: {
  product: ProductType | undefined;
}) {
  if (!product) return null;

  const separateDecimal = (num: number) => {
    // 1. Get the whole number (the 4)
    const whole = Math.floor(num);

    // 2. Get the decimal part and convert to a whole number (the 3)
    // We use .toFixed(1) to avoid floating point math errors (like 0.30000004)
    const decimalPart = (num - whole).toFixed(1);
    const fractional = Math.round(parseFloat(decimalPart) * 10);

    return { whole, fractional };
  };
  const setRatingStar = (rating: number) => {
    const { whole, fractional } = separateDecimal(rating);
    const emptyStars = 5 - whole - (fractional >= 5 ? 1 : 0);
    return (
      <div className="flex text-yellow-400">
        {[...Array(whole)].map((_, i) => (
          <FaStar key={`full-${i}`} size={20} className="fill-current" />
        ))}

        {fractional >= 5 && (
          <FaStarHalfAlt size={20} className="fill-current" />
        )}

        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} size={20} className="fill-current" />
        ))}
      </div>
    );
  };

  

  return (
    <>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
        <div className="relative border border-gray-200 rounded-xl p-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 bg-white h-full flex flex-col">
          {/* 1. Discount Badge - Only shows if priceAfterDiscount exists */}
          {product.priceAfterDiscount && (
            <div className="absolute left-3 top-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">
              -
              {Math.round(
                ((product.price - product.priceAfterDiscount) / product.price) *
                  100,
              )}
              %
            </div>
          )}

          {/* Hover Actions Bar */}
          <HoverActionBar product={product} />

          {/* Image Section */}
          <div className="overflow-hidden mb-4 flex justify-center items-center h-48">
            <Image
              height={200}
              width={200}
              src={product.imageCover}
              alt={product.title}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Info */}
          <div className="grow space-y-1">
            <p className="text-sm text-gray-500 font-medium">
              {product.category.name}
            </p>
            <Link
              href={`/productsdetails/${product.id}`}
              className="text-lg font-semibold text-slate-800 line-clamp-2 leading-snug h-12 overflow-hidden"
            >
              {product.title}
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-1 py-1">
              {setRatingStar(product.ratingsAverage)}
              <span className="text-sm text-gray-400">
                {product.ratingsAverage} ({product.ratingsQuantity})
              </span>
            </div>

            {/* 2. Price Section with Discount Logic */}
            <div className="flex justify-between items-center mt-auto pt-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold ">
                  {product.priceAfterDiscount ? (
                    <span className="text-[#0AAD0A]">
                      {product.priceAfterDiscount} EGP
                    </span>
                  ) : (
                    <span className="text-black">{product.price} EGP</span>
                  )}
                </span>
                {product.priceAfterDiscount && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.price} EGP
                  </span>
                )}
              </div>
              <AddButton productId={product.id} classes={"bg-[#0AAD0A] text-white cursor-pointer p-2 rounded-lg hover:bg-[#099109] transition-colors shadow-sm"} icon={<FiPlus size={18} />} afterAdded={["", <Check key={product._id} size={20} strokeWidth={3} />]} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
