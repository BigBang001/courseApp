import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import prisma from "@/lib/prisma";

export async function POST(request: Request, { params }: { params: { courseId: string } }) {
    const { courseId, cvv } = await request.json(); // Assuming creditCardId is passed

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized",
        }, { status: 401 });
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                id: session.user.id,
                role: "user",
            },
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, { status: 404 });
        }

        // Check if user already purchased this course
        const findAlreadyPurchasedCourse = await prisma.purchasedCourses.findFirst({
            where: {
                courseId: courseId,
                userId: user.id,
            },
        });

        if (findAlreadyPurchasedCourse) {
            return NextResponse.json({
                success: false,
                message: "Course already purchased",
            }, { status: 400 });
        }

        // Check credit card belonging to the user
        const creditCard = await prisma.creditCard.findFirst({
            where: {
                id: params.courseId, // Should refer to credit card, not course ID
                userId: user.id,
            },
        });

        if (!creditCard) {
            return NextResponse.json({
                success: false,
                message: "Credit card not found",
            }, { status: 404 });
        }

        // Validate CVV
        const isCVVValid = await bcrypt.compare(cvv, creditCard.cvv);
        if (!isCVVValid) {
            return NextResponse.json({
                success: false,
                message: "Invalid CVV",
            }, { status: 402 });
        }

        // Fetch the course to be purchased
        const course = await prisma.course.findFirst({
            where: {
                id: courseId,
            },
        });

        if (!course) {
            return NextResponse.json({
                success: false,
                message: "Course not found",
            }, { status: 404 });
        }

        // Check if the credit card has enough balance
        if (creditCard.balance < course.price) {
            return NextResponse.json({
                success: false,
                message: "Insufficient balance",
            }, { status: 400 });
        }

        // Execute the purchase transaction
        const purchase = await prisma.$transaction(async (prisma) => {
            // Decrement balance from user's credit card
            await prisma.creditCard.update({
                where: {
                    id: creditCard.id,
                },
                data: {
                    balance: {
                        decrement: course.price,
                    },
                },
            });

            // Create purchase record
            const newPurchase = await prisma.purchasedCourses.create({
                data: {
                    courseId: course.id,
                    userId: user.id,
                },
                select: {
                    course: true,
                },
            });

            // Increment the course owner's balance (admin or creator)
            await prisma.user.update({
                where: {
                    id: course.userId,
                },
                data: {
                    balance: {
                        increment: course.price,
                    },
                },
            });

            return newPurchase;
        });

        return NextResponse.json({
            success: true,
            message: "Purchase successful",
            purchase,
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Server error",
            error: error.message,
        }, { status: 500 });
    }
}
