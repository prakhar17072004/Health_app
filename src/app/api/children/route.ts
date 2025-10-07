import { db } from "@/lib/db";
import { children } from "@/../drizzle/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

function formatDateToISO(dob: string) {
  // Handles DD/MM/YYYY or YYYY-MM-DD
  if (dob.includes("/")) {
    const [day, month, year] = dob.split("/");
    return `${year}-${month}-${day}`;
  }
  return dob; // assume it's already in ISO format
}

export async function POST(req: Request) {
  try {
    const { name, dob, userId } = await req.json();

    // Convert dob to ISO format
    const formattedDob = formatDateToISO(dob);

    const [child] = await db
      .insert(children)
      .values({ name, dob: formattedDob, userId })
      .returning();

    return NextResponse.json(child, { status: 201 });
  } catch (error) {
    console.error("Error inserting child:", error);
    return NextResponse.json({ error: "Failed to add child" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = Number(searchParams.get("userId"));

    const result = await db
      .select()
      .from(children)
      .where(eq(children.userId, userId));

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching children:", error);
    return NextResponse.json({ error: "Failed to fetch children" }, { status: 500 });
  }
}
