export const runtime = "edge";

import { NextResponse } from "next/server";
import { getAllLeagueSchedules } from "@/lib/getLeagueSchedules";

export async function GET() {
  try {
    const schedules = await getAllLeagueSchedules();

    return NextResponse.json(
      { success: true, data: schedules },
      { status: 200 }
    );
  } catch (err) {
    console.error("Failed to fetch schedules:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch schedules" },
      { status: 500 }
    );
  }
}
