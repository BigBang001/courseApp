import { signupValidation } from "@/validations/validation";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import prisma from "@/lib/prisma";


export async function POST(request: Request) {
    const { fullName, email, password, role } = await request.json();
    const { success, error } = signupValidation.safeParse({ fullName, email, password, role });
    
    if (!success) {
        return NextResponse.json({
            success: false,
            message: "Validation Error",
            error: error.format()
        }, { status: 400 });
    }
    
    try {
        const existUser = await prisma.user.findFirst({
            where: { email }
        });

        if (existUser) {
            return NextResponse.json({
                success: true,
                message: "User already exists",
            }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                fullName, 
                email, 
                password: hashedPassword, 
                role
            }
        });

        return NextResponse.json({
            success: true,
            message: "User registered successfully",
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Error while registering user",
            error: error.message
        }, { status: 500 });
    }
}
