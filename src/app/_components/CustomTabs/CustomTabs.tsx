"use client";
import { ProductType } from "@/api/types/product.type";
import React, { useState } from "react";
import { FaFolder, FaShieldAlt, FaStar, FaTruck } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";

export default function CustomTabs({ product }: { product: ProductType }) {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="mt-12 border rounded-lg overflow-hidden shadow-sm bg-white">
      {/* Tab Navigation */}
      <div className="flex bg-gray-50 border-b">
        <button
          onClick={() => setActiveTab("details")}
          className={`px-6 cursor-pointer py-4 flex items-center gap-2 transition-all ${
            activeTab === "details"
              ? "border-b-2 bg-green-50 border-green-500 text-green-600 font-bold"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <FaFolder />  Product Details
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-6 cursor-pointer py-4 flex items-center gap-2 transition-all ${
            activeTab === "reviews"
              ? "border-b-2 bg-green-50 border-green-500 text-green-600 font-bold"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <FaStar /> Reviews ({product.ratingsQuantity}){" "}
        </button>
        <button
          onClick={() => setActiveTab("shipping")}
          className={`px-6 cursor-pointer py-4 flex items-center gap-2 transition-all ${
            activeTab === "shipping"
              ? "border-b-2 bg-green-50 border-green-500 text-green-600 font-bold"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <FaTruck /> Shipping & Returns
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {/* 1. Product Details Tab */}
        {activeTab === "details" && (
          <div className="animate-fadeIn">
            <h3 className="font-bold text-lg mb-4 text-slate-800">
              About this Product
            </h3>
            <p className="mb-8 text-gray-600">
              {product.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h4 className="font-semibold mb-4 text-slate-700">
                  Product Information
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Category</span>
                    <span className="font-medium">
                      {product.category?.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subcategory</span>
                    <span className="font-medium">{"Women's Clothing"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Brand</span>
                    <span className="font-medium">{product.brand?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Items Sold</span>
                    <span className="text-green-600 font-bold">
                      {product.sold}+ sold
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h4 className="font-semibold mb-4 text-slate-700">
                  Key Features
                </h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2 text-green-700">
                    ✔ Premium Quality Product
                  </li>
                  <li className="flex items-center gap-2 text-green-700">
                    ✔ 100% Authentic Guarantee
                  </li>
                  <li className="flex items-center gap-2 text-green-700">
                    ✔ Fast & Secure Packaging
                  </li>
                  <li className="flex items-center gap-2 text-green-700">
                    ✔ Quality Tested
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 2. Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="flex flex-col md:flex-row gap-10 animate-fadeIn">
            <div className="text-center md:text-left">
              <h2 className="text-6xl font-black text-slate-800">
                {product.ratingsAverage}
              </h2>
              <div className="text-yellow-400 text-xl my-2">⭐⭐⭐⭐☆</div>
              <p className="text-gray-400 text-sm">
                Based on {product.ratingsQuantity} reviews
              </p>
            </div>
            <div className="flex-1 space-y-3">
              {[60, 25, 5, 5, 5].map((percent, i) => (
                <div key={i} className="flex items-center gap-4 text-sm">
                  <span className="w-10 text-gray-500 whitespace-nowrap">
                    {5 - i}< br/>
                     star
                  </span>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <span className="w-10 text-gray-400">{percent}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Shipping Tab */}
        {activeTab === "shipping" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2 bg-green-500 text-white rounded-full text-xs">
                    <FaTruck />
                  </span>
                  <h4 className="font-bold text-slate-800">
                    Shipping Information
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✔ Free shipping on orders over $50</li>
                  <li>✔ Standard delivery: 3-5 business days</li>
                  <li>✔ Express delivery available (1-2 business days)</li>
                  <li>✔ Track your order in real-time</li>
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2 bg-green-500 text-white rounded-full text-xs">
                    <FaArrowRotateLeft />
                  </span>
                  <h4 className="font-bold text-slate-800">
                    Returns & Refunds
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2 items-center"><IoMdCheckmark className="text-green-500"/> 30-day hassle-free returns</li>
                  <li>✔ Full refund or exchange available</li>
                  <li>✔ Free return shipping on defective items</li>
                  <li>✔ Easy online return process</li>
                </ul>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl flex gap-4 items-center border border-slate-100">
              <span className="text-3xl bg-white p-3 rounded-full shadow-sm">
                <FaShieldAlt />
              </span>
              <div>
                <h5 className="font-bold text-slate-800">
                  {"Buyer Protection Guarantee"}
                </h5>
                <p className="text-xs text-gray-500">
                  {
                    "Get a full refund if your order doesn't arrive or isn't as described."
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
