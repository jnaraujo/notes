import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect("/login");
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
