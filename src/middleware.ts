import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./actions/main";

const authRoutes = ["/auth", "/login", "/register"];
const protectedRoutes = ["/users", "/orders"];
const publicRoutes = ["/about"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAuth = await isAuthenticated(request);

  // Token yok ve protected route → login
  if (
    !isAuth &&
    (protectedRoutes.some((route) => pathname.startsWith(route)) ||
      pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Token varsa ve login sayfasına geliyorsa → default protected page
  if (isAuth && (authRoutes.includes(pathname) || pathname === "/")) {
    return NextResponse.redirect(new URL("/users", request.url));
  }

  // Public route’lar
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }
  // Diğer durumlarda geç
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico|.well-known).*)"],
};
