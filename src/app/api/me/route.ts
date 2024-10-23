import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user || !session) {
        return NextResponse.json({
            success: false,
            message: "UnAuthorized",
        }, { status: 401 })
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id
            }, select: {
                bio: true, image: true
            }
        })
        return NextResponse.json({
            success: true,
            message: "Courses Fetched Succesfully",
            user
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error while fetching courses",
            error
        })
    }
}