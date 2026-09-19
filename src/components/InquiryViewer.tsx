import React, { useState, useEffect } from "react";
import { Server, Database, RefreshCw, Trash2, CheckCircle2, ShieldAlert, Layers } from "lucide-react";
import { Inquiry } from "../types";

export default function InquiryViewer() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "custom_panel" | "standard">("all");

  const fetchInquiries = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/inquiries");
      if (!res.ok) throw new Error("Could not connect to EAA database server.");
      const data = await res.json();
      // Sort newest first
      const sorted = (data || []).reverse();
      setInquiries(sorted);
    } catch (e: any) {
      console.error(e);
      setMessage("Grid communication offline. Check Express is active.");
    } finally {
      setLoading(false);
    }
  };

  const deleteInquiry = async (id: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete.");
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      setMessage("Inquiry cleared from database.");
    } catch (e) {
      setMessage("Error clearing record.");
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const filtered = inquiries.filter((inq) => {
    if (activeTab === "all") return true;
    return inq.type === activeTab;
  });

  return (
    <section className="py-16 bg-zinc-50 dark:bg-zinc-950 transition-colors border-t border-zinc-150 dark:border-zinc-900" id="inquiry-registry">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header summary info */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-zinc-500 dark:text-zinc-400 font-mono text-[10px] uppercase tracking-widest mb-1.5 animate-pulse">
              <Database className="w-4 h-4 text-zinc-650" />
              <span>Full-Stack Persistent Register</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-zinc-900 dark:text-white tracking-tight">
              Live Client Inquiries Database
            </h3>
            <p className="text-sky-600 dark:text-sky-400 text-sm sm:text-base font-medium">
              This terminal connects to <code className="font-mono text-[11px] bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 px-1 py-0.5 rounded">/api/inquiries</code> and displays actual submissions persisted securely on the Express/JSON backend.
            </p>
          </div>

          {/* Sync actions button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={fetchInquiries}
              disabled={loading}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-850 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-850 flex items-center space-x-1.5 transition-colors disabled:opacity-40 shrink-0"
              id="registry-sync-action"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Sync Server</span>
            </button>
          </div>
        </div>

        {/* Inner list panel context */}
        <div className="rounded-2xl border border-zinc-201 dark:border-zinc-850 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden" id="inquiry-register-inner">
          
          {/* Internal filter tab controllers */}
          <div className="px-6 py-3 border-b border-zinc-150 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-950/20 flex items-center justify-between gap-4 flex-wrap text-sm font-sans">
            <div className="flex space-x-1">
              {(["all", "custom_panel", "standard"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold capitalize ${
                    activeTab === tab
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  {tab === "all" ? "All Logs" : tab === "custom_panel" ? "Enterprise Custom" : "Standard Quotes"}
                </button>
              ))}
            </div>

            {message && (
              <span className="text-[11px] font-medium text-amber-500">{message}</span>
            )}
          </div>

          {/* Table list body */}
          <div className="divide-y divide-zinc-100 dark:divide-zinc-850">
            {filtered.map((inq) => (
              <div
                key={inq.id}
                className="p-6 hover:bg-zinc-50/30 dark:hover:bg-zinc-950/10 transition-colors flex flex-col md:flex-row items-start justify-between gap-6"
                id={`register-entry-${inq.id}`}
              >
                
                {/* ID Tag and main details mapping */}
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center space-x-2.5 flex-wrap gap-2">
                    <span className="font-mono text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200 px-2 py-0.5 rounded">
                      {inq.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      inq.type === "custom_panel"
                        ? "bg-purple-100 text-purple-750 dark:bg-purple-950/30 dark:text-purple-300"
                        : "bg-blue-105 text-blue-750 dark:bg-blue-950/30 dark:text-blue-300"
                    }`}>
                      {inq.type === "custom_panel" ? "Enterprise Custom" : "Standard Inquiry"}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      {inq.createdAt ? new Date(inq.createdAt).toLocaleString("en-IN", { hourCycle: "h23" }) : "Unk Date"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-1 gap-x-4 text-xs sm:text-sm text-zinc-650 dark:text-zinc-300 font-sans">
                    <div className="truncate"><span className="text-zinc-400">Client:</span> <strong className="font-semibold text-zinc-900 dark:text-white">{inq.name}</strong></div>
                    <div className="truncate"><span className="text-zinc-400">Firm:</span> <span>{inq.companyName}</span></div>
                    <div className="truncate"><span className="text-zinc-400">Selected Product/Sessional:</span> <span className="font-semibold">{inq.productOrService}</span></div>
                    <div><span className="text-zinc-400">Mobile Line:</span> <span className="select-all">{inq.mobile}</span></div>
                    <div className="truncate"><span className="text-zinc-400">Email Direct:</span> <span className="select-all truncate">{inq.email}</span></div>
                  </div>

                  {/* Descriptions block (optional) */}
                  {(inq.projectDescription || inq.requirement) && (
                    <div className="mt-2 text-xs bg-zinc-50 dark:bg-zinc-950/50 p-3 rounded-lg border border-zinc-150 dark:border-zinc-850">
                      <span className="block font-mono text-[9px] uppercase text-zinc-400 mb-1">Project Details</span>
                      <p className="text-zinc-600 dark:text-zinc-400 font-light italic leading-normal select-text break-words">
                        {inq.projectDescription || inq.requirement}
                      </p>
                    </div>
                  )}
                </div>

                {/* Operations column panel */}
                <div className="flex md:flex-col items-center justify-end w-full md:w-auto shrink-0 gap-3">
                  <div className="flex items-center space-x-1 font-sans text-xs text-emerald-500 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Logged</span>
                  </div>
                  
                  {/* Option to clear test entries */}
                  <button
                    onClick={() => inq.id && deleteInquiry(inq.id)}
                    className="p-1.5 rounded text-zinc-450 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    title="Purge log record"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>

              </div>
            ))}

            {filtered.length === 0 && (
              <div className="py-20 text-center text-zinc-400 font-mono text-xs uppercase tracking-wide">
                No tickets recorded in register database. Create one above to test.
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
