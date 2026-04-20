"use client";
import { Lock, ShoppingBag } from "lucide-react";
import OrderCard from "../_components/OrderCard/OrderCard";
import { getUserOrders } from "@/actions/orders.action";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { OrderType } from "@/api/types/orders.type";
import Link from "next/link";

export default function AllOrdersPage() {
  const data = useSession();
  const [orders, setOrders] = useState<OrderType[]|null>(null)
  
  const getOrders = async (id:string) => {
    if(data.data?.id){
    const res = await getUserOrders(id);
    if (res) {
      setOrders(res)
      console.log(res);
    }}
  };

  useEffect(() => {
   if(data.data?.id)getOrders(data.data?.id);
  }, [data.data?.id]);


  // data/mockOrders.js
  const mockOrders = [
    {
      _id: "1812",
      status: "Processing",
      date: "Apr 16, 2026",
      location: "assiut",
      itemsCount: 3,
      totalPrice: 447,
      paymentMethod: "cash",
      thumbnail: "/shawl-1.jpg", // Replace with actual image path
      items: [{ id: 1, name: "Woman Shawl", quantity: 3, price: 149 }],
      address: {
        city: "assiut",
        details: "egyptassssiuyt",
        phone: "01097873807",
      },
      summary: {
        subtotal: 447,
        shipping: 0, // 0 means Free
        total: 447,
      },
    },
    {
      _id: "1990",
      status: "On the way",
      date: "Apr 17, 2026",
      location: "assiut",
      itemsCount: 7,
      totalPrice: 2093,
      paymentMethod: "card",
      thumbnail: "/shawl-2.jpg",
      items: [], // Add items here
      address: { city: "assiut", details: "Main St", phone: "01011122233" },
      summary: { subtotal: 2093, shipping: 0, total: 2093 },
    },
  ];

  return (
    <div className="w-full mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
                  <Link href={"/"} className="text-sm text-gray-500 hover:text-gray-800 cursor-pointer">
                    Home
                  </Link>
                  <span className="text-sm text-gray-500 mx-2">/</span>
                  <span className="text-sm text-gray-800 font-medium">
                    My Orders
                  </span>
               
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-green-500 p-3 rounded-2xl text-white shadow-sm">
            <ShoppingBag size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">My Orders</h1>
            <p className="text-gray-500">
              Track and manage your {orders?.length} orders
            </p>
          </div>
        </div>

        <Link href={"/"} className="flex items-center gap-2 text-green-600 font-semibold mt-4 md:mt-0 hover:text-green-700">
          <Lock size={16} /> Continue Shopping
        </Link>
      </div>
 </div>
      {/* Render Orders using Map */}
      <div className="space-y-2">
        {orders?.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}
