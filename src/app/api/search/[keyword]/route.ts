import { getSearchUsers } from "@/services/user";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    keyword: string;
  };
};

export async function GET(_: NextRequest, context: Context) {
  return getSearchUsers(context.params.keyword).then((data) =>
    NextResponse.json(data)
  );
}
