import { NextResponse } from "next/server";
import { getLeads } from "@/lib/db";

export async function GET() {
  try {
    const leads = await getLeads();
    // Sort leads: newest first
    const sortedLeads = leads.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return NextResponse.json({ success: true, leads: sortedLeads });
  } catch (error) {
    console.error("Admin Leads API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
