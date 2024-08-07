import { getLikedPostsOf, getPostsOf, getSavedPostsOf } from "@/services/post";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    slug: string[];
  };
};

export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;

  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const [username, query] = slug;

  let request = getPostsOf;
  if (query === "likes") {
    request = getLikedPostsOf;
  } else if (query === "saved") {
    request = getSavedPostsOf;
  }

  return request(username).then((data) => NextResponse.json(data));
}
