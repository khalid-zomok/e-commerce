"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaHeart,
  FaTrash,
  FaShoppingCart,
  FaArrowLeft,
  FaSpinner,
  FaCheck,
} from "react-icons/fa";
import { toast } from "sonner";
import {
  getWishlistProducts,
  removeWishlistProduct,
} from "@/actions/wishlist.action";
import { ProductType } from "@/api/types/product.type";
import EmptyWishlist from "../_components/EmptyWishlist/EmptyWishlist";
import AddButton from "../_components/AddButton/AddButton";
import { CartContext } from "@/context/CartContext";
import { WishlistContext } from "@/context/WishlistContext";
// Import your actual API actions here
// import { getWishlist, removeFromWishlist } from "@/actions/wishlist.action";
// import { addToCart } from "@/actions/cart.action";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<ProductType[] | null>(
    null,
  );
  const { numOfCartItems, setNumOfCartItems, productIDS, setProductIDS } =
    useContext(CartContext);
    const {setNumOfWishlistItems,
        setItemsIDS,
      } = useContext(WishlistContext)
  //console.log(productIDS);
  const [isDeleted, setIsDeleted] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const fetchWishlist = async () => {
    const res = await getWishlistProducts();
    if (res?.status === "success") {
      setWishlistItems(res.data);
    }else {
    // If the API fails or returns unauthorized, set to empty array instead of null
    setWishlistItems([]); 
  }
  };

  useEffect(() => {
    fetchWishlist();
  }, [isDeleted]);

  const handleRemove = async (id: string) => {
    setLoadingId(id);
    const res = await removeWishlistProduct(id);
    if (res?.status === "success") {
      toast.success(res.message, { position: "top-center" });
      setIsDeleted(!isDeleted);
      setNumOfWishlistItems(res.data.length)      
      setItemsIDS(res.data)

    }
    setLoadingId(null);
  };

  return (
    <div className="w-full mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      {!wishlistItems && (
        <p className="text-center text-gray-500 py-10">
          <FaSpinner className="text-9xl m-auto animate-spin" />
        </p>
      )}

      {wishlistItems && wishlistItems?.length > 0 && (
        <div>
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-gray-800">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">Wishlist</span>
          </nav>

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-red-50 p-4 rounded-2xl">
              <FaHeart className="text-red-500 text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-500 text-sm">
                {wishlistItems?.length || 0} items saved
              </p>
            </div>
          </div>

          {/* Wishlist Table/List */}
          <div className="border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
            {/* Table Header (Hidden on Mobile) */}
            <div className="hidden md:grid grid-cols-12 bg-gray-50/50 p-4 text-sm font-semibold text-gray-400 border-b border-gray-100">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-center">Actions</div>
            </div>

            <div className="divide-y divide-gray-100">
              {!wishlistItems ? (
                <div className="p-20 text-center">
                  <FaSpinner className="animate-spin mx-auto text-4xl text-green-600" />
                </div>
              ) : wishlistItems?.length === 0 ? (
                <div className="p-20 text-center text-gray-500">
                  Your wishlist is empty.
                </div>
              ) : (
                wishlistItems?.map((item) => (
                  <div
                    key={item._id}
                    className="grid grid-cols-1 md:grid-cols-12 items-center p-4 md:p-6 gap-4 relative"
                  >
                    {/* Product Info */}
                    <div className="col-span-6 flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                        <Image
                          height={200}
                          width={200}
                          src={item.imageCover}
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {item.category?.name}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-left md:text-center">
                      <div className="font-bold text-gray-900 text-lg">
                        {item.priceAfterDiscount || item.price} EGP
                      </div>
                      {item.priceAfterDiscount && (
                        <div className="text-xs text-gray-400 line-through">
                          {item.price} EGP
                        </div>
                      )}
                    </div>

                    {/* Status */}
                    <div className="col-span-2 flex justify-start md:justify-center">
                    {productIDS?.includes(item.id)? <span className="flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold">
                       <FaShoppingCart size={12} />  In Cart
                      </span>: <span className="flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        In Stock
                      </span>}
                     
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 flex items-center justify-end md:justify-center gap-2">
                      {productIDS?.includes(item.id) ? (
                        <Link
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2.5 rounded-xl font-bold transition-all text-sm"
                          href={`/productsdetails/${item.id}`}
                        >
                          <span className="flex gap-3 items-center">
                            <FaCheck size={14} className="text-green-400" />{" "}
                            View Cart
                          </span>
                        </Link>
                      ) : (
                        <AddButton
                          productId={item.id}
                          classes={
                            "cursor-pointer flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#0AAD0A] hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-bold transition-all text-sm"
                          }
                          icon={
                            <span className="flex gap-3 items-center">
                              <FaShoppingCart size={14} /> Add to Cart
                            </span>
                          }
                          afterAdded={[
                            "",
                            <span
                              key={item._id}
                              className="flex gap-3 items-center"
                            >
                              <FaCheck size={14} /> Add to Cart
                            </span>,
                          ]}
                        />
                      )}

                      <button
                        onClick={() => handleRemove(item.id)}
                        className="cursor-pointer w-10 h-10 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        {loadingId === item.id ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          <FaTrash size={14} />
                        )}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer Link */}
          <div className="mt-8">
            <Link
              href="/"
              className="flex items-center  gap-2 text-gray-500 hover:text-green-400 transition-colors"
            >
              <FaArrowLeft size={14} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      )}

      {wishlistItems && wishlistItems.length === 0 && <EmptyWishlist />}
    </div>
  );
}
