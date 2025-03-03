import {z} from 'zod';

export const signUpSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z
      .string()
      .min(8, { message: "The password should be at least 8 characters long" }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],  // path of error
  });

  export const LoginSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string()
  })