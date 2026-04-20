"use client";
import {
  addProductToWishlist,
  removeWishlistProduct,
} from "@/actions/wishlist.action";
import { ProductType } from "@/api/types/product.type";
import { WishlistContext } from "@/context/WishlistContext";
import React, { useContext, useState } from "react";
import { FaHeart, FaRegHeart, FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

export default function AddToWishlistBtn({
  product,
}: {
  product: ProductType;
}) {
  const { setNumOfWishlistItems, itemsIDS, setItemsIDS } =
    useContext(WishlistContext);
    const [isLoading, setisLoading] = useState(false)

  const addProductWishlist = async (id: string) => {
    setisLoading(true);
    const res = await addProductToWishlist(id);
    console.log(res);
    if (res.status === "success") {
      setNumOfWishlistItems(res.data.length);
      setItemsIDS(res.data);
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
    <>
      {itemsIDS.includes(product.id) ? (
        <button 
        disabled={isLoading}
          onClick={() => {
            removeproductWishlist(product.id);
          }}
          className="w-13/14 cursor-point transition-all  text-red-600 border-2 border-red-200 bg-red-50  cursor-pointer py-3 rounded-md font-bold flex items-center justify-center gap-2"
        >
           {isLoading ?(
            <p className="text-center">
              <FaSpinner className="m-auto animate-spin" />
            </p>) : <FaHeart />} In Wishlist
        </button>
      ) : (
        <button
        disabled={isLoading}
          onClick={() => {
            addProductWishlist(product.id);
          }}
          className="w-13/14 cursor-point transition-all  text-black border-2 border-slate-200 hover:border-green-400 hover:text-green-400 cursor-pointer py-3 rounded-md font-bold flex items-center justify-center gap-2"
        >
          {isLoading ?(
            <p className="text-center">
              <FaSpinner className="m-auto animate-spin" />
            </p>) : <FaRegHeart />} Add To Wishlist
        </button>
      )}
    </>
  );
}
