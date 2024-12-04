import { z } from 'zod';


export enum CourseLevel {
  Beginner = "beginner",
  Intermediate = "intermediate",
  Advanced = "advanced",
}

enum Role {
  USER = "USER",
  INSTRUCTOR = "INSTRUCTOR",
  // ADMIN = "ADMIN"
}

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
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" })
  ,
  role: z.enum(["USER", "INSTRUCTOR"],{ message: "Role must be either 'INSTRUCTOR' or 'USER'" })
});

export const signinValidation = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(100, { message: "Password cannot exceed 100 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" })
  ,

});

export const courseValidation = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be less than 100 characters" }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(3000, { message: "Description must be less than 3000 characters" }),

  shortDescription: z.string().min(5, { message: "Short Description must be at least 5 characters long" }).max(200, { message: "Short Description must be less than 200 characters" }),

  price: z
    .number()
    .min(1, { message: "Price must be a positive number" }),

  thumbnail: z
    .string()
    .url({ message: "Thumbnail must be a valid URL" }),

  duration: z
    .string()
    .min(1, { message: "Duration must be specified" })
    .regex(/^\d+ (month|year)s?$/, { message: "Duration must be in the format 'X months' or 'X years'" }),

  level: z.nativeEnum(CourseLevel, { message: "Level must be one of 'beginner', 'intermediate', or 'advanced'" }),

  tags: z.string().min(2, { message: "Add Atleat 1 tag minimum of two charcter" }).max(150, { message: "All Tags should come under 100 characters" }),
  language: z.string().min(1, { message: "Language is required" }),
});

export const reviewValidation = z.object({
  content: z.string().min(1, { message: "Please give some message also" }),
  userId: z.string(),
  courseId: z.string(),
  rating: z.number()
})

export const classValidation = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(30, { message: "Title is of maximum 30 characters" }),
  classURL: z.string().url({ message: "Video Url must be Valid" }).optional(),
  courseId: z.string().min(1, { message: "UserId is required" }),
  description: z.string().min(1, { message: "Description is required" }).optional(),
});

export const updateUserDetailsValidation = z.object({
  fullName: z
    .string()
    .min(2, {
      message: "Full Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Full Name must not be longer than 30 characters.",
    }).optional(),
  bio: z.string().max(160).min(4).optional(),
});

