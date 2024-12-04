import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request: NextRequest) {
    try {
        const { amount } = (await request.json()) as {
            amount: string;
        };

        var options = {
            amount: amount,
            currency: 'INR',
            receipt: 'rcp1',
        };
        const order = await razorpay.orders.create(options);

        return NextResponse.json({ orderId: order.id }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error', isOk: false }, { status: 500 });
    }
}