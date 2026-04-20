"use client";
import {
  addProductToWishlist,
  removeWishlistProduct,
} from "@/actions/wishlist.action";
import { ProductType } from "@/api/types/product.type";
import { WishlistContext } from "@/context/WishlistContext";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FaHeart, FaSpinner } from "react-icons/fa";
import { FiEye, FiHeart, FiRefreshCw } from "react-icons/fi";
import { toast } from "sonner";

export default function HoverActionBar({ product }: { product: ProductType }) {
  const { numOfWishlistItems, setNumOfWishlistItems, itemsIDS, setItemsIDS } =
    useContext(WishlistContext);
  const [isLoading, setisLoading] = useState(false);
  const addProductWishlist = async (id: string) => {
    setisLoading(true);
    const res = await addProductToWishlist(id);
    console.log(res);
    if (res.status === "success") {
      setNumOfWishlistItems(numOfWishlistItems + 1);
      setItemsIDS([...itemsIDS, product.id]);
      toast.success(res.message, { position: "top-center" });
    }
    setisLoading(false);
  };
  const removeproductWishlist = async (id: string) => {
    setisLoading(true);

    const res = await removeWishlistProduct(id);
    console.log(res);
    if (res.status === "success") {
      setNumOfWishlistItems(res.data.length);
      setItemsIDS(res.data);
      toast.success(res.message, { position: "top-center" });
    }
    setisLoading(false);
  };

  return (
    <div className="absolute right-3 top-3 flex flex-col gap-2  z-10">
      {itemsIDS?.includes(product.id) ? (
        <button
        disabled={isLoading}
          onClick={() => {
            removeproductWishlist(product.id);
          }}
          className="p-2 bg-white rounded-full shadow-md cursor-pointer text-red-600 transition-colors  border border-gray-100"
        >
          {isLoading ? (
            <p className="text-center">
              <FaSpinner className="m-auto animate-spin" />
            </p>
          ) : (
            <FaHeart size={16} />
          )}
        </button>
      ) : (
        <button
        disabled={isLoading}
          onClick={() => {
            addProductWishlist(product.id);
          }}
          className="p-2  rounded-full shadow-md cursor-pointer hover:text-red-600 transition-colors  border border-gray-100"
        >
          {isLoading ? (
            <p className="text-center">
              <FaSpinner className="m-auto animate-spin" />
            </p>
          ) : (
            <FiHeart size={16} />
          )}
        </button>
      )}

      <button className="p-2 bg-white rounded-full shadow-md cursor-pointer hover:text-[#0AAD0A] transition-colors border border-gray-100">
        <FiRefreshCw size={16} />
      </button>
      <Link
        href={`/productsdetails/${product.id}`}
        className="p-2 z-20 bg-white rounded-full shadow-md cursor-pointer hover:text-[#0AAD0A] transition-colors border border-gray-100"
      >
        <FiEye size={16} />
      </Link>
    </div>
  );
}
