"use client";
import { ChangePassword } from "@/actions/changePassword.action";
import {
  ChangePasswordFormData,
  changePasswordSchema,
} from "@/schemas/changePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Eye } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

   

export default function ChangePasswordCard() {
 const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setshowNewPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const form = useForm<ChangePasswordFormData>({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const submit = async (data:ChangePasswordFormData)=>{
    const res = await ChangePassword(data);
    if(res.message === "success"){
      toast.success("password change successfully",{position:"top-center"})
      signOut({redirect:true,callbackUrl:"/login"}) 
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit(submit)}  className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-orange-50 p-3 rounded-2xl text-orange-500">
                  <Lock size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Change Password
                  </h2>
                  <p className="text-sm text-slate-400">
                    Update your account password
                  </p>
                </div>
              </div>

              <div className="grid gap-6">
                {/* 1. CURRENT PASSWORD */}
                <Controller
                  name="currentPassword"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your current password"
                          className={`w-full p-4 rounded-2xl bg-slate-50 border ${
                            fieldState.invalid
                              ? "border-red-500"
                              : "border-slate-100"
                          }`}
                        />
                        <Eye
                         onClick={() => setShowPassword(!showPassword)}
                          size={18}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                        />
                      </div>
                      {fieldState.error && (
                        <p className="text-xs text-red-500 mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                {/* 2. NEW PASSWORD */}
                <Controller
                
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          {...field}
                            type={showNewPassword ? "text" : "password"}
                          placeholder="Enter your new password"
                          className={`w-full p-4 rounded-2xl bg-slate-50 border ${
                            fieldState.invalid
                              ? "border-red-500"
                              : "border-slate-100"
                          }`}
                        />
                        <Eye
                        onClick={() => setshowNewPassword(!showNewPassword)}
                          size={18}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                        />
                      </div>
                      {fieldState.error && (
                        <p className="text-xs text-red-500 mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                {/* 3. CONFIRM PASSWORD */}
                <Controller
                  name="rePassword"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your new password"
                          className={`w-full p-4 rounded-2xl bg-slate-50 border ${
                            fieldState.invalid
                              ? "border-red-500"
                              : "border-slate-100"
                          }`}
                        />
                        <Eye
                        onClick={() => setshowConfirmPassword(!showConfirmPassword)}
                          size={18}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                        />
                      </div>
                      {fieldState.error && (
                        <p className="text-xs text-red-500 mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              <button disabled={isSubmitting} type="submit" className="mt-8 disabled:cursor-not-allowed bg-orange-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-100">
                Change Password
              </button>
            </form>
    </>
  )
}
