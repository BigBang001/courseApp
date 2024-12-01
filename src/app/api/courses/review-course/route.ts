import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { reviewValidation } from "@/validations/validation";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized",
        }, { status: 401 });
    }

    const { content, courseId, rating, userId } = await request.json();
    const { success, error } = reviewValidation.safeParse({ content, courseId, rating, userId });

    if (!success) {
        return NextResponse.json({
            success: false,
            message: error?.format().content?._errors,
            error
        }, { status: 400 });
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: session.user.email,
                role: "user"
            }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, { status: 404 });
        }

        const purchasedCourseUser = await prisma.purchasedCourses.findFirst({
            where: {
                userId,
                courseId
            }
        });

        if (!purchasedCourseUser) {
            return NextResponse.json({
                success: false,
                message: "Cannot give reviews without purchasing the course",
            }, { status: 400 });
        }

        const existingReview = await prisma.review.findFirst({
            where: {
                userId,
                courseId
            }
        });

        if (existingReview) {
            return NextResponse.json({
                success: false,
                message: "You have already reviewed this course",
            }, { status: 400 });
        }

        const review = await prisma.review.create({
            data: {
                content,
                courseId,
                rating,
                userId
            }
        });

        return NextResponse.json({
            success: true,
            message: "Thanks for your review",
            review
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Server error during add rating",
            error: error.message
        }, { status: 500 });
    }
}
