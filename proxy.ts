
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const hostname = request.nextUrl.hostname.toLowerCase();
  const pathname = request.nextUrl.pathname;

  // Route the admin subdomain to the existing admin login.
  if (
    hostname === "admin.constabamshortlets.com" &&
    pathname === "/"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";

    return NextResponse.rewrite(url);
  }

  // Leave all other routes unchanged.
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
