import { z } from 'zod';

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
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be less than 100 characters" }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(2000, { message: "Description must be less than 2000 characters" }),

  shortDescription: z.string().min(5, { message: "Short Description must be at least 5 characters long" }).max(200, { message: "Short Description must be less than 200 characters" }),

  price: z
    .number()
    .min(0, { message: "Price must be a positive number" }),

  thumbnail: z
    .string()
    .url({ message: "Thumbnail must be a valid URL" }),

  duration: z
    .string()
    .min(1, { message: "Duration must be specified" })
    .regex(/^\d+ (month|year)s?$/, { message: "Duration must be in the format 'X months' or 'X years'" }),

  level: z
    .enum(['beginner', 'intermediate', 'advanced'], { message: "Level must be one of 'beginner', 'intermediate', or 'advanced'" }),

  tags: z.string().min(2, { message: "Add Atleat 1 tag minimum of two charcter" }).max(100, { message: "All Tags should come under 100 characters" })
});

export const creditCardSValidation = z.object({
  cardHolderName: z.string().min(2, { message: "Card Holder name have atleast 2 charcter" }),
  bankName: z.string().min(1, { message: "Bank name is required" }),
  accountNumber: z.string().min(8, { message: "Account number must be at least 8 characters" }),
  cvv: z.number().int().min(100, { message: "CVV must be a 3-digit number" }).max(999, { message: "CVV must be a 3-digit number" }),
  // expiryDate: z.string().regex(/^(0[1-9]|3[0-9])\/?([0-9]{4}|[0-9]{2})$/, {
  //   message: "Expiry date must be in MM/YY or MM/YYYY format"
  // }),
  expiryDate: z.string()
});