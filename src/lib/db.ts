import { promises as fs } from "fs";
import path from "path";

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

const DATA_DIR = path.join(process.cwd(), "src", "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

// Ensure the data directory and leads file exist
async function ensureDb() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    // Already exists or permission issue
  }

  try {
    await fs.access(LEADS_FILE);
  } catch {
    // File doesn't exist, create it with empty array
    await fs.writeFile(LEADS_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

export async function getLeads(): Promise<Lead[]> {
  await ensureDb();
  try {
    const data = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(data) as Lead[];
  } catch (error) {
    console.error("Error reading leads file:", error);
    return [];
  }
}

export async function addLead(leadData: Omit<Lead, "id" | "createdAt" | "status">): Promise<Lead> {
  await ensureDb();
  const leads = await getLeads();

  const newLead: Lead = {
    ...leadData,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    createdAt: new Date().toISOString(),
    status: "pending",
    notes: "",
  };

  leads.push(newLead);
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  return newLead;
}

export async function updateLead(
  id: string,
  updates: Partial<Pick<Lead, "status" | "notes">>
): Promise<Lead | null> {
  await ensureDb();
  const leads = await getLeads();
  const index = leads.findIndex((l) => l.id === id);

  if (index === -1) return null;

  leads[index] = {
    ...leads[index],
    ...updates,
  };

  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  return leads[index];
}

export async function deleteLead(id: string): Promise<boolean> {
  await ensureDb();
  const leads = await getLeads();
  const initialLength = leads.length;
  const filtered = leads.filter((l) => l.id !== id);

  if (filtered.length === initialLength) return false;

  await fs.writeFile(LEADS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}
