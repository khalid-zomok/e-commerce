import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import {
  IoCall,
  IoLocationSharp,
  IoMail,
} from "react-icons/io5";
import BrandLogo from './../BrandLogo/BrandLogo';

export default function Footer() {
  return (
    <>
      <footer className="bg-[#0b1622] text-gray-400 py-12 px-6 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="bg-white inline-block p-2 rounded mb-6">
                        <BrandLogo/>
              
            </div>
            <p className="text-sm leading-relaxed mb-6">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>
            <div className="space-y-4 text-gray-300 text-sm">
              {/* Phone */}
              <div className="flex items-center gap-4">
                <IoCall className="text-[#2bb673] text-xl" />
                <span className="hover:text-[#2bb673] cursor-pointer transition-colors">
                  +1 (800) 123-4567
                </span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <IoMail className="text-[#2bb673] text-xl" />
                <span className="hover:text-[#2bb673] cursor-pointer transition-colors">
                  support@freshcart.com
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <IoLocationSharp className="text-[#2bb673] text-xl" />
                <span className="leading-relaxed hover:text-[#2bb673]">
                  123 Commerce Street, New York, NY 10001
                </span>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              {[
                { name: "facebook", icon: <FaFacebookF /> },
                { name: "twitter", icon: <FaTwitter /> },
                { name: "instagram", icon: <FaInstagram /> },
                { name: "youtube", icon: <FaYoutube /> },
              ].map((social) => (
                <div
                  key={social.name}
                  className="w-9 h-9 bg-gray-700/50 rounded-full flex items-center justify-center text-white hover:bg-[#2bb673] hover:scale-110 cursor-pointer transition-all duration-300"
                >
                  <span className="text-base">{social.icon}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="text-white font-semibold mb-6">Shop</h3>
            <ul className="space-y-3 text-sm">
              {[
                "All Products",
                "Categories",
                "Brands",
                "Electronics",
                "Men's Fashion",
                "Women's Fashion",
              ].map((item) => (
                <li key={item} className="hover:text-[#2bb673] cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Account</h3>
            <ul className="space-y-3 text-sm">
              {[
                "My Account",
                "Order History",
                "Wishlist",
                "Shopping Cart",
                "Sign In",
                "Create Account",
              ].map((item) => (
                <li key={item} className="hover:text-[#2bb673] cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Support</h3>
            <ul className="space-y-3 text-sm">
              {[
                "Contact Us",
                "Help Center",
                "Shipping Info",
                "Returns & Refunds",
                "Track Order",
              ].map((item) => (
                <li key={item} className="hover:text-[#2bb673] cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Legal</h3>
            <ul className="space-y-3 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <li
                    key={item}
                    className="hover:text-[#2bb673] cursor-pointer"
                  >
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 max-w-7xl mx-auto flex flex-col md:flex-row  md:row items-center justify-between  gap-4">
          <p className="text-xs">© 2026 FreshCart. All rights reserved.</p>
          <div className="flex gap-6 items-center grayscale opacity-60">
            <span className="text-xs">Visa</span>
            <span className="text-xs">Mastercard</span>
            <span className="text-xs">PayPal</span>
          </div>
        </div>
      </footer>
    </>
  );
}
