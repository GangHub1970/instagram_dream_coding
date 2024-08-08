import { getSearchUsers } from "@/services/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return getSearchUsers().then((data) => NextResponse.json(data));
}
