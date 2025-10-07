import { db } from "@/lib/db";
import { vaccineStatus } from "@/../drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: any) {
  const { childId } = params;
  const { vaccineId, status } = await req.json();

  const updated = await db
    .update(vaccineStatus)
    .set({ status })
    .where(eq(vaccineStatus.childId, Number(childId)))
    .where(eq(vaccineStatus.vaccineId, vaccineId))
    .returning();

  return NextResponse.json(updated);
}
