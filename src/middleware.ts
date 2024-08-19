import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const user = session?.user;
  console.log(user);
  if (!user) {
    if (req.nextUrl.pathname.startsWith("/api")) {
      return new Response("Authentication Error", { status: 401 });
    }

    const { pathname, search, origin, basePath } = req.nextUrl;
    const signInUrl = new URL(`${basePath}/signin`, origin);
    signInUrl.searchParams.append(
      "callbackUrl",
      `${basePath}${pathname}${search}`
    );

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/new",
    "/api/bookmarks",
    "/api/comments",
    "/api/likes",
    "/api/follow",
    "/api/me",
    "/api/posts/:path*",
  ],
};
