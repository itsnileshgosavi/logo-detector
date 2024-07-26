import { NextResponse } from "next/server";

export function middleware(request) {
  const JwtToken = request.cookies.get("JwtToken")?.value;

  // Allow access to login and signup pages
  if (
    request.nextUrl.pathname === "/api/login" ||
    request.nextUrl.pathname === "/api/signup"
  ) {
    return;
  }

  const loggedInUserNotAccessPath =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  // Redirect logged-in users trying to access login or signup pages
  if (loggedInUserNotAccessPath) {
    if (JwtToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // Redirect users trying to access protected pages without logging in
    if (!JwtToken) {
      if (request.nextUrl.pathname.startsWith("/api")) {
        return new NextResponse(
          { message: "Access Denied", success: false },
          {
            status: 401,
          }
        );
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/",
    "/signup",
    "/login",
    "/detect",
    "/genai",
    "/profile/:path*",
    "/api/:path*",
  ],
};