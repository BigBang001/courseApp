import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

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
    const { orderCreationId, razorpayPaymentId, razorpaySignature } =
        await request.json();
    try {

        if (!orderCreationId || !razorpayPaymentId || !razorpaySignature) {
            return NextResponse.json(
                { message: 'Invalid request payload', isOk: false },
                { status: 400 }
            );
        }

        const computedSignature = generatedSignature(orderCreationId, razorpayPaymentId);
        if (computedSignature !== razorpaySignature) {
            return NextResponse.json(
                { message: 'payment verification failed', isOk: false },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: 'payment verified successfully', isOk: true },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error during payment verification:', error);
        return NextResponse.json(
            { message: 'Internal server error', isOk: false },
            { status: 500 }
        );
    }
}