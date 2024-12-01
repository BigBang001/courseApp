import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return new Response(JSON.stringify({
            success: false,
            message: "unAuthorized",
        }), { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id,
                role: "admin"
            }
        })

        if (!user) {
            return new Response(JSON.stringify({
                success: false,
                message: "User not found",
            }), { status: 404 });
        }

        const recentUsers = await prisma.course.findFirst({
            where: {
                instructorId: user.id
            }, select: {
                PurchasedCourses: {
                    include: {
                        User: {
                            select: {
                                fullName: true,
                                email: true,
                                id: true,
                                image: true,
                            }
                        }

                    }
                }
            },orderBy: {
                createdAt: 'desc'
            }
        }
        )

        return NextResponse.json({
            recentUsers
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Error while fetching balance",
            error: error.message
        }, { status: 500 });
    }

}