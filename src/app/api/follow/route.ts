import { followUser, unFollowUser } from "@/services/user";
import { withSessionUser } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, follow } = await req.json();

    if (!id || follow == null) {
      return new Response("Bad Request", { status: 400 });
    }

    const request = follow ? followUser : unFollowUser;

    return request(user.id, id)
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
