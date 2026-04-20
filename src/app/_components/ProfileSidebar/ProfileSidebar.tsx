"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Settings, ChevronRight } from "lucide-react";

export default function ProfileSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "My Addresses", href: "/profile/addresses", icon: MapPin },
    { name: "Settings", href: "/profile/settings", icon: Settings },
  ];

  return (
    <aside className="md:col-span-3">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h2 className="font-bold text-slate-800 mb-6 text-lg">My Account</h2>
        <nav className="space-y-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between p-3 rounded-2xl transition-all group cursor-pointer border ${
                  isActive
                    ? "bg-green-50/60 border-green-100/50"
                    : "hover:bg-slate-50 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl transition-colors ${
                      isActive
                        ? "bg-[#2bb673] text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                    }`}
                  >
                    <item.icon size={20} />
                  </div>
                  <span
                    className={`font-semibold ${
                      isActive ? "text-[#2bb673]" : "text-slate-600"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
                <ChevronRight
                  size={18}
                  className={isActive ? "text-[#2bb673]" : "text-slate-300"}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}