import { db } from "@/lib/db";
import { vaccineStatus } from "@/../drizzle/schema"; // ✅ simplified import
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { childId: string } }) {
  try {
    const { childId } = params;
    const { vaccineId, status } = await req.json();

    if (!childId || !vaccineId || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updated = await db
      .update(vaccineStatus)
      .set({ status })
      .where(
        and(
          eq(vaccineStatus.childId, Number(childId)),
          eq(vaccineStatus.vaccineId, vaccineId)
        )
      )
      .returning();

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating vaccine status:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
