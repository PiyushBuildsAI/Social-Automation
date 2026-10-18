import { NextResponse, type NextRequest } from "next/server";

/**
 * Optimistic auth gate (Next 16 calls middleware "Proxy").
 *
 * This only checks that a session cookie exists — the authoritative check runs
 * server-side in `requireSession()` on every protected page. Fast redirect, no
 * database hit on every navigation.
 */

const PROTECTED_PREFIXES = [
  "/home",
  "/inbox",
  "/automations",
  "/leads",
  "/analytics",
  "/broadcast",
  "/schedule",
  "/notifications",
  "/profile",
];

const SIGNED_IN_ONLY = ["/signin", "/signup"];

function hasSessionCookie(request: NextRequest) {
  return request.cookies.getAll().some((cookie) => cookie.name.includes("session_token"));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const signedIn = hasSessionCookie(request);

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (isProtected && !signedIn) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (!signedIn && SIGNED_IN_ONLY.includes(pathname)) {
    return NextResponse.next();
  }

  if (signedIn && SIGNED_IN_ONLY.includes(pathname)) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/:path*",
    "/inbox/:path*",
    "/automations/:path*",
    "/leads/:path*",
    "/analytics/:path*",
    "/broadcast/:path*",
    "/schedule/:path*",
    "/notifications/:path*",
    "/profile/:path*",
    "/signin",
    "/signup",
  ],
};
