import z from "zod";

export const LoginValidation = z.object({
  mobile: z
    .string()
    .min(10, { message: "Enter a valid 10 digit number" })
    .max(10, { message: "Enter a valid 10 digit number" }),
  password: z.string().min(3, { message: "Enter a valid password" }),
});

export const signUpValidation = z.object({
  mobile: z
    .string()
    .min(10, { message: "Enter a valid 10-digit number" })
    .max(10, { message: "Enter a valid 10-digit number" }),
  password: z.string().min(3, { message: "Password too short" }),
  name: z.string().min(3, { message: "Enter a valid name" }),
  email: z.string().email({ message: "Enter a valid email" }),
  aadhar: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, { message: "Aadhar is required" }),
  license: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, { message: "License is required" }),
});
