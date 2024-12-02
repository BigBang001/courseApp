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

        // const coursePurchaseCounts = await prisma.purchasedCourses.groupBy({
        //     by: ['courseId'],
        //     _count: {
        //         userId: true,
        //     }
        // });



        // const courseDetails = await Promise.all(
        //     coursePurchaseCounts.map(async (purchase) => {
        //         const course = await prisma.course.findUnique({
        //             where: { id: purchase.courseId },
        //             select: {
        //                 title: true, Review: {
        //                     select: {
        //                         rating: true
        //                     }
        //                 }, price: true
        //             }
        //         });

        //         const totalRating = course?.Review.map((e) => e.rating);
        //         const avgRating = totalRating?.reduce((acc, r) => (acc + r) / totalRating.length);

        //         return {
        //             courseId: purchase.courseId,
        //             courseTitle: course?.title,
        //             purchaseCount: purchase._count.userId,
        //             avgRating: avgRating,
        //             coursePrice: course?.price
        //         };
        //     })
        // );

        const courseDetails = await prisma.course.findMany({
            where: {
                instructorId: user.id
            }, select: {
                _count: {
                    select: {
                        PurchasedCourses: true
                    }
                }, id: true, title: true, price: true, Review: {
                    select: {
                        rating: true
                    }
                }
            }
        })

        const courseSummary: { courseId: string, Students: number, Price: number, title: string, avgRating: number }[] = [];
        courseDetails.forEach((value) => {
            courseSummary.push({
                courseId: value.id,
                Students: value._count.PurchasedCourses,
                Price: value.price,
                title: value.title,
                avgRating: value.Review.length > 0 ? value.Review.reduce((acc, r) => acc + r.rating, 0) / value.Review.length : 0
            });
        });

        return NextResponse.json({
            success: true,
            message: "Purchase counts fetched successfully",
            courseDetails: courseSummary
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Error while fetching purchase counts",
            error: error.message
        }, { status: 500 });
    }
}
