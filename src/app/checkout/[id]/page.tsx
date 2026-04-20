"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ReceiptText,
  MapPin,
  Plus,
  Info,
  Banknote,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { getAllUserAddresses } from "@/actions/addresses.action";
import { AddressType, CartProduct } from "@/api/types/product.type";
import { getUserCart } from "@/actions/cart.action";
import Image from "next/image";
import { FaShieldAlt, FaSpinner, FaTruck } from "react-icons/fa";
import { LuPackage2 } from "react-icons/lu";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutFormData, checkoutSchema } from "@/schemas/checkout.address";
import {
  HiOutlineLibrary,
  HiOutlineLocationMarker,
  HiOutlinePhone,
} from "react-icons/hi";
import { paymentCash, paymentOnline } from "@/actions/payment.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function CheckoutPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<AddressType[] | null>(null);
  const [cartItems, setcartItems] = useState<CartProduct[] | undefined>(
    undefined,
  );
  const [cartId, setCartId] = useState<string>("");

  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [showNewAddress, setShowNewAddress] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");
  const subtotal =
    cartItems?.reduce((acc, item) => acc + item.count * item.price, 0) || 0;
  const shippingFee = 50;
  const total = subtotal + shippingFee;

 const form = useForm<CheckoutFormData>({
  defaultValues: {
    details: "",
    phone: "",
    city: "",
  },
  resolver: zodResolver(checkoutSchema),
});
  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = form

  const handleSelectSavedAddress = (address: AddressType) => {
    // This is the "Pro" move: update the entire form state at once

    reset({
      phone: address.phone,
      details: address.details,
      city: address.city,
    });
  };

  // 1. Mock Data (Replace these with your API state)
  const getAddress = async () => {
    const res = await getAllUserAddresses();
    if (res.status === "success") {
      setAddresses(res.data);
    }
  };

  const getCartItems = async () => {
    const res = await getUserCart();

    if (res.status === "success") {
      const products = res.data.products;
      setCartId(res.cartId);
      setcartItems(products);
    }
  };
 const onSubmit = async (data: CheckoutFormData) => {
  
  try {
    if (paymentMethod === "online") {
      // The online API usually only needs address details, not the postal code
      const res = await paymentOnline(cartId, window.location.origin, data);
      if (res.session?.url) window.location.assign(res.session.url);
    } else {
    const res = await paymentCash(cartId, data);
    if (res?.status === "success") {
      router.push("/allorders");
    }
}
  } catch (error) {
    toast.error("Process failed");
  }
};

  useEffect(() => {
    getAddress();
    getCartItems();
  }, []);
  // State for selections

  // Calculations

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb & Header */}
          <div className="mb-8">
            <div className="text-sm text-slate-500 mb-4 flex gap-2">
              <Link href="/" className="hover:text-green-600">
                Home
              </Link>{" "}
              /
              <Link href="/cart" className="hover:text-green-600">
                Cart
              </Link>{" "}
              /<span className="text-slate-900 font-medium">Checkout</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-green-600 text-white p-2 rounded-xl shadow-md">
                  <ReceiptText size={28} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Complete Your Order
                  </h1>
                  <p className="text-slate-500 text-sm">
                    Review your items and complete your purchase
                  </p>
                </div>
              </div>
              <Link
                href="/cart"
                className="text-green-600 font-medium flex items-center gap-2 hover:text-green-700 transition-colors"
              >
                <ArrowLeft size={18} /> Back to Cart
              </Link>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Forms */}
            <div className="lg:col-span-8 space-y-6">
              {/* Shipping Address Section */}
              <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                <div className="bg-green-600 p-4 text-white flex items-center gap-2">
                  <MapPin size={20} />
                  <div>
                    <h2 className="font-bold text-lg">Shipping Address</h2>
                    <p className="text-green-100 text-xs">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <MapPin size={16} className="text-green-600" /> Saved
                    Addresses
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Select a saved address or enter a new one below
                  </p>

                  <div className="space-y-3 mb-4">
                    {/* Map through your API addresses here */}
                    {addresses?.map((addr) => (
                      <div
                        key={addr._id}
                        className={`flex w-full  items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedAddressId === addr._id && !showNewAddress
                            ? "border-green-500 bg-green-50/30"
                            : "border-slate-100 hover:border-green-200"
                        }`}
                        onClick={() => {
                          setSelectedAddressId(addr._id);
                          setShowNewAddress(false);
                          handleSelectSavedAddress(addr);
                        }}
                      >
                        <div className="mt-1 bg-slate-100 p-2 rounded-full text-slate-500">
                          <MapPin size={16} />
                        </div>
                        <div className="flex flex-col items-start">
                          <h4 className="font-bold text-slate-800">
                            {addr.city}
                          </h4>
                          <p className="text-slate-500 text-sm mt-1">
                            {addr.details}
                          </p>
                          <div className="flex gap-4 mt-2 text-xs text-slate-400 font-medium">
                            <span>📞 {addr.phone}</span>
                            <span>🏢 {addr.city}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Toggle New Address */}
                  <button
                    onClick={() => setShowNewAddress(true)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 border-dashed transition-all ${
                      showNewAddress
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-green-300 text-green-600 hover:bg-green-50"
                    }`}
                  >
                    <div className="bg-green-500 text-white p-1 rounded-md">
                      <Plus size={18} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold">Use a different address</h4>
                      <p className="text-xs opacity-80">
                        Enter a new shipping address manually
                      </p>
                    </div>
                  </button>

                  {/* New Address Form (Expands when clicked) */}
                  {showNewAddress && (
                    <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                      {/* Delivery Information Alert */}
                      <div className="bg-blue-50 text-blue-700 p-4 rounded-xl flex items-start gap-3 text-sm">
                        <Info size={18} className="shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block">
                            Delivery Information
                          </span>
                          Please ensure your address is accurate for smooth
                          delivery.
                        </div>
                      </div>

                      {/* City Field */}
                      <Controller
                        name="city"
                        control={control}
                        render={({ field, fieldState }) => (
                          <div className="mb-5">
                            <label
                              htmlFor="city"
                              className="text-slate-800 font-bold text-[15px] block mb-2"
                            >
                              City{" "}
                              <span className="text-red-500 font-normal">
                                *
                              </span>
                            </label>
                            <div className="relative group">
                              {/* Gray Icon Box */}
                              <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-slate-100 rounded-lg text-slate-500 transition-colors group-focus-within:bg-green-50">
                                <HiOutlineLibrary size={20} />
                              </div>
                              <input
                                {...field}
                                id="city"
                                placeholder="e.g. Cairo, Alexandria, Giza"
                                className="w-full pl-15 pr-4 py-3.5 bg-white rounded-2xl border-2 border-slate-100 focus:border-green-500 focus:ring-0 outline-none transition-all placeholder:text-slate-400 text-slate-700"
                              />
                            </div>
                            {fieldState.error && (
                              <p className="text-red-500 text-xs mt-1 font-medium">
                                {fieldState.error.message}
                              </p>
                            )}
                          </div>
                        )}
                      />

                      {/* Street Address Field */}
                      <Controller
                        name="details"
                        control={control}
                        render={({ field, fieldState }) => (
                          <div className="mb-5">
                            <label
                              htmlFor="details"
                              className="text-slate-800 font-bold text-[15px] block mb-2"
                            >
                              Street Address{" "}
                              <span className="text-red-500 font-normal">
                                *
                              </span>
                            </label>
                            <div className="relative group">
                              {/* Icon Box fixed to top for textareas */}
                              <div className="absolute left-2.5 top-2.5 w-10 h-10 flex items-center justify-center bg-slate-100 rounded-lg text-slate-500 transition-colors group-focus-within:bg-green-50">
                                <HiOutlineLocationMarker size={20} />
                              </div>
                              <textarea
                                {...field}
                                id="details"
                                placeholder="Street name, building number, floor, apartment..."
                                rows={4}
                                className="w-full pl-15 pr-4 py-3.5 bg-white rounded-2xl border-2 border-slate-100 focus:border-green-500 focus:ring-0 outline-none transition-all placeholder:text-slate-400 text-slate-700 resize-none min-h-27.5"
                              />
                            </div>
                            {fieldState.error && (
                              <p className="text-red-500 text-xs mt-1 font-medium">
                                {fieldState.error.message}
                              </p>
                            )}
                          </div>
                        )}
                      />

                      {/* Phone Number Field */}
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field, fieldState }) => (
                          <div className="mb-5">
                            <label
                              htmlFor="phone"
                              className="text-slate-800 font-bold text-[15px] block mb-2"
                            >
                              Phone Number{" "}
                              <span className="text-red-500 font-normal">
                                *
                              </span>
                            </label>
                            <div className="relative group">
                              <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-slate-100 rounded-lg text-slate-500 transition-colors group-focus-within:bg-green-50">
                                <HiOutlinePhone size={20} />
                              </div>
                              <input
                                {...field}
                                id="phone"
                                type="tel"
                                placeholder="01xxxxxxxxx"
                                className="w-full pl-15 pr-32 py-3.5 bg-white rounded-2xl border-2 border-slate-100 focus:border-green-500 focus:ring-0 outline-none transition-all placeholder:text-slate-400 text-slate-700"
                              />
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <span className="text-slate-400 text-[11px] font-medium">
                                  Egyptian numbers only
                                </span>
                              </div>
                            </div>
                            {fieldState.error && (
                              <p className="text-red-500 text-xs mt-1 font-medium">
                                {fieldState.error.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                      {/* {paymentMethod === "cod" && (
                        <Controller
                          name="postalCode"
                          control={control}
                          render={({ field, fieldState }) => (
                            <div className="mb-5">
                              <label
                                htmlFor="postalCode"
                                className="text-slate-800 font-bold text-[15px] block mb-2"
                              >
                                Postal Code
                                <span className="text-red-500 font-normal">
                                  *
                                </span>
                              </label>
                              <div className="relative group">
                                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-slate-100 rounded-lg text-slate-500 transition-colors group-focus-within:bg-green-50">
                                  <HiOutlinePhone size={20} />
                                </div>
                                <input
                                  {...field}
                                  id="postalCode"
                                  type="text"
                                  placeholder="123456"
                                  className="w-full pl-15 pr-32 py-3.5 bg-white rounded-2xl border-2 border-slate-100 focus:border-green-500 focus:ring-0 outline-none transition-all placeholder:text-slate-400 text-slate-700"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                  <span className="text-slate-400 text-[11px] font-medium">
                                    postal code
                                  </span>
                                </div>
                              </div>
                              {fieldState.error && (
                                <p className="text-red-500 text-xs mt-1 font-medium">
                                  {fieldState.error.message}
                                </p>
                              )}
                            </div>
                          )}
                        />
                      )} */}
                    </div>
                  )}
                </div>
              </section>

              {/* Payment Method Section */}
              <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                <div className="bg-green-600 p-4 text-white flex items-center gap-2">
                  <CreditCard size={20} />
                  <div>
                    <h2 className="font-bold text-lg">Payment Method</h2>
                    <p className="text-green-100 text-xs">
                      {"Choose how you'd like to pay"}
                    </p>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  {/* Cash on Delivery Option */}
                  <label
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-green-500 bg-green-50/50"
                        : "border-slate-100 hover:border-green-200"
                    }`}
                    onClick={() => {setPaymentMethod("cod")}
                    }
                  >
                    <div className="bg-green-500 text-white p-2 rounded-xl">
                      <Banknote size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 text-lg">
                        Cash on Delivery
                      </h4>
                      <p className="text-slate-500 text-sm">
                        Pay when your order arrives at your doorstep
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${paymentMethod === "cod" ? "bg-green-500 text-white" : "border-2 border-slate-300"}`}
                    >
                      {paymentMethod === "cod" && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      )}
                    </div>
                  </label>

                  {/* Pay Online Option */}
                  <label
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "online"
                        ? "border-green-500 bg-green-50/50"
                        : "border-slate-100 hover:border-green-200"
                    }`}
                    onClick={() => {setPaymentMethod("online")}}
                  >
                    <div className="bg-slate-100 text-slate-500 p-2 rounded-xl">
                      <CreditCard size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 text-lg">
                        Pay Online
                      </h4>
                      <p className="text-slate-500 text-sm">
                        Secure payment with Credit/Debit Card via Stripe
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${paymentMethod === "online" ? "bg-green-500 text-white" : "border-2 border-slate-300"}`}
                    >
                      {paymentMethod === "online" && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      )}
                    </div>
                  </label>

                  <div className="mt-4 bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 text-sm">
                    <ShieldCheck size={20} className="text-green-600" />
                    <div>
                      <span className="font-bold block">
                        Secure & Encrypted
                      </span>
                      Your payment info is protected with 256-bit SSL encryption
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 sticky top-6">
                <div className="bg-green-600 p-4 rounded-t-2xl text-white flex items-center gap-2">
                  <ReceiptText size={20} />
                  <div>
                    <h2 className="font-bold text-lg">Order Summary</h2>
                    <p className="text-green-100 text-xs">
                      {cartItems?.length} items
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  {/* Map Cart Items here */}
                  <div className="space-y-4 mb-6 max-h-75 overflow-y-auto pr-2">
                    {cartItems?.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100"
                      >
                        <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-2xl">
                          <Image
                            src={item.product.imageCover}
                            height={30}
                            width={30}
                            alt={item.product.slug}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800 text-sm">
                            {item.product.title}
                          </h4>
                          <p className="text-slate-500 text-xs">
                            {item.count} × {item.price} EGP
                          </p>
                        </div>
                        <div className="font-bold text-slate-800">
                          {item.price * item.count}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 border-t border-slate-100 pt-4 mb-6 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span className="font-semibold">{total && total-50} EGP</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="flex items-center gap-2">
                        <FaTruck /> Shipping
                      </span>
                      <span className="font-semibold">50 EGP</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-bold text-slate-900">
                      Total
                    </span>
                    <span className="text-2xl font-black text-green-600">
                      {total}{" "}
                      <span className="text-sm font-bold text-slate-500">
                        EGP
                      </span>
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <FaSpinner className="animate-spin" />
                    ) : paymentMethod === "cod" ? (
                      <span className="flex gap-2">
                        <ReceiptText size={20} /> Place Order{" "}
                      </span>
                    ) : (
                      <span className="flex gap-2 items-center">
                        <FaShieldAlt size={14} /> Proceed to payment
                      </span>
                    )}
                  </button>

                  <div className="flex justify-center gap-4 mt-6 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <FaShieldAlt size={14} className="text-green-500" />{" "}
                      Secure
                    </span>
                    <span className="flex items-center gap-1">
                      <FaTruck className="text-blue-600" /> Fast Delivery
                    </span>
                    <span className="flex items-center gap-1">
                      <LuPackage2 className="text-yellow-600" /> Easy Returns
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
