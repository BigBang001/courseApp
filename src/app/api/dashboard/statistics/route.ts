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

        // Group purchase counts by courseId
        const coursePurchaseCounts = await prisma.purchasedCourses.groupBy({
            by: ['courseId'],
            _count: {
                userId: true,
            }
        });

        // Fetch all the reviews
        const reviews = await prisma.review.findMany({
            select: {
                rating: true
            }
        });

        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const avgRating = reviews.length > 0 ? totalRating / reviews.length : 0;

        const courseDetails = await Promise.all(
            coursePurchaseCounts.map(async (purchase) => {
                const course = await prisma.course.findUnique({
                    where: { id: purchase.courseId },
                    select: { title: true, Review: true, price: true }
                });

                return {
                    courseId: purchase.courseId,
                    courseTitle: course?.title,
                    purchaseCount: purchase._count.userId,
                    avgRating: avgRating,
                    coursePrice: course?.price
                };
            })
        );

        return NextResponse.json({
            success: true,
            message: "Purchase counts fetched successfully",
            courseDetails
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Error while fetching purchase counts",
            error: error.message
        }, { status: 500 });
    }
}
