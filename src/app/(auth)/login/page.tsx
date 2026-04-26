"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FaFacebook, FaGoogle, FaLock, FaStar, FaUsers } from "react-icons/fa";
import {
  HiOutlineUserAdd,
  HiOutlineEye,
} from "react-icons/hi"; // Updated eye icon
import { MdEmail } from "react-icons/md";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { myRegisterSchema, RegisterSchemaType } from "@/schemas/auth.register";
import { myLoginSchema, LoginSchemaType } from "@/schemas/auth.register";
import FirstLoginDiv from "@/app/_components/FirstLoginDiv/FirstLoginDiv";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginSchemaType>({
    defaultValues: {
      password: "",
      email: "",
    },
    resolver: zodResolver(myLoginSchema),
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const mySubmit = async (data: LoginSchemaType) => {
   const res = await signIn("credentials",{...data,redirect : false, callbackUrl : "/"})
   console.log(res);
   if (res?.ok) {
      toast.success("Welcome back ❤️", { position: "top-center" });
      setTimeout(() => window.location.href = "/", 2000);
    } else {
      toast.error(res?.error || "Invalid credentials", {
        position: "top-center",
      });
    }
   
  };

  return (
    // Centered min-h-screen layout
    <div className="flex items-center justify-center min-h-screen bg-[#FDFDFD] font-sans">
      <div className="flex flex-col lg:flex-row  w-full p-4 md:p-12 gap-5">
        {/* Left Side: Illustration/Welcome */}
        <div className="lg:block lg:w-1/2">
          <FirstLoginDiv />
        </div>

        {/* Right Side: Form Container */}
        {/* Shadowed and rounded card style */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white rounded-3xl shadow-lg border border-gray-100 px-6 py-10 md:p-14">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#0AAD0A]">
                fresh<span className="text-[#050B1B]">Cart</span>
              </h1>
              <h1 className="text-3xl font-bold text-[#050B1B]">
                Welcome Back!
              </h1>
              <p className="text-[#6C7C93] mt-2">
                Sign in to continue your fresh shopping experience
              </p>
            </div>

            {/* Social Logins */}
            <div className="flex flex-col gap-4 mb-6">
              <button
                type="button"
                className="flex-1 cursor-pointer flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl hover:bg-slate-50 transition-all font-medium text-[#111A2C]"
              >
                <FaGoogle className="text-red-600" size={20} /> Continue with
                Google
              </button>
              <button
                type="button"
                className="flex-1 cursor-pointer flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl hover:bg-slate-50 transition-all font-medium text-[#111A2C]"
              >
                <FaFacebook size={22} className="text-blue-600" /> Continue with
                Facebook
              </button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-100"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-3 bg-white text-[#94A3B8]">
                  or continue with email
                </span>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit(mySubmit)}>
              {/* Email Field */}
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="relative">
                    <FieldLabel className="text-[#3A4350] font-semibold mb-1">
                      Email Address
                    </FieldLabel>
                    <div className="relative">
                      <MdEmail 
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <Input
                        type="email"
                        {...field}
                        placeholder="Enter your email"
                        // pl-11 adds padding-left to make room for the icon
                        className="h-12 rounded-xl border border-gray-200 pl-11"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Password Field */}
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex justify-between items-center mb-1">
                      <FieldLabel className="text-[#3A4350] font-semibold">
                        Password
                      </FieldLabel>
                      <Link
                        href="/forgetpassword"
                        className="text-sm text-[#0AAD0A] font-semibold hover:underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    <div className="relative">
                      <FaLock 
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        placeholder="Enter your password"
                        // pl-11 for the lock icon, pr-12 for the eye icon
                        className="h-12 rounded-xl border border-gray-200 pl-11 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <HiOutlineEye size={22} />
                      </button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div className="flex items-start gap-2 py-1">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-gray-300 accent-[#0AAD0A]"
                  id="terms"
                />
                <label htmlFor="terms" className="text-sm text-[#6C7C93]">
                  Keep me signed in{" "}
                </label>
              </div>

              {/* Correct icon used here */}
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full h-12 bg-[#0AAD0A] hover:bg-[#088a08] text-white font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 text-base"
              >
                <HiOutlineUserAdd size={22} />
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <p className="text-center text-sm text-[#6C7C93] mt-8">
              New to FreshCart?{" "}
              <Link
                href="/register"
                className="text-[#0AAD0A] font-extrabold hover:underline"
              >
                Create an account
              </Link>
            </p>

            {/* --- Badges Section --- */}
            <div className="flex items-center justify-center gap-6 mt-12 pt-10 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-md text-gray-500">
                <FaLock  size={16} className="text-gray-500" />
                SSL Secured
              </div>
              <div className="flex items-center gap-1.5 text-md text-gray-500">
                <FaUsers  size={16} className="text-gray-500" />
                50K+ Users
              </div>
              <div className="flex items-center gap-1.5 text-md text-gray-500">
                <FaStar  size={16} className="text-gray-500" />
                4.9 Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
