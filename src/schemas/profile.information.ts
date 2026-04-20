import { z } from "zod";

export const profileInformationSchema = z.object({
  name: z
    .string("name must be text")
    .nonempty("name is required")
    .min(3, " min length is 3 chars ")
    .max(10, " max length is 10 chars "),

  email: z.email("invalid email").nonempty("email is required"),

  phone: z
    .string()
    .nonempty("phone is required")
    .regex(/^01[0125][0-9]{8}$/, "invalid phone number"),
});

export type ProfileInformationType = z.infer<typeof profileInformationSchema>;
