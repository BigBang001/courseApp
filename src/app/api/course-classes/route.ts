import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
  const { classId } = await request.json();

  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      }, { status: 402 });
    }

    const prevOption = await prisma.recordedClass.findUnique({
      where: {
        id: classId,
      },
      select: {
        isCompleted: true,
        id: true,
      },
    });

    if (!prevOption) {
      return NextResponse.json({
        success: false,
        message: "Class not found",
      }, { status: 404 });
    }

    const updatedClass = await prisma.recordedClass.update({
      where: {
        id: prevOption.id,
      },
      data: {
        isCompleted: !prevOption.isCompleted,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Class has been ${updatedClass.isCompleted ? "Marked as complete" : "Marked as incomplete"}`
    });

  } catch (error) {
    console.error("Error updating class status:", error);
    return NextResponse.json({
      success: false,
      message: "Server Error",
    }, { status: 500 });
  }
}
