import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/options";
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: "UnAuthorized",
        }, { status: 401 })
    }
    const { password } = await request.json();
    try {
        const user = await prisma.user.findUnique({
            where : {
                id : session.user.id
            }
        })
        

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, { status: 404 })
        }

        const unhashedPassword = await bcrypt.compare(password, user.password);
        if (!unhashedPassword) {
            return NextResponse.json({
                success: false,
                message: "Inccorect Password",
            }, { status: 402 })
        }

        await prisma.user.delete({
            where: {
                id: user.id
            }
        })

        return NextResponse.json({
            success: true,
            message: "User Account Decativated successfully",
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error while deactivating users account",
            error
        }, { status: 500 })
    }
}