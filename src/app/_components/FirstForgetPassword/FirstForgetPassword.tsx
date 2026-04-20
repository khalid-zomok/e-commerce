"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiOutlineMail } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { FaArrowLeft, FaKey, FaLock } from "react-icons/fa";
import { forgetPasswordSchema, ForgetPasswordType } from "@/schemas/forgetPassword";
import { sendEmail } from "@/actions/changePassword.action";
import { toast } from "sonner";
import CheckYourEmail from "../CheckYourEmail/CheckYourEmail";

// 1. Define the Schema


export default function FirstForgetPassword({onNext}:{onNext:(arg:string)=>void}) {
  const { control, handleSubmit } = useForm<ForgetPasswordType>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgetPasswordType) => {
    const res = await sendEmail(data)
    if(res.statusMsg === "success"){
    console.log(res);
    toast.success(res.message,{position:"top-center"})
    onNext(data.email)
    }
    
  };

  return (
    <div className="flex flex-col shadow-2xl rounded-2xl items-center justify-center p-8 bg-white h-full w-full mx-auto">
      {/* Brand & Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-1 mb-2">
          <span className="text-2xl font-bold text-green-600">Fresh</span>
          <span className="text-2xl font-bold text-slate-800">Cart</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Forgot Password?</h2>
        <p className="text-slate-500 text-sm">{"No worries, we'll send you a reset code"}</p>
      </div>

      {/* Stepper Logic */}
      <div className="flex items-center justify-center w-full mb-10">
        <div className="relative flex items-center justify-between w-64">
          {/* Step 1: Active */}
          <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white ring-4 ring-green-100">
            <MdEmail  size={18} />
          </div>
          {/* Connector 1 */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-[2px] bg-slate-100" />
          
          {/* Step 2: Inactive */}
          <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-400 border border-slate-100">
            <FaKey  size={18} />
          </div>
          {/* Connector 2 */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[2px] bg-slate-100" />

          {/* Step 3: Inactive */}
          <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-400 border border-slate-100">
            <FaLock  size={18} />
          </div>
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Email Address
              </label>
              <div
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                  fieldState.invalid
                    ? "border-red-500 bg-red-50"
                    : "border-slate-200 bg-white focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-50"
                }`}
              >
                <HiOutlineMail className={`text-xl ${fieldState.invalid ? "text-red-400" : "text-slate-400"}`} />
                <input
                  {...field}
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                />
              </div>
              {fieldState.error && (
                <p className="text-xs text-red-500 ml-1">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        <button
          type="submit"
          className="w-full py-4 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl transition-all  active:scale-[0.98]"
        >
          Send Reset Code
        </button>
      </form>

      {/* Footer Navigation */}
      <div className="mt-8 flex flex-col items-center gap-6 w-full">
        <button className="cursor-pointer flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors">
          <FaArrowLeft  size={16} />
          Back to Sign In
        </button>

        <div className="w-full border-t border-slate-100" />

        <p className="text-sm text-slate-500">
          Remember your password?{" "}
          <span className="text-green-600 font-bold cursor-pointer hover:underline">
            Sign In
          </span>
        </p>
      </div>
    </div>
  )
}
