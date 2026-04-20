import { z } from "zod";

export const checkoutSchema = z.object({
  details: z.string().min(5, "Please provide more detail"),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Must be a valid Egyptian phone number"),
  city: z.string().min(2, "City is required"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
