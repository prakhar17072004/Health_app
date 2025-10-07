import { db } from "@/lib/db";
import { children, users } from "@/../drizzle/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

// Convert DD/MM/YYYY → YYYY-MM-DD
function formatDateToISO(dob: string) {
  if (dob.includes("/")) {
    const [day, month, year] = dob.split("/");
    return `${year}-${month}-${day}`;
  }
  return dob; // assume already ISO
}

export async function POST(req: Request) {
  try {
    const { userName, childName, dob } = await req.json();

    // 1️⃣ Validate input
    if (!userName || !childName || !dob) {
      return NextResponse.json(
        { error: "userName, childName, and dob are required" },
        { status: 400 }
      );
    }

    // 2️⃣ Format DOB
    const formattedDob = formatDateToISO(dob);

    // 3️⃣ Check if user exists
    let [user] = await db
      .select()
      .from(users)
      .where(eq(users.name, userName));

    // 4️⃣ Create user if not exists
    if (!user) {
      [user] = await db
        .insert(users)
        .values({
          name: userName,
          email: `${userName.replace(/\s+/g, "").toLowerCase()}@example.com`,
          password: "defaultpassword123", // hash in real apps
          createdAt: new Date(),
        })
        .returning();
    }

    // 5️⃣ Insert child linked to user
    const [child] = await db
      .insert(children)
      .values({ name: childName, dob: formattedDob, userId: user.id })
      .returning();

    return NextResponse.json({ user, child }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to add user or child" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = Number(searchParams.get("userId"));

    if (!userId) {
      return NextResponse.json(
        { error: "userId query parameter is required" },
        { status: 400 }
      );
    }

    const result = await db
      .select()
      .from(children)
      .where(eq(children.userId, userId));

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching children:", error);
    return NextResponse.json(
      { error: "Failed to fetch children" },
      { status: 500 }
    );
  }
}
