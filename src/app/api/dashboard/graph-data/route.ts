import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession();
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const groupedPurchases = await prisma.purchasedCourses.groupBy({
            by: ['createdAt'],
            _count: {
                id: true, // Count of purchases for each date
            },
            where: {
                createdAt: {
                    gte: new Date(new Date().getFullYear(), 0, 1), // Start of the year
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        const monthlyRevenue = await Promise.all(
            groupedPurchases.map(async (group) => {
                const purchases = await prisma.purchasedCourses.findMany({
                    where: {
                        createdAt: group.createdAt,
                    },
                    include: {
                        course: true, // Fetch related course details
                    },
                });

                const totalRevenue = purchases.reduce(
                    (sum, purchase) => sum + (purchase.course?.price || 0),
                    0
                );


                return {
                    date: group.createdAt,
                    revenue: totalRevenue,
                };
            })
        );

        const formattedData = monthlyRevenue.map((item) => ({
            month: item.date.toLocaleString('default', { month: 'short' }),
            revenue: item.revenue,
        }));
        return NextResponse.json({ formattedData });

    } catch (error) {
        console.log(error);
        NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}