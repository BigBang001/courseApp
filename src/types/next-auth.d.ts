import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        email: string;
        fullName: string;
        role: string;
        createdAt: Date;
        bio: string | null;
        image: string | null;
    }

    interface Session {
        user: {
            id: string;
            email: string;
            fullName: string;
            role: string;
            bio: string | null;
            image: string | null;
        };
    }
}
