// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   async function middleware(req) {
//     const token = req.nextauth.token;
//     const pathname = req.nextUrl.pathname;

//     if (token && (pathname === "/signin" || pathname === "/signup" || pathname === "/")) {
//       return NextResponse.redirect(new URL("/explore", req.url));
//     }

//     if (pathname.startsWith("/create/addcourse")) {
//       if (!token || token.role !== "admin") {
//         return NextResponse.redirect(new URL("/explore", req.url));
//       }
//     }

//     if (!token) {
//       return NextResponse.redirect(new URL("/signin",req.url))
//     }

//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//   },
// );

// export const config = {
//   matcher: ["/dashboard", "/signin", "/signup", "/","/create/addcourse"],
// };
