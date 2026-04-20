"use client";
import React from "react";
// import { Truck, Gift, Phone, Mail, User, UserPlus } from 'lucide-react';
import { FaGift, FaPhoneAlt, FaTruck, FaUserPlus } from "react-icons/fa";
import { CiMail, CiUser } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";

export default function FirstNav() {
  const data = useSession();
  const status =data.status
  const mySignOut = ()=>{

     signOut({redirect:true,callbackUrl:"/login"}) 


  }
  return (
    <div className="w-full hidden lg:block bg-gray-50 border-b border-gray-200 py-2 px-4 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        {/* Left Section: Promotional Info */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaTruck size={16} className="text-[#0AAD0A]" />
            <span>Free Shipping on Orders 500 EGP</span>
          </div>
          <div className="flex items-center gap-2">
            <FaGift size={16} className="text-[#0AAD0A]" />
            <span>New Arrivals Daily</span>
          </div>
        </div>

        {/* Right Section: Contact & Auth */}
        <div className="flex items-center gap-6">
          <div className="items-center gap-4 border-r border-gray-300 pr-6 hidden lg:flex">
            <div className="flex items-center gap-2 hover:text-[#0AAD0A] transition-colors cursor-pointer">
              <FaPhoneAlt size={14} />
              <span>+1 (800) 123-4567</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[#0AAD0A] transition-colors cursor-pointer">
              <CiMail size={14} />
              <span>support@freshcart.com</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {status === "unauthenticated" ? (
              <Link href={"/login"} className="flex items-center gap-2 cursor-pointer hover:text-[#0AAD0A] transition-colors">
                <CiUser size={16} />
                <span>Sign In</span>
              </Link>
            ) : (
              <Link href={"/"} className="flex items-center gap-2 cursor-pointer hover:text-[#0AAD0A] transition-colors">
                <CiUser size={16} />
                <span>{data.data?.user.name}</span> 
              </Link>
            )}

             {status === "unauthenticated" ? (
             <Link href={"/register"} className="flex items-center gap-2 cursor-pointer hover:text-[#0AAD0A] transition-colors font-medium">
              <FaUserPlus size={16} />
              <span>Sign Up</span>
            </Link>
            ) : (
              <button onClick={()=> {mySignOut()}} className="flex items-center gap-2 cursor-pointer hover:text-[#0AAD0A] transition-colors">
                <FiLogOut  size={16} />
                <span>Log out</span> 
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
