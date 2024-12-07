import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const { accountNumber, ifscCode, accountHolderName } = await request.json();

        if (!accountNumber || !ifscCode || !accountHolderName) {
            return new Response("Missing required fields", { status: 400 });
        }

        const bankAccount = await prisma.bankAccount.create({
            data: {
                accountNumber,
                accountHolderName,
                ifscCode,
                userId: session.user.id,
            },
        });

        return new Response(JSON.stringify(bankAccount), { status: 201 });
    }
    catch (error) {
        console.error("Error adding bank account:", error);
        return new Response("Error adding bank account", { status: 500 });
    }
}
