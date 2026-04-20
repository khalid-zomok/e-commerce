"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Headset,
  Menu,
  X,
  LogOut,
  Settings,
  MapPin,
  Box,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { BiCart } from "react-icons/bi";
import { HiOutlineHeart } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import BrandLogo from "./../BrandLogo/BrandLogo";
import { signOut, useSession } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import { CartContext } from "@/context/CartContext";
import { WishlistContext } from "@/context/WishlistContext";

export default function Navbar() {
  const [isClick, setisClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { numOfCartItems, setNumOfCartItems } = useContext(CartContext);
  const {numOfWishlistItems, setNumOfWishlistItems}  = useContext(WishlistContext)

  const toggleMenu = () => {
    setisClick(!isClick);
  };
  const mySignOut = () => {
    signOut({ redirect: true, callbackUrl: "/login" });
  };

  const data = useSession();
  const status = data.status
  return (
    <>
      <nav className="w-full border-b z-50 sticky top-0 bg-white">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <BrandLogo />
          </Link>

          <div className="hidden md:flex grow max-w-xl relative">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full border rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-[#2bb673]"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2bb673] p-1.5 rounded-full text-white">
              <Search size={18} />
            </button>
          </div>

          {/* 3. Links & Actions */}
          <div className="hidden xl:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-[#2bb673]">
              Home
            </Link>
            <Link href="/shop" className="hover:text-[#2bb673]">
              Shop
            </Link>
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#2bb673]">
              <div
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                  <DropdownMenuTrigger className="px-4 cursor-pointer py-2 rounded-md flex items-center gap-2 group focus:outline-none focus-visible:ring-0 text-gray-700  hover:text-[#2bb673] transition-colors">
                    <span>Categories</span>
                    <IoIosArrowDown
                      className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-64 bg-white rounded-2xl shadow-xl border-none p-0 overflow-hidden"
                  >
                    {/* The List Items */}
                    <div className="p-2 ">
                      <DropdownMenuItem
                        render={<Link href="/categories" />}
                        className="py-3 px-4 text-[#21313C] font-medium rounded-lg focus:bg-green-50 focus:text-[#2bb673] cursor-pointer transition-colors"
                      >
                        All Categories
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        render={<Link href="/shop/6439d2d167d9aa4ca970649f" />}
                        className="py-3 px-4 text-[#21313C] font-medium rounded-lg focus:bg-green-50 focus:text-[#2bb673] cursor-pointer transition-colors"
                      >
                        Electronics
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        render={<Link href="/shop/6439d58a0049ad0b52b9003f" />}
                        className="py-3 px-4 text-[#21313C] font-medium rounded-lg focus:bg-green-50 focus:text-[#2bb673] cursor-pointer transition-colors"
                      >
                        {"Women's Fashion"}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        render={<Link href="/shop/6439d5b90049ad0b52b90048" />}
                        className="py-3 px-4 text-[#21313C] font-medium rounded-lg focus:bg-green-50 focus:text-[#2bb673] cursor-pointer transition-colors"
                      >
                        {"Men's Fashion"}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        render={<Link href="/shop/6439d30b67d9aa4ca97064b1" />}
                        className="py-3 px-4 text-[#21313C] font-medium rounded-lg focus:bg-green-50 focus:text-[#2bb673] cursor-pointer transition-colors"
                      >
                        Beauty & Health
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <Link href="/brands" className="hover:text-[#2bb673]">
              Brands
            </Link>
          </div>

          {/* 4. Support & Icons */}
          <div className="flex items-center gap-5">
            {/* Support Section (يظهر في الشاشات الكبيرة) */}
            <div className="hidden md:flex items-center gap-2 border-l pl-5">
              <div className="p-2 bg-green-50 rounded-full text-[#2bb673]">
                <Headset size={20} />
              </div>
              <div className="flex flex-col text-[12px]">
                <span className="text-gray-400">Support</span>
                <span className="font-bold text-[#1a2b3c]">24/7 Help</span>
              </div>
            </div>

            {/* Icons Group */}
            <div className="flex items-center gap-4 text-gray-600">
              <Link href={"/wishlist"} className="relative">
              <Heart
                size={24}
                className="cursor-pointer hover:text-[#2bb673]"
              />
              {numOfWishlistItems !== 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {numOfWishlistItems}
                  </span>
                )}
              </Link>
              <Link href={"/cart"} className="relative">
                <ShoppingCart
                  size={24}
                  className="cursor-pointer hover:text-[#2bb673]"
                />
                {numOfCartItems !== 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#2bb673] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {numOfCartItems}
                  </span>
                )}
              </Link>
            </div>

            {/* User Sign In (أو الـ Burger Menu في الموبايل) */}

            {status === "unauthenticated" ? (
              <>
                <Link
                  href="/login"
                  className="hidden md:flex items-center justify-center bg-[#2bb673] hover:bg-[#23945d] text-white rounded-full px-4 py-1 gap-2 transition-all shadow-sm active:scale-95"
                >
                  <User size={20} strokeWidth={2.5} />
                  <span className="font-bold text-md">Sign In</span>
                </Link>
              </>
            ) : (
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        // h-12 w-12 gives you that perfect 48px circle
                        className="h-12 w-12 p-0 text-gray-400 hover:text-[#2bb673] hover:bg-slate-50 rounded-full cursor-pointer flex items-center justify-center transition-colors"
                      >
                        <CgProfile className="w-8! h-8!" />
                      </Button>
                    }
                  />
                  <DropdownMenuContent className="w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-0 overflow-hidden">
                    {/* 1. Header Section: User Info */}
                    <div className="flex items-center gap-3 p-5 bg-slate-50/50 border-b border-slate-100">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-[#2bb673]">
                        <CgProfile size={28} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#1a2b3c] text-lg leading-tight">
                          {data.data?.user.name}
                        </span>
                        <span className="text-sm text-slate-400">
                          {data.data?.user.email}
                        </span>
                      </div>
                    </div>

                    {/* 2. Menu Items Section */}
                    <div className="p-2">
                      <DropdownMenuItem
                        render={<Link href="/profile/addresses" />}
                        className="flex items-center gap-4 px-4 py-3 text-slate-600 font-medium rounded-xl outline-none data-[highlighted]:bg-green-50 data-[highlighted]:text-[#2bb673] transition-colors cursor-pointer group"
                      >
                        <User size={20} className="text-slate-400" />
                        My Profile
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        render={<Link href="/allorders" />}
                        className="flex items-center gap-4 px-4 py-3 text-slate-600 font-medium rounded-xl outline-none data-[highlighted]:bg-green-50 data-[highlighted]:text-[#2bb673] transition-colors cursor-pointer group"
                      >
                        <Box size={20} className="text-slate-400" />
                        My Orders
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        render={<Link href="/wishlist" />}
                        className="flex items-center gap-4 px-4 py-3 text-slate-600 font-medium rounded-xl outline-none data-[highlighted]:bg-green-50 data-[highlighted]:text-[#2bb673] transition-colors cursor-pointer group"
                      >
                        <Heart size={20} className="text-slate-400" />
                        My Wishlist
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        render={<Link href="/profile/addresses" />}
                        className="flex items-center gap-4 px-4 py-3 text-slate-600 font-medium rounded-xl outline-none data-[highlighted]:bg-green-50 data-[highlighted]:text-[#2bb673] transition-colors cursor-pointer group"
                      >
                        <MapPin size={20} className="text-slate-400" />
                        Addresses
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        render={<Link href="/profile/settings" />}
                        className="flex items-center gap-4 px-4 py-3 text-slate-600 font-medium rounded-xl outline-none data-[highlighted]:bg-green-50 data-[highlighted]:text-[#2bb673] transition-colors cursor-pointer group"
                      >
                        <Settings size={20} className="text-slate-400" />
                        Settings
                      </DropdownMenuItem>
                    </div>

                    <DropdownMenuSeparator className="h-px bg-slate-100 my-1" />

                    {/* 3. Sign Out Section */}
                    <div className="p-2">
                      <DropdownMenuItem
                        onClick={() => {
                          mySignOut();
                        }}
                        className="data-highlighted:bg-red-50 data-highlighted:text-red-400  flex items-center gap-4 px-4 py-3 text-red-500 font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        <LogOut size={20} />
                        Sign Out
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            <div
              onClick={() => {
                toggleMenu();
              }}
              className=" cursor-pointer md:hidden bg-[#2bb673] p-2 rounded-full text-white"
            >
              <Menu size={24} />
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          isClick ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMenu}
      />

      {/* 2. Sidebar Panel (Right Side) */}
      <aside
        className={`fixed top-0 right-0 h-full w-70 sm:w-87.5 bg-white z-60 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isClick ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b bg-gray-50">
          <BrandLogo />

          <button
            onClick={toggleMenu}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col gap-2 p-4 overflow-y-auto h-[calc(100%-80px)]">
          {/* Mobile Search Input */}
          <div className="mb-6 relative md:hidden flex items-center border border-slate-400 focus-within:shadow-[8px_8px_8px_rgba(43,182,115,0.4)] focus-within:border-[#2bb673] rounded-xl p-1">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent border-none py-2 px-4 outline-none  focus:ring-0 text-sm text-gray-600 placeholder:text-gray-400"
            />
            <button className="bg-[#198754] hover:bg-[#157347] text-white p-2.5 rounded-lg transition-colors flex items-center justify-center">
              <Search size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col border-b mb-1 gap-1">
            <Link
              href="/"
              className="px-4 py-3 rounded-md hover:bg-green-50 hover:text-[#2bb673] transition-colors font-medium text-gray-700"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="px-4 py-3 rounded-md hover:bg-green-50 hover:text-[#2bb673] transition-colors font-medium text-gray-700"
              onClick={toggleMenu}
            >
              Shop
            </Link>

            <Link
              href="/categories"
              className="px-4 py-3 rounded-md hover:bg-green-50 hover:text-[#2bb673] transition-colors font-medium text-gray-700"
              onClick={toggleMenu}
            >
              Categories
            </Link>

            <Link
              href="/brands"
              className="px-4 py-3 rounded-md hover:bg-green-50 hover:text-[#2bb673] transition-colors font-medium text-gray-700"
              onClick={toggleMenu}
            >
              Brands
            </Link>
          </nav>

          {/* Bottom Actions */}
          <div className="space-y-4 mb-8">
            <div
              className="flex items-center gap-4 group cursor-pointer"
              onClick={toggleMenu}
            >
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                <HiOutlineHeart size={22} />
              </div>
              <span className="text-[#1a2b3c] font-medium">Wishlist</span>
            </div>

            <div
              className="flex items-center gap-4 group cursor-pointer"
              onClick={toggleMenu}
            >
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[#2bb673]">
                <BiCart size={22} />
              </div>
              <span className="text-[#1a2b3c] font-medium">Cart</span>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex gap-3 mb-8">
            <button className="flex-1 bg-[#2bb673] text-white py-3 rounded-xl font-bold hover:bg-[#249a60] transition-colors">
              Sign In
            </button>
            <button className="flex-1 border-2 border-[#2bb673] text-[#2bb673] py-3 rounded-xl font-bold hover:bg-green-50 transition-colors">
              Sign Up
            </button>
          </div>

          {/* Help Support Section */}
          <div className="mt-auto mb-6 p-4 bg-gray-50 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2bb673] shadow-sm">
              <MdOutlineHeadsetMic size={22} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Need Help?</p>
              <p className="text-xs text-[#2bb673] font-semibold">
                Contact Support
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
