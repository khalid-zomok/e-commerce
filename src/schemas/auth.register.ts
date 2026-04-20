import * as zod from "zod";

export const myRegisterSchema = zod
  .object({
    name: zod
      .string("name must be text")
      .nonempty("name is required")
      .min(3, " min length is 3 chars ")
      .max(10, " max length is 10 chars "),

    email: zod.email("invalid email").nonempty("email is required"),

    phone: zod
      .string()
      .nonempty("phone is required")
      .regex(/^01[0125][0-9]{8}$/, "invalid phone number"),

    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/,
        "Password must include upper/lower case, a number, and a symbol.",
      ),
    rePassword: zod.string().nonempty("repassword is required"),
  })
  .refine(
    (object) => {
      return object.password == object.rePassword;
    },
    { error: "password & repassword not matched !", path: ["repassword"] },
  );

export type RegisterSchemaType = zod.infer<typeof myRegisterSchema>;

export const myLoginSchema = zod.object({
  password: zod
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/,
      "Password must include upper/lower case, a number, and a symbol.",
    ),

  email: zod.email("invalid email").nonempty("email is required"),
});

export type LoginSchemaType = zod.infer<typeof myLoginSchema>;
