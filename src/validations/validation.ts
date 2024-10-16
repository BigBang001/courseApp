import { date, z } from 'zod';

export const signupValidation = z.object({
  fullName: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username cannot exceed 20 characters" }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(100, { message: "Password cannot exceed 100 characters" })
  // .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  // .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  // .regex(/[0-9]/, { message: "Password must contain at least one number" })
  // .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" })
  ,
  role: z
    .enum(['admin', 'user'], { message: "Role must be either 'admin' or 'user'" }),
});


export const courseValidation = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  thumbnail: z.string(),
  duration: z.string(),
})
