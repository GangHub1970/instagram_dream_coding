import { auth } from "@/auth";
import { followUser, unFollowUser } from "@/services/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { id, follow } = await req.json();

  if (!id || follow === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = follow ? followUser : unFollowUser;

  return request(user.id, id)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
