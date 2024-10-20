import prisma from "@/lib/prisma";
import { courseValidation } from "@/validations/validation";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: Request) {
    const { title, description, shortDescription, tags, thumbnail, price, duration, level } = await request.json();
    const { success, error } = courseValidation.safeParse({
        title,
        tags,
        level,
        shortDescription,
        description,
        thumbnail,
        price,
        duration
    });
    const session = await getServerSession(authOptions);
    if (!success) {
        return NextResponse.json({
            success: false,
            message: "Validation Error",
            error: error.errors
        }, { status: 400 })
    }

    if (!session?.user || !session) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized",
        }, { status: 401 }) 
    }

    try {
        console.log("hlo");
        
        const user = await prisma.user.findFirst({
            where: {
                email: session.user.email,
                role : "admin"
            }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found || User not admin",
            }, { status: 404 });
        }

        const course = await prisma.course.create({
            data: {
                title,
                description,
                price,
                duration,
                level,
                thumbnail,
                userId: user.id,
                shortDescription,
                tags
            }
        });

        return NextResponse.json({
            success: true,
            message: "Course created successfully",
            course
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Error while creating course",
            error: error.message
        }, { status: 500 });
    }
}
