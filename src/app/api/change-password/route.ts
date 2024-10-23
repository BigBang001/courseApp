import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);
    const { currentPassword, newPassword } = await request.json();

    const userId = session?.user.id;

    if (!userId) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized",
        }, { status: 401 });
    }

    try {
        const user = await prisma.user.findFirst({
            where: { id: userId },
            select: { password: true },
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, { status: 404 });
        }

        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) {
            return NextResponse.json({
                success: false,
                message: "Current password is incorrect",
            }, { status: 400 });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedNewPassword },
        });

        return NextResponse.json({
            success: true,
            message: "Password updated successfully",
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Error updating password",
            error: error.message,
        }, { status: 500 });
    }
}
