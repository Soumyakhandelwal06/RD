import { NextResponse } from "next/server";
import { addLead } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, studentClass, syllabus } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Invalid name. Must be at least 2 characters." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string") {
      return NextResponse.json(
        { error: "Invalid phone number." },
        { status: 400 }
      );
    }

    // Basic phone pattern validation (digits, spaces, hyphens, optional plus)
    const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, "");
    if (cleanPhone.length < 8 || cleanPhone.length > 15 || !/^\d+$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Invalid phone number format." },
        { status: 400 }
      );
    }

    const validClasses = ["8", "9", "10", "11", "12", "entrance"];
    if (!studentClass || !validClasses.includes(String(studentClass))) {
      return NextResponse.json(
        { error: "Invalid class selection." },
        { status: 400 }
      );
    }

    const validSyllabi = ["state", "cbse", "entrance"];
    if (!syllabus || !validSyllabi.includes(String(syllabus))) {
      return NextResponse.json(
        { error: "Invalid syllabus selection." },
        { status: 400 }
      );
    }

    const newLead = await addLead({
      name: name.trim(),
      phone: phone.trim(),
      studentClass: String(studentClass),
      syllabus: String(syllabus),
    });

    return NextResponse.json(
      { success: true, lead: newLead },
      { status: 201 }
    );
  } catch (error) {
    console.error("API error submitting lead:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
