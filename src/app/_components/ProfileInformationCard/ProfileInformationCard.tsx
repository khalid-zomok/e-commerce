import { Save, User } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileInformationSchema,
  ProfileInformationType,
} from "@/schemas/profile.information";
import { useSession } from "next-auth/react";
import { updateUserData } from "@/actions/userData.action";
import { toast } from "sonner";

export default function ProfileInformationCard() {
  const form = useForm<ProfileInformationType>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(profileInformationSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onsubmit = async (data: ProfileInformationType) => {
    const res = await updateUserData(data);
    if(res.message === "success"){
      toast.success(res.message,{position:"top-center"})
    }
  };

  
  const {data} = useSession()

  

  return (
    <>
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-green-50 p-3 rounded-2xl text-[#2bb673]">
            <User size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Profile Information
            </h2>
            <p className="text-sm text-slate-400">
              Update your personal details
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="grid gap-6">
            {/* Full Name Field */}
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter your name"
                    className={`w-full p-4 rounded-2xl bg-slate-50 border focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                      fieldState.invalid ? "border-red-500" : "border-slate-100"
                    }`}
                  />
                  {fieldState.error && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Email Address Field */}
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full p-4 rounded-2xl bg-slate-50 border focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                      fieldState.invalid ? "border-red-500" : "border-slate-100"
                    }`}
                  />
                  {fieldState.error && (
                    <p className="text-xs text-red-500 mt-1">
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
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Phone Number
                  </label>
                  <input
                    {...field}
                    type="text"
                    placeholder="01xxxxxxxxx"
                    className={`w-full p-4 rounded-2xl bg-slate-50 border focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                      fieldState.invalid ? "border-red-500" : "border-slate-100"
                    }`}
                  />
                  {fieldState.error && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <button disabled={isSubmitting}  className="mt-8 disabled:cursor-not-allowed flex items-center gap-2 bg-[#2bb673] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#23945d] transition-all">
            <Save size={20} />
            Save Changes
          </button>
        </form>
        {/* Account Metadata */}
        <div className="mt-10 pt-8 border-t border-slate-100 space-y-4">
          <h3 className="font-bold text-slate-900">Account Information</h3>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 font-medium">User ID</span>
            <span className="text-slate-600 font-mono">
              {data?.id}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 font-medium">Role</span>
            <span className="bg-green-100 text-[#2bb673] px-3 py-1 rounded-lg font-bold">
              User
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
