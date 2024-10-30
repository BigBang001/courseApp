import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })

    if (token) {
        if (request.nextUrl.pathname === "/" ||
            request.nextUrl.pathname === "/signin" ||
            request.nextUrl.pathname === "/signup") {
            return NextResponse.redirect(new URL(`/profile/${token.fullName}`, request.url))
        }
        if (request.nextUrl.pathname === "/create/addcourse") {
            if (token.role !== "admin") {
                return NextResponse.redirect(new URL("/explore", request.url))
            }
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}
