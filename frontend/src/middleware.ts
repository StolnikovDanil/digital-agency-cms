import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "admin_token";

function getSecretKey() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("Missing JWT_SECRET environment variable");
    }
    return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname === "/admin/login") {
        return NextResponse.next();
    }

    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
        await jwtVerify(token, getSecretKey());
        return NextResponse.next();
    } catch {
        const response = NextResponse.redirect(new URL("/admin/login", request.url));
        response.cookies.delete(COOKIE_NAME);
        return response;
    }
}

export const config = {
    matcher: ["/admin/:path*"],
};