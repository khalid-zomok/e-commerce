"use client"
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressFormValues, addressSchema } from "@/schemas/profile.address";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { addAddressTOMyProfile } from "@/actions/addresses.action";
import { toast } from "sonner";
export default function AddAddressDialog({onSuccess}:{onSuccess: () => void;}) {
    const [open, setOpen] = useState(false)
  const form = useForm<AddressFormValues>({
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(addressSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;


  const onSubmit = async (data: AddressFormValues) => {
    const res = await addAddressTOMyProfile(data);
      if (res.status === "success") {
         toast.success(res.message, { position: "top-center" });
         setOpen(false); 
         form.reset();
         onSuccess();
    }
      }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-2 bg-[#2bb673] hover:bg-[#23945d] text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-green-200 transition-all active:scale-95">
        <Plus size={20} />
        Add Address
      </DialogTrigger>

      <DialogContent className="sm:max-w-120 rounded-[24px] p-8">
        <DialogHeader>
          <DialogTitle className="text-[22px] font-bold text-[#0f172a]">
            Add New Address
          </DialogTitle>
        </DialogHeader>
        {/* no  */ }

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          {/* Address Name */}
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Address Name</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  placeholder="e.g. Home, Office"
                  className="rounded-xl border-slate-200"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Full Address */}
          <Controller
            name="details"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="details">Full Address</FieldLabel>
                <textarea
                  {...field}
                  id="details"
                  placeholder="Street, building, apartment..."
                  className="rounded-xl p-5 border-slate-200 min-h-25"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            {/* Phone Number */}
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                  <Input
                    {...field}
                    id="phone"
                    placeholder="01xxxxxxxxx"
                    className="rounded-xl border-slate-200"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* City */}
            <Controller
              name="city"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="city">City</FieldLabel>
                  <Input
                    {...field}
                    id="city"
                    placeholder="Cairo"
                    className="rounded-xl border-slate-200"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <DialogClose
            
              className="flex-1 bg-slate-100  h-14 cursor-pointer rounded-2xl"
            >
              Cancel
            </DialogClose>
            <Button
              disabled={isSubmitting}
              type="submit"
              className="flex-1 disabled:cursor-not-allowed h-14 cursor-pointer rounded-2xl bg-[#10b981]"
            >
              Add Address
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
