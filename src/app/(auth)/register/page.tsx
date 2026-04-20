"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { HiOutlineUserAdd } from "react-icons/hi";

import FirstRegisterDiv from "@/app/_components/FirstRegisterDiv/FirstRegisterDiv";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { myRegisterSchema, RegisterSchemaType } from "@/schemas/auth.register";
import { userREgister } from "@/actions/auth.action";

export default function Register() {
  const router = useRouter();

  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(myRegisterSchema),
  });

  const { handleSubmit, control, formState: { isSubmitting } } = form;

  const mySubmit = async (data: RegisterSchemaType) => {
    const isRegisteredSuccessfully = await userREgister(data);
    if (isRegisteredSuccessfully) {
      toast.success("Account has been created ❤️", { position: "top-center" });
      setTimeout(() => router.push("/login"), 2000);
    } else {
      toast.error("Registration failed. Please try again.", { position: "top-center" });
    }
  };

  return (
    <div className="flex  flex-col lg:flex-row min-h-screen bg-white">
      {/* Left Side: Illustration/Welcome */}
      <div className="lg:block lg:w-1/2">
        <FirstRegisterDiv />
      </div>

      {/* Right Side: Form Container */}
      <div className="w-full rounded-3xl shadow lg:w-1/2 flex items-center justify-center p-4 mx-5 my-12 md:p-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Create Your Account</h1>
            <p className="text-slate-500 mt-2">Start your fresh journey with us today</p>
          </div>

          {/* Social Logins */}
          <div className="flex gap-4 mb-6">
            <button type="button" className="flex-1 cursor-pointer flex items-center justify-center gap-2 py-2 px-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all font-medium text-slate-700">
              <FaGoogle className="text-red-600"  size={20} /> Google
            </button>
            <button type="button" className="flex-1 cursor-pointer flex items-center justify-center gap-2 py-2 px-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all font-medium text-slate-700">
              <FaFacebook size={20} className="text-blue-600" /> Facebook
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200"></span></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-slate-400">or</span></div>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit(mySubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-slate-700 font-semibold mb-1">Name*</FieldLabel>
                  <Input {...field} placeholder="Ali" className="h-11 rounded-lg border-slate-200 focus:ring-[#0AAD0A]" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-slate-700 font-semibold mb-1">Email*</FieldLabel>
                  <Input type="email" {...field} placeholder="ali@example.com" className="h-11 rounded-lg border-slate-200" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-slate-700 font-semibold mb-1">Password*</FieldLabel>
                  <Input type="password" {...field} placeholder="create a strong password" className="h-11 rounded-lg border-slate-200" />
                  <p className="text-[10px] text-slate-400 mt-1">Must be at least 8 characters with numbers and symbols</p>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="rePassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-slate-700 font-semibold mb-1">Confirm Password*</FieldLabel>
                  <Input type="password" {...field} placeholder="confirm your password" className="h-11 rounded-lg border-slate-200" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-slate-700 font-semibold mb-1">Phone Number*</FieldLabel>
                  <Input type="tel" {...field} placeholder="+1 234 567 8900" className="h-11 rounded-lg border-slate-200" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className="flex items-start gap-2 py-2">
              <input type="checkbox" required className="mt-1 accent-[#0AAD0A]" id="terms" />
              <label htmlFor="terms" className="text-xs text-slate-600">
                I agree to the <span className="text-[#0AAD0A] cursor-pointer hover:underline">Terms of Service</span> and <span className="text-[#0AAD0A] cursor-pointer hover:underline">Privacy Policy</span> *
              </label>
            </div>

            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full h-12 bg-[#0AAD0A] hover:bg-[#088a08] text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <HiOutlineUserAdd size={20} />
              {isSubmitting ? "Creating Account..." : "Create My Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-8">
            Already have an account?
            <Link href="/login" className="text-[#0AAD0A] font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}