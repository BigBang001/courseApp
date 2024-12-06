import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay'
import { authOptions } from '../../auth/[...nextauth]/options';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request: NextRequest) {

    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return NextResponse.json({ message: 'Unauthorized', success: false }, { status: 401 });
    }

    try {
        const { amount, courseId } = (await request.json()) as {
            amount: string;
            courseId: string;
        };

        if (!amount || !courseId) {
            return NextResponse.json({ message: 'Invalid request payload', success: false }, { status: 400 });
        }

        const alreadyPurchasedCourse = await prisma.purchase.findFirst({
            where: {
                courseId,
                studentId: session.user.id,
            }
        })

        console.log(alreadyPurchasedCourse);
        

        if (alreadyPurchasedCourse?.status === "SUCCESS") {
            return NextResponse.json({
                success: false,
                message: "Course Already Purchased"
            }, { status: 400 })
        }

        var options = {
            amount: amount,
            currency: 'INR',
            receipt: `receipt_order_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        const createPurchase = prisma.purchase.create({
            data: {
                id: order.id,
                amountPaid: parseFloat(amount),
                paymentId: order.id,
                status: "PENDING",
                studentId: session.user.id,
                courseId: courseId
            }
        })

        await prisma.$transaction([createPurchase]);
        return NextResponse.json({ orderId: order.id }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Internal server error', success: false }, { status: 500 });
    }
}