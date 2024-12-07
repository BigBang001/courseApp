import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const url = new URL(request.url);
        const filter = url.searchParams.get("filter") || "";
        const courses = await prisma.course.findMany({
            where: {
                OR: [
                    { tags: { contains: filter, mode: "insensitive" } },
                    { title: { contains: filter, mode: "insensitive" } },
                ],
            },
            orderBy: { createdAt: "desc" },
            include: {
                Review: {
                    select: {
                        content: true,
                        id: true,
                        rating: true,
                        user: {
                            select: {
                                fullName: true,
                                image: true,
                            },
                        },
                        createdAt: true,
                    },
                    take: 10,
                    orderBy: { createdAt: "desc" },
                },
            },
        });

        return NextResponse.json({
            success: true,
            message: "Courses fetched successfully",
            courses,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: "Error while fetching courses",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
