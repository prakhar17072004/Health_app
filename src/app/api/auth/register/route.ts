import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/../drizzle/schema";
import { hashPassword } from "@/lib/hash";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  const hashed = await hashPassword(password);

  const [user] = await db.insert(users).values({ name, email, password: hashed }).returning();
  return NextResponse.json(user);
}
