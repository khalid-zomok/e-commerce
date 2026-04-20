"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiOutlineShieldCheck } from "react-icons/hi"; // For verification icon
import { FaArrowLeft, FaCheck, FaKey, FaLock } from "react-icons/fa";
import { toast } from "sonner";
import { verifyCodeSchema, VerifyCodeType } from "@/schemas/forgetPassword";
import { sendCode } from "@/actions/changePassword.action";

// Schema for 6-digit verification code


export default function CheckYourEmail({email,onNext}:{email:string,onNext:()=>void}) {
  const { control, handleSubmit } = useForm<VerifyCodeType>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { resetCode: "" },
  });

  const onSubmit = async (data: VerifyCodeType) => {
    const res = await sendCode(data);
    if(res.status === "Success"){
        // Add your action here (e.g., verifyResetCode(data))
        toast.success("Code verified successfully!", { position: "top-center" });
        onNext()
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
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Check Your Email</h2>
        <p className="text-slate-500 text-sm max-w-[280px] mx-auto leading-relaxed">
          Enter the 6-digit code sent to <span className="font-semibold text-slate-700">{email}</span>
        </p>
      </div>

      {/* Stepper Logic - Step 2 Active */}
      <div className="flex items-center justify-center w-full mb-10">
        <div className="relative flex items-center justify-between w-64">
          {/* Step 1: Completed (Checkmark) */}
          <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white">
            <FaCheck size={14} />
          </div>
          
          {/* Connector 1: Active (Green) */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-[2px] bg-green-500" />
          
          {/* Step 2: Active (Key with ring) */}
          <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white ring-4 ring-green-100">
            <FaKey size={16} />
          </div>
          
          {/* Connector 2: Inactive (Slate) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[2px] bg-slate-100" />

          {/* Step 3: Inactive (Lock) */}
          <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-400 border border-slate-100">
            <FaLock size={16} />
          </div>
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        <Controller
          name="resetCode"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Verification Code
              </label>
              <div
                className={`flex items-center mx-auto gap-4 px-4 py-4 rounded-xl border transition-all duration-200 ${
                  fieldState.invalid
                    ? "border-red-500 bg-red-50"
                    : "border-slate-200 bg-white focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-50"
                }`}
              >
                <HiOutlineShieldCheck className={`text-2xl ${fieldState.invalid ? "text-red-400" : "text-slate-400"}`} />
                <input
                  {...field}
                  type="text"
                  maxLength={6}
                  placeholder="•  •  •  •  •  •"
                  className="flex w-full text-center justify-center bg-transparent outline-none text-slate-700 placeholder:text-slate-300 text-lg tracking-[0.5em] font-bold"
                />
              </div>
              {fieldState.error && (
                <p className="text-xs text-red-500 ml-1">{fieldState.error.message}</p>
              )}
              
              <p className="text-center text-sm text-slate-500 pt-2">
                {"Didn't receive the code?"}
                <button type="button" className="text-green-600 font-bold hover:underline cursor-pointer">
                  Resend Code
                </button>
              </p>
            </div>
          )}
        />

        <button
          type="submit"
          className="w-full py-4 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-green-100 active:scale-[0.98]"
        >
          Verify Code
        </button>
      </form>

      {/* Footer Navigation */}
      <div className="mt-8 flex flex-col items-center gap-6 w-full">
        <button type="button" className="cursor-pointer flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-green-600 transition-colors">
          <FaArrowLeft size={14} />
          Change email address
        </button>
      </div>
    </div>
  );
}
