import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/../drizzle/schema";
import { eq } from "drizzle-orm";
import { verifyPassword } from "@/lib/hash";
import { createToken } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const valid = await verifyPassword(password, user.password);
  if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = createToken(user.id);
  return NextResponse.json({ token });
}
