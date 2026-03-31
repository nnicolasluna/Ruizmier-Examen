import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    const PublicPath =
        pathname === "/login" ||
        pathname === "/signup" ||
        pathname.startsWith("/api/auth");
    if (PublicPath) {
        if (token && (pathname === "/login" || pathname === "/signup")) {
            return NextResponse.redirect(new URL("/reviews", request.url));
        }
        return NextResponse.next();
    }
}
