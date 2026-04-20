"use client"
import { OrderType } from "@/api/types/orders.type";
import { 
  Calendar, MapPin, Package, CreditCard, Banknote, 
  ChevronDown, ChevronUp, 
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function OrderCard ({ order }:{order:OrderType}){
  const [isExpanded, setIsExpanded] = useState(false);
const totalCount = order.cartItems.reduce((acc, item) => {
    return acc + item.count;
}, 0);
  // Dynamic styles for the status pill
  const statusColors = {
    "Processing": "bg-yellow-100 text-yellow-700",
    "On the way": "bg-blue-100 text-blue-700",
    "Delivered": "bg-green-100 text-green-700"
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 mb-4 shadow-sm">
      {/* Top Section: Summary */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Thumbnail */}
          <div className="w-20 h-20 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center p-2 relative">
             {totalCount > 1 && (
               <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                 +{totalCount}
               </span>
             )}
            <Image height={30} width={30} src={order.cartItems[0].product.imageCover} alt="Product" className="object-cover rounded" />
          </div>

          {/* Basic Info */}
          <div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${!order.isPaid?statusColors["Processing"]:statusColors["On the way"] || "bg-gray-100"}`}>
              {!order.isPaid?"Processing":"On the way"}
            </span>
            <h3 className="text-lg font-bold mt-2"># {order.id}</h3>
            <div className="flex flex-wrap items-center text-sm text-gray-500 gap-3 mt-1">
              <span className="flex items-center gap-1"><Calendar size={14} /> {order.createdAt}</span>
              <span className="flex items-center gap-1"><Package size={14} /> {totalCount} items</span>
              <span className="flex items-center gap-1"><MapPin size={14} /> {order.shippingAddress.city}</span>
            </div>
            <div className="text-xl font-bold mt-2">
              {order.totalOrderPrice} <span className="text-sm font-normal text-gray-500">EGP</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-end gap-4 w-full md:w-auto">
           <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-600">
             {order.paymentMethodType === "card" ? <CreditCard size={20} className="text-purple-500" /> : <Banknote size={20} />}
           </div>
           
           <button 
             onClick={() => setIsExpanded(!isExpanded)}
             className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
               isExpanded 
                 ? "bg-green-600 text-white hover:bg-green-700" 
                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
             }`}
           >
             {isExpanded ? (
               <>Hide <ChevronUp size={18} /></>
             ) : (
               <>Details <ChevronDown size={18} /></>
             )}
           </button>
        </div>
      </div>

      {/* Expanded Section: Order Details */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
          
          {/* Order Items List */}
          <div className="mb-6">
            <h4 className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-4 bg-green-50 w-max px-3 py-1 rounded-md">
              <Package size={16} className="text-green-600" /> Order Items
            </h4>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
              {order.cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded border flex items-center justify-center p-1">
                      <Image width={30} height={30} src={item.product.imageCover} alt={item.product.title} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{item.product.title}</p>
                      <p className="text-sm text-gray-500">{item.count} × {item.price} EGP</p>
                    </div>
                  </div>
                  <div className="font-bold text-gray-900">
                    {item.count * item.price} <span className="text-xs text-gray-400 font-normal">EGP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid for Address and Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Address Card */}
            <div className="border border-gray-100 rounded-xl p-4">
               <h4 className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <div className="bg-blue-100 p-1 rounded text-blue-600"><MapPin size={16} /></div> Delivery Address
               </h4>
               <p className="font-bold text-gray-800">{order.shippingAddress.city}</p>
               <p className="text-gray-600 text-sm mt-1">{order.shippingAddress.details}</p>
               <p className="text-gray-500 text-sm mt-2 flex items-center gap-2">
                  📞 {order.shippingAddress.phone}
               </p>
            </div>

            {/* Order Summary Card */}
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
               <h4 className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <div className="bg-orange-400 p-1 rounded text-white"><Package size={16} /></div> Order Summary
               </h4>
               <div className="space-y-2 text-sm text-gray-600">
                 <div className="flex justify-between">
                   <span>Subtotal</span>
                   <span>{order.totalOrderPrice} EGP</span>
                 </div>
                 <div className="flex justify-between">
                   <span>Shipping</span>
                   <span>{order.shippingPrice === 0 ? "Free" : `${order.shippingPrice} EGP`}</span>
                 </div>
                 <div className="flex justify-between font-bold text-lg text-gray-900 mt-2 pt-2 border-t border-yellow-200">
                   <span>Total</span>
                   <span>{order.totalOrderPrice} EGP</span>
                 </div>
               </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
