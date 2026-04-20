"use client";

import { clearAllCartItems, getUserCart, removeProductCart, updateProductQuantity } from "@/actions/cart.action";
import { CartData } from "@/api/types/product.type";
import React, { useContext, useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaMinus,
  FaPlus,
  FaTrash,
  FaLock,
  FaTruck,
  FaShieldAlt,
  FaArrowLeft,
  FaTag,
  FaSpinner,
} from "react-icons/fa";
import EmptyCartView from "../_components/EmptyCartView/EmptyCartView";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { CartContext } from "@/context/CartContext";


export default function CartPage() {
  const {numOfCartItems, setNumOfCartItems} = useContext(CartContext);
  const [cartItems, setCartItems] = useState<CartData | null>(null);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const [cartid, setcartId] = useState<string | null>(null)
  const getCartProduct = async () => {
    const res = await getUserCart();
    if (res.status === "success") {
      setCartItems(res.data);
      setcartId(res.cartId);
      
    }
  };

  const removeItem = async (id: string,count:number) => {
    const res = await removeProductCart(id);
    console.log(res);
    if(res.status === "success"){
    toast.success(res.message, { position: "top-center" });
    setCartItems(res.data)
    setNumOfCartItems(numOfCartItems-count)
    }
  };
  const clearCart = async () => {
    const res = await clearAllCartItems();
    console.log(res);
    if(res?.status === "success"){
    toast.success(res.message, { position: "top-center" });
    setCartItems(res.data)
    setNumOfCartItems(0);
    }
  };
  const updateQuantity = async (id: string, count: number,sign:string) => {
    // 1. Initiate the loading sequence for this specific ID
    setUpdatingItemId(id); 
    
    try {
      const res = await updateProductQuantity(id, count);
      console.log(res);
      if(res.status === "success"){
        if(sign === "-"){
        setNumOfCartItems(numOfCartItems-1)
        }
        if(sign === "+"){
        setNumOfCartItems(numOfCartItems+1)
        }
        toast.success(res.message, { position: "top-center" });
        setCartItems(res.data);
      }
    } finally {
      // 2. Terminate the loading sequence regardless of success or failure
      setUpdatingItemId(null); 
    }
  };

  useEffect(() => {
    getCartProduct();
  }, []);
  const subtotal = cartItems?.totalCartPrice;
  console.log(cartItems?.products);

  if (cartItems === null) {
  }

  return (
    <div className="w-full mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      {!cartItems && (
        <p className="text-center text-gray-500 py-10">
          <FaSpinner className="text-9xl m-auto animate-spin" />
        </p>
      )}

      {cartItems && cartItems.products.length > 0 && (
        <div>
          {" "}
          {/* Breadcrumbs & Header */}
          <div className="mb-8">
            <span className="text-sm text-gray-500 hover:text-gray-800 cursor-pointer">
              Home
            </span>
            <span className="text-sm text-gray-500 mx-2">/</span>
            <span className="text-sm text-gray-800 font-medium">
              Shopping Cart
            </span>

            <div className="flex items-center gap-3 mt-4">
              <div className="bg-green-600 p-3 rounded-xl text-white">
                <FaShoppingCart size={24} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Shopping Cart
              </h1>
            </div>
            <p className="text-gray-500 mt-2">
              You have{" "}
              <span className="font-bold text-green-600">
                {cartItems?.products.length} items
              </span>{" "}
              in your cart
            </p>
          </div>
          {/* Main Layout: Left (Items) + Right (Summary) */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Column: Cart Items Map */}
            <div className="flex-1 w-full space-y-4">
              {cartItems?.products.map((item) => (
                <div
                  key={item.product?.id}
                  className="flex flex-col sm:flex-row bg-white p-4 rounded-2xl border border-gray-100 shadow-sm gap-6 relative"
                >


                  {updatingItemId === item.product.id && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-2xl transition-all duration-300">
                      <div className="bg-white px-5 py-2.5 rounded-full shadow-sm flex items-center gap-3 border border-gray-100">
                        <FaSpinner className="animate-spin text-green-600" />
                        <span className="text-gray-600 font-medium text-sm">Updating...</span>
                      </div>
                    </div>
                  )}



                  {/* Product Image & Stock Badge */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        height={200}
                        width={200}
                        src={item.product?.imageCover}
                        alt={item.product?.title}
                        className="w-full h-full object-cover mix-blend-multiply"
                      />
                    </div>

                    <span className="bg-[#0AAD0A] text-white text-[10px] font-bold px-2 py-1 rounded-full w-full text-center">
                      ✓ In Stock
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {item.product?.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md">
                          {item.product.category.name}
                        </span>
                        <span>•</span>
                        <span>SKU:{item.product.id}</span>
                      </div>
                      <div className="mt-4">
                        <span className="text-xl font-extrabold text-green-600">
                          {item.price} EGP
                        </span>
                        <span className="text-xs text-gray-400 ml-1">
                          per unit
                        </span>
                      </div>
                    </div>

                    {/* Controls (Quantity & Delete) */}
                    <div className="flex items-end justify-between mt-4 sm:mt-0">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gray-200 rounded-lg p-1">
                        <button disabled={item.count === 1} onClick={()=>{updateQuantity(item.product.id,item.count-1,"-")}} className="w-8 h-8 disabled:cursor-not-allowed  flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                          <FaMinus size={12} />
                        </button>
                        <span className="w-10 text-center font-bold text-gray-800">
                          {item.count}
                        </span>
                        <button onClick={()=>{updateQuantity(item.product.id,item.count+1,"+")}} className="w-8 h-8 flex items-center justify-center text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors">
                          <FaPlus size={12} />
                        </button>
                      </div>

                      {/* Total & Delete */}
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-xs text-gray-400 mb-1">Total</p>
                          <p className="font-extrabold text-lg text-gray-900">
                            {item.price * item.count}{" "}
                            <span className="text-sm font-normal text-gray-500">
                              EGP
                            </span>
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            removeItem(item.product.id,item.count);
                          }}
                          className="cursor-pointer w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 rounded-xl transition-colors"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping Footer */}
              <div className="flex justify-between items-center mt-6 text-sm">
                <Link href={"/"} className="flex cursor-pointer items-center gap-2 text-green-600 hover:text-green-700 font-medium">
                  <FaArrowLeft /> Continue Shopping
                </Link>
                <button
                  onClick={() => {clearCart()}}
                  className="text-gray-400 cursor-pointer hover:text-gray-600"
                >
                  <FaTrash className="inline mr-2 mb-1" /> Clear all items
                </button>
              </div>
            </div>

            {/* Right Column: Order Summary (STICKY) */}
            <div className="w-full lg:w-95 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-25">
              {/* Header */}
              <div className="bg-green-600 p-4 text-white">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <FaLock /> Order Summary
                </h2>
                <p className="text-sm text-green-100">
                  {cartItems?.products.length} items in your cart
                </p>
              </div>

              <div className="p-6">
                {/* Shipping Banner */}
                <div className="flex items-start gap-3 bg-green-50 p-4 rounded-xl mb-6">
                  <div className="bg-green-200 text-green-700 p-2 rounded-full">
                    <FaTruck size={14} />
                  </div>
                  <div>
                    <p className="font-bold text-green-800 text-sm">
                      Free Shipping!
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      You qualify for free delivery
                    </p>
                  </div>
                </div>

                {/* Calculations */}
                <div className="space-y-3 text-sm border-b border-gray-100 pb-4 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">
                      {subtotal?.toLocaleString()} EGP
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-bold text-green-600 text-right">
                      FREE
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-extrabold text-gray-900">
                    {subtotal?.toLocaleString()}
                    <span className="text-sm font-normal text-gray-500">
                      EGP
                    </span>
                  </span>
                </div>

                {/* Promo Code Input */}
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 mb-4 cursor-text hover:border-gray-300 transition-colors">
                  <FaTag className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Apply Promo Code"
                    className="w-full text-sm outline-none bg-transparent"
                  />
                </div>

                {/* Checkout Button */}
                <Link href={`/checkout/${cartid}`}   className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm">
                  <FaLock /> Secure Checkout
                </Link>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-400 font-medium">
                  <span className="flex items-center gap-1">
                    <FaShieldAlt className="text-green-500" /> Secure Payment
                  </span>
                  <span className="flex items-center gap-1">
                    <FaTruck className="text-blue-500" /> Fast Delivery
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* State 2: Cart is genuinely empty -> show the new Empty View */}
      {cartItems && cartItems.products.length === 0 && <EmptyCartView />}
    </div>
  );
}
