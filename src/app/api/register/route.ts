import { NextResponse } from "next/server";
import {db } from "@/db/index"; // your drizzle instance
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "@/lib/hash";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Check if user exists
  const existing = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });

  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashed = await hashPassword(password);

  await db.insert(usersTable).values({
    email,
    password: hashed,
  });

  return NextResponse.json({ message: "User registered" });
}
