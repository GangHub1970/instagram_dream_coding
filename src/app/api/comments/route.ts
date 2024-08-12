import { auth } from "@/auth";
import { addComment } from "@/services/post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { id, comment } = await req.json();

  if (!id || comment === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  return addComment(id, user.id, comment)
    .then((data) => NextResponse.json(data))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
