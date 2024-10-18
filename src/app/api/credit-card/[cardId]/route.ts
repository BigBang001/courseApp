import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: Request, { params }: { params: { cardId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: "unAuthorized",
        }, { status: 401 })
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: session.user.email,
                role: "user"
            }
        })

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, { status: 404 })
        }

        await prisma.creditCard.delete({
            where: {
                id: params.cardId
            }
        });

        return NextResponse.json({
            success: true,
            message: "Credit card deleted succesfully",
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error while deleting Card",
            error
        }, { status: 500 })
    }
}