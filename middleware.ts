// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   async function middleware(req) {
//     const token = req.nextauth.token;
//     const pathname = req.nextUrl.pathname;

//     // Redirect authenticated users from auth pages and home to explore
//     if (token && (pathname === "/signin" || pathname === "/signup" || pathname === "/")) {
//       return NextResponse.redirect(new URL("/explore", req.url));
//     }

//     // Protect admin routes
//     if (pathname.startsWith("/create/addcourse")) {
//       if (!token || token.role !== "admin") {
//         return NextResponse.redirect(new URL("/explore", req.url));
//       }
//     }

//     // Redirect unauthenticated users to signin
//     if (!token) {
//       const signinUrl = new URL("/signin", req.url);
//       signinUrl.searchParams.set("callbackUrl", pathname);
//       return NextResponse.redirect(signinUrl);
//     }

//     // Allow access to other routes
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//   }
// );

// export const config = {
//   matcher: [
//     "/dashboard",
//     "/signin",
//     "/signup",
//     "/",
//     "/create/addcourse",
//     "/explore/:path*",
//     "/profile/:path*",
//   ],
// };