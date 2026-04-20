"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaCheck, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { resetPasswordSchema, ResetPasswordType } from "@/schemas/forgetPassword";
import { MdEmail } from "react-icons/md";
import { sendNewPassword } from "@/actions/changePassword.action";

// Construct a robust schema to validate matching passwords


export default function ThirdResetPassword({ onComplete }: { onComplete:()=>void }) {
  // State variables to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, handleSubmit } = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "", newPassword: "" },
  });

  const onSubmit = async (data: ResetPasswordType) => {
    const res = await sendNewPassword(data);
    if(res){
      toast.success("Password successfully updated!", { position: "top-center" });
      onComplete()}
    // Execute your final API request here
  };

  return (
    <div className="flex flex-col shadow-2xl rounded-2xl items-center justify-center p-8 bg-white h-full w-full mx-auto">
      {/* Brand & Header Section */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-1 mb-2">
          <span className="text-2xl font-bold text-green-600">Fresh</span>
          <span className="text-2xl font-bold text-slate-800">Cart</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Create New Password</h2>
        <p className="text-slate-500 text-sm max-w-[300px] mx-auto leading-relaxed">
          Your new password must be different from previous passwords
        </p>
      </div>

      {/* Consistent Stepper Logic - Step 3 Active */}
      <div className="flex items-center justify-center w-full mb-10">
        <div className="relative flex items-center justify-between w-64">
          {/* Step 1: Completed */}
          <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white">
            <FaCheck size={14} />
          </div>
          
          {/* Connector 1: Completed (Green) */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-[2px] bg-green-500" />
          
          {/* Step 2: Completed */}
          <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white">
            <FaCheck size={14} />
          </div>
          
          {/* Connector 2: Completed (Green) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[2px] bg-green-500" />

          {/* Step 3: Active (Lock with ring) */}
          <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white ring-4 ring-green-100">
            <FaLock size={14} />
          </div>
        </div>
      </div>

      {/* Interactive Form Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        
        {/* New Password Input */}
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Email
              </label>
              <div
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                  fieldState.invalid
                    ? "border-red-500 bg-red-50"
                    : "border-slate-200 bg-white focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-50"
                }`}
              >
                <MdEmail  className={`text-sm ${fieldState.invalid ? "text-red-400" : "text-slate-400"}`} />
                <input
                  {...field}
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                />
              </div>
              {fieldState.error && (
                <p className="text-xs text-red-500 ml-1">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        {/* Confirm Password Input */}
        <Controller
          name="newPassword"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Confirm Password
              </label>
              <div
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                  fieldState.invalid
                    ? "border-red-500 bg-red-50"
                    : "border-slate-200 bg-white focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-50"
                }`}
              >
                <FaLock className={`text-sm ${fieldState.invalid ? "text-red-400" : "text-slate-400"}`} />
                <input
                  {...field}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {fieldState.error && (
                <p className="text-xs text-red-500 ml-1">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        {/* Submit Configuration */}
        <button
          type="submit"
          className="w-full mt-4 py-4 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-green-100 active:scale-[0.98]"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}