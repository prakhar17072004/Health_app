import { db } from "@/lib/db";
import { children } from "@/../drizzle/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, dob, userId } = await req.json();
  const [child] = await db.insert(children).values({ name, dob, userId }).returning();
  return NextResponse.json(child);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = Number(searchParams.get("userId"));
  const all = await db.select().from(children).where(children.userId.eq(userId));
  return NextResponse.json(all);
}
