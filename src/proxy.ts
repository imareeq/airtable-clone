import { type NextRequest, NextResponse } from "next/server";
import { auth } from "~/server/better-auth";

export default async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/login";
  const isAuthApi = pathname.startsWith("/api/auth");

  if (!session) {
    if (!isLoginPage && !isAuthApi) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  if (isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
