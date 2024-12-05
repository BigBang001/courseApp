import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export default async function POST(request: Request) {
    const { purchaseId } = await request.json();

    try {
        // Fetch Purchase Details
        const purchase = await prisma.purchase.findUnique({
            where: { id: purchaseId },
            include: { course: { include: { instructor: true } } },
        });

        if (!purchase || purchase.status !== 'SUCCESS') {
            return NextResponse.json({
                success: false,
                message: 'Invalid purchase or payment not successful'
            }, { status: 400 })
        }

        const { amountPaid, course } = purchase;
        const instructor = course.instructor;

        if (!instructor || !instructor.bankAccount) {
            return NextResponse.json({
                success: false,
                message: 'Instructor bank details not found'
            }, { status: 400 })
        }

        // const razorpay = new RazorpayX({
        //     key_id: process.env.RAZORPAYX_KEY_ID!,
        //     key_secret: process.env.RAZORPAYX_KEY_SECRET,
        // });

        // // Process Payout
        // const payout = await razorpay.payouts.create({
        //     account_number: "Your RazorpayX Account Number",
        //     fund_account: {
        //         account_type: "bank_account",
        //         bank_account: {
        //             name: instructor.fullName,
        //             account_number: instructor.bankAccount,
        //             ifsc: instructor.ifsc, // Add this field in the instructor schema
        //         },
        //     },
        //     amount: amountPaid * 0.9 * 100, // Deduct 10% platform fee
        //     currency: "INR",
        //     mode: "IMPS",
        //     purpose: "payout",
        //     narration: `Payout for course ${course.title}`,
        // });

        // // Record Payout in DB
        // await prisma.payout.create({
        //     data: {
        //         instructorId: instructor.id,
        //         amount: amountPaid * 0.9,
        //         status: 'PENDING',
        //         // fundAccountId: payout.fund_account_id,
        //         // transactionId: payout.id,
        //         // narration: payout.narration,
        //     },
        // });
        return NextResponse.json({
            success: true,
            // message: 'Payout initiated successfully', payout
        }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error'
        }, { status: 500 })
    }
}
