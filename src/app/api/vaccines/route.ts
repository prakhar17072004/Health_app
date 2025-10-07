import vaccineData from "@/data/vaccineSchedule.json";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(vaccineData);
}
