import { getSearchUsers } from "@/services/user";
import { NextResponse } from "next/server";

export async function GET() {
  return getSearchUsers().then((data) => NextResponse.json(data));
}
