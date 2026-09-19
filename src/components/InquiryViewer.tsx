import React, { useState, useEffect } from "react";
import { Database, RefreshCw, Trash2, CheckCircle2 } from "lucide-react";
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
      const sorted = (data || []).reverse();
      setInquiries(sorted);
    } catch (e: any) {
      console.error(e);
      setMessage("Grid communication offline.");
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
    <section className="py-16 bg-[#fbfbfd] text-slate-900 transition-colors border-t border-slate-200/60" id="inquiry-registry">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header summary info */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-slate-500 font-sans text-xs font-semibold uppercase tracking-wider mb-2">
              <Database className="w-4 h-4 text-slate-700" />
              <span>Persistent Inquiries Register</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-slate-900 tracking-tight">
              Live Client Inquiries Database
            </h3>
            <p className="text-slate-600 text-sm font-normal">
              Connects to <code className="font-mono text-xs bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded border border-slate-200">/api/inquiries</code> to log real-time customer specs.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchInquiries}
              disabled={loading}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-2xl border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 flex items-center space-x-2 transition-all cursor-pointer shadow-xs disabled:opacity-50 shrink-0"
              id="registry-sync-action"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Sync Server</span>
            </button>
          </div>
        </div>

        {/* Inner list panel */}
        <div className="rounded-3xl border border-slate-200/80 bg-white shadow-xs overflow-hidden" id="inquiry-register-inner">
          
          <div className="px-6 py-3 border-b border-slate-200/80 bg-slate-50/50 flex items-center justify-between gap-4 flex-wrap text-sm font-sans">
            <div className="flex space-x-1">
              {(["all", "custom_panel", "standard"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                    activeTab === tab
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab === "all" ? "All Logs" : tab === "custom_panel" ? "Enterprise Custom" : "Standard Quotes"}
                </button>
              ))}
            </div>

            {message && (
              <span className="text-xs font-semibold text-amber-600">{message}</span>
            )}
          </div>

          {/* Table list body */}
          <div className="divide-y divide-slate-100">
            {filtered.map((inq) => (
              <div
                key={inq.id}
                className="p-6 hover:bg-slate-50/60 transition-colors flex flex-col md:flex-row items-start justify-between gap-6"
                id={`register-entry-${inq.id}`}
              >
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center space-x-2.5 flex-wrap gap-2">
                    <span className="font-mono text-xs font-bold bg-slate-100 text-slate-900 px-2 py-0.5 rounded-md border border-slate-200">
                      {inq.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      inq.type === "custom_panel"
                        ? "bg-purple-50 text-purple-700 border border-purple-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}>
                      {inq.type === "custom_panel" ? "Enterprise Custom" : "Standard Inquiry"}
                    </span>
                    <span className="text-[11px] text-slate-400 font-sans">
                      {inq.createdAt ? new Date(inq.createdAt).toLocaleString("en-IN") : ""}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-1 gap-x-4 text-xs sm:text-sm text-slate-600 font-sans">
                    <div className="truncate"><span className="text-slate-400">Client:</span> <strong className="font-bold text-slate-900">{inq.name}</strong></div>
                    <div className="truncate"><span className="text-slate-400">Firm:</span> <span>{inq.companyName}</span></div>
                    <div className="truncate"><span className="text-slate-400">Item:</span> <span className="font-bold">{inq.productOrService}</span></div>
                    <div><span className="text-slate-400">Mobile:</span> <span className="select-all">{inq.mobile}</span></div>
                    <div className="truncate"><span className="text-slate-400">Email:</span> <span className="select-all truncate">{inq.email}</span></div>
                  </div>

                  {(inq.projectDescription || inq.requirement) && (
                    <div className="mt-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                      <span className="block font-sans text-[10px] uppercase font-bold text-slate-400 mb-1">Project Specs</span>
                      <p className="text-slate-700 font-normal italic leading-relaxed select-text break-words">
                        {inq.projectDescription || inq.requirement}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex md:flex-col items-center justify-end w-full md:w-auto shrink-0 gap-3">
                  <div className="flex items-center space-x-1 font-sans text-xs text-emerald-600 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Logged</span>
                  </div>
                  
                  <button
                    onClick={() => inq.id && deleteInquiry(inq.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Purge log record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}

            {filtered.length === 0 && (
              <div className="py-16 text-center text-slate-400 font-sans text-xs uppercase tracking-wide font-bold">
                No tickets recorded in database.
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
