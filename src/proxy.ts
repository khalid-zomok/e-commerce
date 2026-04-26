import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const protectedRoutes = ["/cart", "/wishlist", "/checkout", "/allorders"];
    const authRoutes = ["/login", "/register"];
    const myPath = request.nextUrl.pathname;

    const myToken = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === "production",
    });

    // FIX 1: Check if the token object exists at all, 
    // rather than looking for a specific '.accessToken' property.
    const isAuthenticated = !!myToken;

    // FIX 2: Better matching logic
    const isProtectedRoute = protectedRoutes.some((path) => myPath.startsWith(path));
    const isAuthRoute = authRoutes.some((path) => myPath.startsWith(path));

    if (!isAuthenticated && isProtectedRoute) {
        const url = new URL("/login", request.url);
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
    }

    if (isAuthenticated && isAuthRoute) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

// FIX 3: THIS MUST BE UNCOMMENTED
export const config = {
  matcher: [
    "/cart/:path*",
    "/wishlist/:path*",
    "/checkout/:path*",
    "/allorders/:path*",
    "/login",
    "/register"
  ]
};