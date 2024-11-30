import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request , secret: process.env.NEXTAUTH_SECRET });
    if (token) {
        if (request.nextUrl.pathname === "/" ||
            request.nextUrl.pathname === "/signin" ||
            request.nextUrl.pathname === "/signup") {
            return NextResponse.redirect(new URL(`/profile/${token.fullName}`, request.url))
        }
        if (request.nextUrl.pathname === "/create") {
            if (token.role !== "admin") {
                return NextResponse.redirect(new URL("/explore", request.url))
            }
        }
    }
    if(!token === undefined) {
        return NextResponse.redirect(new URL("/signin", request.url))
    }
    return NextResponse.next()
}
