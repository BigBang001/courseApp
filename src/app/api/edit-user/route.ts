import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);
    const { fullName, bio } = await request.json()
    
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: session?.user.id
            }
        })
        console.log("user : ",user?.bio);

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized",
            }, { status: 404 })
        }

        await prisma.user.update({
            where: {
                id: session?.user.id
            },
            data: {
                fullName, bio
            }
        })

        return NextResponse.json({
            success: true,
            message: "User details updated succesfully",
        }, { status: 201 })

    } catch (error :  any) {
        return NextResponse.json({
            success: false,
            message: "Error while updating user details",
            error : error.message
        }, { status: 500 })
    }
}