import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    const { email } = await request.json();
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: `User not found with this ${email} address`,
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "User found",
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Error while checking user",
            error: error.message
        }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const { email, password } = await request.json();
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: `User not found with this ${email} address`,
            }, { status: 404 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.update({
            where: {
                email
            },
            data: {
                password: hashedPassword
            }
        });

        return NextResponse.json({
            success: true,
            message: "User password updated successfully",
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Error while updating user password",
            error: error.message
        }, { status: 500 });
    }
}