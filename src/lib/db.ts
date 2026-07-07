export interface Lead {
  id: string;
  name: string;
  phone: string;
  studentClass: string;
  syllabus: string;
  createdAt: string;
  status: "pending" | "contacted" | "scheduled" | "enrolled" | "rejected";
  notes?: string;
}

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || "";

function getHeaders() {
  return {
    "Content-Type": "application/json",
    "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`,
  };
}

// Map database column names (snake_case) to application types (camelCase)
function mapFromDb(dbLead: any): Lead {
  return {
    id: dbLead.id,
    name: dbLead.name,
    phone: dbLead.phone,
    studentClass: dbLead.student_class,
    syllabus: dbLead.syllabus,
    createdAt: dbLead.created_at,
    status: dbLead.status,
    notes: dbLead.notes || "",
  };
}

export async function getLeads(): Promise<Lead[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.warn("Warning: Supabase credentials missing. Returning empty leads.");
    return [];
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads?select=*`, {
      method: "GET",
      headers: getHeaders(),
      next: { revalidate: 0 }, // Bypass Next.js cache
    } as any);

    if (!res.ok) {
      throw new Error(`Supabase read error: ${res.statusText}`);
    }

    const data = await res.json();
    return data.map(mapFromDb);
  } catch (error) {
    console.error("Error reading leads from Supabase:", error);
    return [];
  }
}

export async function addLead(leadData: Omit<Lead, "id" | "createdAt" | "status">): Promise<Lead> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Supabase credentials missing.");
  }

  const payload = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    name: leadData.name,
    phone: leadData.phone,
    student_class: leadData.studentClass,
    syllabus: leadData.syllabus,
    status: "pending",
    notes: "",
  };

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        ...getHeaders(),
        "Prefer": "return=representation",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`Supabase insert error: ${res.statusText} - ${errBody}`);
    }

    const data = await res.json();
    return mapFromDb(data[0]);
  } catch (error) {
    console.error("Error adding lead to Supabase:", error);
    throw error;
  }
}

export async function updateLead(
  id: string,
  updates: Partial<Pick<Lead, "status" | "notes">>
): Promise<Lead | null> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Supabase credentials missing.");
  }

  const payload: any = {};
  if (updates.status) payload.status = updates.status;
  if (updates.notes !== undefined) payload.notes = updates.notes;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        ...getHeaders(),
        "Prefer": "return=representation",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Supabase update error: ${res.statusText}`);
    }

    const data = await res.json();
    if (data.length === 0) return null;
    return mapFromDb(data[0]);
  } catch (error) {
    console.error("Error updating lead in Supabase:", error);
    throw error;
  }
}

export async function deleteLead(id: string): Promise<boolean> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Supabase credentials missing.");
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Supabase delete error: ${res.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting lead from Supabase:", error);
    return false;
  }
}
