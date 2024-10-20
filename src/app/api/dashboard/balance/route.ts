import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET() {

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: "unAuthorized",
        }, { status: 401 });
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id,
                role: "admin"
            }
        })

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, { status: 404 });
        }

        const balance = await prisma.user.findFirst({
            where: {
                id: user.id
            }, select: {
                balance: true
            }
        })

        return NextResponse.json({
            success: true,
            message: "Balance fetched Succesfully",
            balance
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Error while fetching balance",
            error: error.message
        }, { status: 500 });
    }
}
