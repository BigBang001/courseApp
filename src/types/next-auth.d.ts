// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      fullName: string;
      email: string;
      role: string;
      image: string;
      name: string;
    };
  }

  interface User {
    id: string;
    fullName: string;
    role: string;
  }
}
