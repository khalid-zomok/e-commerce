import {z} from "zod"


export const addressSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    details: z.string().min(5, "Please provide more detail"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "Must be a valid egyption phonr number"),
    city: z.string().min(2, "City is required"),
})
export type AddressFormValues = z.infer<typeof addressSchema>;