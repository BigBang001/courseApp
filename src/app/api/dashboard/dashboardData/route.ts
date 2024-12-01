import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
        role: "admin",
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found or not an instructor",
        },
        { status: 404 }
      );
    }

    // Fetch all reviews for instructor's courses
    const courses = await prisma.course.findMany({
      where: {
        instructorId: user.id,
      },
      select: {
        Review: {
          select: {
            rating: true,
          },
        },
      },
    });

    // Calculate the average rating
    const allRatings = courses.flatMap((course) => course.Review.map((r) => r.rating));
    const avgRating = allRatings.length > 0 ? allRatings.reduce((acc, r) => acc + r, 0) / allRatings.length : 0;

    // Count unique enrolled users
    const totalUsers = await prisma.purchasedCourses.count({
      where: {
        course: {
          instructorId: user.id,
        },
      },
    });
    
    // Get total revenue
    const revenue = user.balance;

    // Count total courses for the instructor
    const totalCourses = await prisma.course.count({
      where: {
        instructorId: user.id,
      },
    });

    const data = {
      avgRating,
      totalUsers: totalUsers,
      revenue,
      totalCourses,
    };

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error while fetching dashboard data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
