"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Lead {
  id: string;
  name: string;
  phone: string;
  studentClass: string;
  syllabus: string;
  createdAt: string;
  status: "pending" | "contacted" | "scheduled" | "enrolled" | "rejected";
  notes?: string;
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [syllabusFilter, setSyllabusFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const router = useRouter();

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/admin/leads");
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        throw new Error("Failed to load leads");
      }
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus as any } : l))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const startEditingNotes = (lead: Lead) => {
    setEditingNotesId(lead.id);
    setTempNotes(lead.notes || "");
  };

  const saveNotes = async (id: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: tempNotes }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, notes: tempNotes } : l))
        );
        setEditingNotesId(null);
      }
    } catch (err) {
      console.error("Failed to save notes:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery);
      const matchesClass = classFilter ? lead.studentClass === classFilter : true;
      const matchesSyllabus = syllabusFilter ? lead.syllabus === syllabusFilter : true;
      const matchesStatus = statusFilter ? lead.status === statusFilter : true;

      return matchesSearch && matchesClass && matchesSyllabus && matchesStatus;
    });
  }, [leads, searchQuery, classFilter, syllabusFilter, statusFilter]);

  // Statistics calculations
  const stats = useMemo(() => {
    const total = leads.length;
    const pending = leads.filter((l) => l.status === "pending").length;
    const contacted = leads.filter((l) => ["contacted", "scheduled"].includes(l.status)).length;
    const enrolled = leads.filter((l) => l.status === "enrolled").length;

    return { total, pending, contacted, enrolled };
  }, [leads]);

  // CSV Exporter
  const exportToCSV = () => {
    if (filteredLeads.length === 0) return;

    const headers = ["Date Submitted", "Name", "Phone Number", "Class", "Syllabus", "Status", "Notes"];
    const rows = filteredLeads.map((l) => [
      new Date(l.createdAt).toLocaleString(),
      l.name,
      l.phone,
      l.studentClass === "entrance" ? "Entrance Prep" : `Class ${l.studentClass}`,
      l.syllabus === "cbse" ? "CBSE" : l.syllabus === "state" ? "State" : "Entrance",
      l.status.toUpperCase(),
      l.notes || "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ascend_leads_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#080B14] text-white font-sans pb-12">
      {/* Header */}
      <header className="border-b border-white/5 bg-white/[0.02] backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center font-bold text-white shadow-md">
              A
            </div>
            <div>
              <span className="font-clash font-bold text-lg tracking-wide block">
                Ascend Academy
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                Leads Dashboard
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        {/* Top Info row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-clash font-bold text-2xl md:text-3xl text-white">
              Demo Registrations
            </h1>
            <p className="text-white/40 text-sm">
              Manage free demo class bookings and student admission status.
            </p>
          </div>

          {filteredLeads.length > 0 && (
            <button
              onClick={exportToCSV}
              className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer transition-all self-start md:self-auto flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export to CSV ({filteredLeads.length})
            </button>
          )}
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Bookings", value: stats.total, color: "border-white/10 text-white" },
            { label: "Pending Review", value: stats.pending, color: "border-amber-500/20 text-amber-400" },
            { label: "Contacted / Demo", value: stats.contacted, color: "border-teal-500/20 text-teal-400" },
            { label: "Students Enrolled", value: stats.enrolled, color: "border-emerald-500/20 text-emerald-400" },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`bg-white/[0.02] border ${item.color} rounded-[1.5rem] p-5 shadow-sm backdrop-blur-sm`}
            >
              <span className="text-white/40 text-[11px] font-bold uppercase tracking-wider block">
                {item.label}
              </span>
              <span className="font-clash font-bold text-3xl mt-1 block">
                {loading ? "..." : item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Filters Panel */}
        <div className="bg-white/[0.02] border border-white/5 rounded-[1.75rem] p-6 space-y-4 shadow-sm backdrop-blur-sm">
          <h2 className="font-clash font-bold text-md tracking-wide text-white/80">
            Search & Filter
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Search Leads</label>
              <input
                type="text"
                placeholder="Search name or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:border-emerald-500/30 transition-all placeholder-white/20"
              />
            </div>

            {/* Class Filter */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Filter by Class</label>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:border-emerald-500/30 transition-all"
              >
                <option value="">All Classes</option>
                {[8, 9, 10, 11, 12].map((c) => (
                  <option key={c} value={c}>Class {c}</option>
                ))}
                <option value="entrance">Entrance Prep</option>
              </select>
            </div>

            {/* Syllabus Filter */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Filter by Syllabus</label>
              <select
                value={syllabusFilter}
                onChange={(e) => setSyllabusFilter(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:border-emerald-500/30 transition-all"
              >
                <option value="">All Syllabi</option>
                <option value="state">State Board</option>
                <option value="cbse">CBSE</option>
                <option value="entrance">Entrance (NEET/KEAM)</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Filter by Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:border-emerald-500/30 transition-all"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="scheduled">Scheduled</option>
                <option value="enrolled">Enrolled</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leads Table Container */}
        <div className="bg-white/[0.01] border border-white/5 rounded-[1.75rem] overflow-hidden shadow-sm">
          {loading ? (
            <div className="py-24 text-center text-white/40 font-semibold flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-2 border-white/20 border-t-emerald-500 rounded-full animate-spin" />
              Loading demo bookings...
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-24 text-center text-white/30 font-semibold">
              No registration leads match your filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider text-white/40">Date</th>
                    <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider text-white/40">Student Name</th>
                    <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider text-white/40">Phone Number</th>
                    <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider text-white/40">Class & Syllabus</th>
                    <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider text-white/40">Status</th>
                    <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider text-white/40">Notes</th>
                    <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider text-white/40 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.01] transition-colors">
                      {/* Date */}
                      <td className="px-6 py-5.5 text-xs text-white/60 font-semibold whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString()}
                        <span className="block text-[10px] text-white/30 font-normal">
                          {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>

                      {/* Name */}
                      <td className="px-6 py-5.5 text-sm font-bold text-white whitespace-nowrap">
                        {lead.name}
                      </td>

                      {/* Phone */}
                      <td className="px-6 py-5.5 text-sm font-semibold text-emerald-400 whitespace-nowrap">
                        <a href={`tel:${lead.phone}`} className="hover:underline">
                          {lead.phone}
                        </a>
                      </td>

                      {/* Class & Syllabus */}
                      <td className="px-6 py-5.5 text-xs text-white/70 whitespace-nowrap">
                        <span className="font-bold text-white">
                          {lead.studentClass === "entrance" ? "Entrance Prep" : `Class ${lead.studentClass}`}
                        </span>
                        <span className="block text-[10px] text-white/45 mt-0.5 uppercase tracking-wide">
                          {lead.syllabus === "cbse" ? "CBSE" : lead.syllabus === "state" ? "State Board" : "Entrance Syllabus"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5.5 whitespace-nowrap">
                        <select
                          disabled={updatingId === lead.id}
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg border outline-none cursor-pointer transition-colors ${
                            lead.status === "pending"
                              ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                              : lead.status === "contacted"
                              ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                              : lead.status === "scheduled"
                              ? "bg-teal-500/10 border-teal-500/30 text-teal-400"
                              : lead.status === "enrolled"
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                              : "bg-red-500/10 border-red-500/30 text-red-400"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="enrolled">Enrolled</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>

                      {/* Notes */}
                      <td className="px-6 py-5.5 max-w-xs text-xs">
                        {editingNotesId === lead.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={tempNotes}
                              onChange={(e) => setTempNotes(e.target.value)}
                              className="bg-white/10 border border-white/20 rounded-md px-2 py-1 text-white w-48 focus:border-emerald-500/50 outline-none"
                              placeholder="Add follow-up notes..."
                            />
                            <button
                              onClick={() => saveNotes(lead.id)}
                              className="text-emerald-400 font-bold hover:underline cursor-pointer"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingNotesId(null)}
                              className="text-white/40 hover:underline cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 group/note">
                            <span className="text-white/60 line-clamp-2">
                              {lead.notes || <span className="text-white/20 italic">No notes added</span>}
                            </span>
                            <button
                              onClick={() => startEditingNotes(lead)}
                              className="text-emerald-400 opacity-0 group-hover/note:opacity-100 transition-opacity hover:underline cursor-pointer font-semibold"
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5.5 text-right whitespace-nowrap">
                        <button
                          disabled={updatingId === lead.id}
                          onClick={() => handleDelete(lead.id)}
                          className="text-red-500/70 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors cursor-pointer"
                          aria-label="Delete Lead"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
