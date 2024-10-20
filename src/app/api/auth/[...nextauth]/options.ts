import prisma from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "kushchaudhary@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { email, password } = credentials || {};

                if (!email || !password) {
                    throw new Error("Email and password are required");
                }

                const user = await prisma.user.findFirst({
                    where: { email },
                    select: { id: true, email: true, fullName: true, role:true,createdAt: true, password : true }
                });
                
                if (!user) {
                    throw new Error("User not found with this email");
                }

                const passwordMatch = await bcrypt.compare(password, user.password);

                if (!passwordMatch) {
                    throw new Error("Password didn't match");
                }

                const { password: _, ...userWithoutPassword } = user;
                return userWithoutPassword;
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
        })
    ],
    pages: {
        signIn: "/signin",
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXT_AUTH_SECRET || "next_auth_secret",
    
    callbacks: {
        async session({ session, token }: { session: any, token: any }) {
            session.user.id = token.id
            session.user.email = token.email;
            session.user.fullName = token.fullName; 
            session.user.role = token.role
            session.user.image = token.image
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id,
                token.email = user.email;
                token.fullName = user.fullName
                token.role = user.role
                token.image = user.image
            }
            return token;
        }
    }
}
