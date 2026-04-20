import * as z from "zod";
export const forgetPasswordSchema = z.object({
  email: z.email("invalid email").nonempty("email is required"),
});

export type ForgetPasswordType = z.infer<typeof forgetPasswordSchema>;


export const verifyCodeSchema = z.object({
  resetCode: z.string().length(6, "Code must be exactly 6 digits").regex(/^\d+$/, "Must be numbers only"),
});

export type VerifyCodeType = z.infer<typeof verifyCodeSchema>;



export const resetPasswordSchema = z.object({
  newPassword: z
        .string()
        .nonempty("password is required")
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/,
          "Password must include upper/lower case, a number, and a symbol.",
        ),
 email: z.email("invalid email").nonempty("email is required"),
})

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;