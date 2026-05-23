import { NextResponse, type NextRequest } from "next/server";

const publicPaths = ["/login", "/api/auth/login", "/_next", "/favicon.ico"];

export function middleware(req: NextRequest) {
  if (process.env.AUTH_REQUIRED !== "true") {
    return NextResponse.next();
  }

  const { pathname } = req.nextUrl;

  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const session = req.cookies.get("trezze_session");

  if (!session) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth/logout).*)"],
};
