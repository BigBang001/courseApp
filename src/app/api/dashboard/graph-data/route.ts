import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id,
            },
        });

        if (!user || user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const groupedPurchases = await prisma.purchasedCourses.groupBy({
            by: ['createdAt'],
            _count: {
                id: true,
            },
            where: {
                course: {
                    instructorId: user.id,
                },
                createdAt: {
                    gte: new Date(new Date().getFullYear(), 0, 1),
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

        const mergedData = monthlyRevenue.reduce((acc: any, item) => {
            const month = item.date.toLocaleString("default", { month: "short" });
            const existing = acc.find((entry: any) => entry.month === month);
            if (existing) {
                existing.revenue += item.revenue;
            } else {
                acc.push({ month, revenue: item.revenue });
            }
            return acc;
        }, []);

        return NextResponse.json({ formattedData: mergedData });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
