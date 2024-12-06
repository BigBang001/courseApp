import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';
import prisma from '@/lib/prisma';

const generatedSignature = (
    razorpayOrderId: string,
    razorpayPaymentId: string
) => {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
        throw new Error(
            'Razorpay key secret is not defined in environment variables.'
        );
    }
    const sig = crypto
        .createHmac('sha256', keySecret)
        .update(razorpayOrderId + '|' + razorpayPaymentId)
        .digest('hex');
    return sig;
};


export async function POST(request: NextRequest) {

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json(
            { message: 'Unauthorized', success: false },
            { status: 401 }
        );

    }

    const { orderCreationId, razorpayPaymentId, razorpaySignature } =
        await request.json();
    try {
        if (!orderCreationId || !razorpayPaymentId || !razorpaySignature) {
            return NextResponse.json(
                { message: 'Invalid request payload', success: false },
                { status: 400 }
            );

        }

        const computedSignature = generatedSignature(orderCreationId, razorpayPaymentId);
        if (computedSignature !== razorpaySignature) {
            await prisma.purchase.update({
                where: { id: orderCreationId },
                data: {
                    status: 'FAILED',
                    paymentId: razorpayPaymentId,
                },
            });
            return NextResponse.json(
                { message: 'payment verification failed', success: false },
                { status: 400 }
            );
        }

        await prisma.purchase.update({
            where: { id: orderCreationId },
            data: {
                status: 'SUCCESS',
                paymentId: razorpayPaymentId,
            },
        });

        return NextResponse.json(
            { message: 'payment verified successfully', success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error during payment verification:', error);
        return NextResponse.json(
            { message: 'Internal server error', success: false },
            { status: 500 }
        );
    }
}