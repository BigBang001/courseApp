import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/options";
import bcrypt from "bcryptjs"
import { creditCardSValidation } from "@/validations/validation";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: "unAuthorized",
        }, { status: 401 })
    }

    const { bankName, accountNumber, cvv, expiryDate, cardHolderName } = await request.json();
    const { success, error } = creditCardSValidation.safeParse({ cardHolderName, bankName, accountNumber, cvv, expiryDate })
    if (!success) {
        return NextResponse.json({
            success: false,
            message: "Validation error",
            error
        }, { status: 400 })
    }
    try {


        const user = await prisma.user.findFirst({
            where: {
                email: session.user.email,
                role: "user"
            }
        })

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not Found",
            }, { status: 404 })
        }

        const account = await prisma.creditCard.findFirst({
            where: { accountNumber: accountNumber }
        })

        if (account?.accountNumber === accountNumber) {
            return NextResponse.json({
                success: false,
                message: "Account number is Invalid or Not Unique",
            }, { status: 404 })
        }

        const hashedCVV = await bcrypt.hash(cvv, 10);

        await prisma.creditCard.create({
            data: {
                cardHolderName,
                accountNumber, bankName, expiryDate, userId: user.id,
                cvv: hashedCVV
            }
        })

        return NextResponse.json({
            success: true,
            message: "Credit Card Added Succesfully",
        }, { status: 201 })

    } catch (error: any) {
        console.log(error.meta.target[0]);

        return NextResponse.json({
            success: false,
            message: "Error while adding card",
            error: error.message
        }, { status: 500 })
    }
}

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: "unAuthorized",
        }, { status: 401 })
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: session.user.email,
                role: "user"
            }
        })

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, { status: 404 })
        }

        const cards = await prisma.creditCard.findMany({
            where: {
                userId: user.id
            }, orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json({
            success: true,
            message: "Credit Cards fetched succesfully",
            cards
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error while fetching Cards",
            error
        }, { status: 500 })
    }
}
