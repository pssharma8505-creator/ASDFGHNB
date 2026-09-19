import React, { useState, useRef } from "react";
import { PRODUCTS_CATALOG, SERVICES_CATALOG } from "../data";
import { Upload, CheckCircle2, Clipboard, ChevronRight, Calculator, AlertTriangle, FileText, Trash2 } from "lucide-react";

export default function CustomPanelSection() {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    productName: "PLC & CUSTOMISED CONTROL PANEL",
    serviceName: "Customised Control Panels",
    mobile: "",
    email: "",
    projectDescription: "",
    specialRequirements: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [submitError, setSubmitError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Drag-and-drop file operations as per Usability Patterns
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const triggerFileBrowser = () => {
    fileInputRef.current?.click();
  };

  const clearSelectedFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSuccessMsg("");

    if (!formData.name || !formData.companyName || !formData.mobile || !formData.email || !formData.projectDescription) {
      setSubmitError("Please fill out all required fields marked with an asterisk (*).");
      return;
    }

    setLoading(true);

    try {
      // 1. Submit inquiry to Express backend server
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          companyName: formData.companyName,
          productOrService: `${formData.productName} [${formData.serviceName}]`,
          quantity: "1",
          mobile: formData.mobile,
          email: formData.email,
          requirement: `Special requirements: ${formData.specialRequirements}. File attachment simulated: ${file ? file.name : "None"}`,
          type: "custom_panel",
          projectDescription: formData.projectDescription,
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || "Failed to log enterprise inquiry.");
      }

      // 2. Format WhatsApp Message Template beautifully
      const waMessage = `================================
NEW ENTERPRISE PROJECT INQUIRY

Name: ${formData.name}
Company: ${formData.companyName}
Selected Product: ${formData.productName}
Selected Service ${formData.serviceName}
Mobile Line: ${formData.mobile}
Email Coordinates: ${formData.email}

Project Description:
${formData.projectDescription}

Special Requirements:
${formData.specialRequirements || "N/A"}

File Reference:
${file ? `Attached: ${file.name} (${(file.size / 1024).toFixed(1)} KB)` : "Direct Submission (No doc)"}
================================`;

      // 3. Copy EAA inquiry to Clipboard automatically before rerouting
      await navigator.clipboard.writeText(waMessage);

      setSuccessMsg("Details copied successfully. Redirecting to WhatsApp...");

      // 4. Smooth window routing after a brief delay
      setTimeout(() => {
        const encodedMessage = encodeURIComponent(waMessage);
        window.open(`https://wa.me/919457585950?text=${encodedMessage}`, "_blank");
        setLoading(false);
      }, 2000);

    } catch (err: any) {
      setSubmitError(err.message || "Could not connect to EAA controller network.");
      setLoading(false);
    }
  };

  return (
    <section id="custom-control-panel" className="py-24 lg:py-28 xl:py-32 bg-white dark:bg-zinc-950 transition-colors border-t border-slate-200 dark:border-zinc-900 w-full">
      <div className="container-wide max-w-6xl">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-slate-500 dark:text-zinc-400 font-sans text-xs sm:text-sm uppercase tracking-widest font-bold mb-3">
            <Calculator className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" />
            <span>Enterprise Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-slate-900 dark:text-white tracking-[-0.025em] leading-[1.1]">
            CUSTOMIZED CONTROL PANEL
          </h2>
          <p className="text-sky-600 dark:text-sky-400 mt-4 text-lg sm:text-2xl font-medium leading-relaxed">
            Model, dimension, and authorize complex PLC drawer MCC/PCC assemblies tailored to your load profiles.
          </p>
        </div>

        {/* Form Container Panel */}
        <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-slate-50/90 dark:bg-zinc-900/40 p-8 sm:p-12 shadow-xl" id="control-panel-form-container">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            
            {/* Row 1: Name and Company Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                  Client Contact Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Anubhav Sharma"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white text-base font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all shadow-sm"
                  id="custom-name-field"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                  Registered Enterprise Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g. Ghaziabad Steel Corp"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white text-base font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all shadow-sm"
                  id="custom-company-field"
                />
              </div>
            </div>

            {/* Row 2: Select Product & Select Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider mb-2">
                  Select System Panel Item
                </label>
                <select
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-1.5 focus:ring-zinc-940 transition-all"
                  id="custom-product-select"
                >
                  {PRODUCTS_CATALOG.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider mb-2">
                  Select Associated Service Line
                </label>
                <select
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-1.5 focus:ring-zinc-940 transition-all"
                  id="custom-service-select"
                >
                  {SERVICES_CATALOG.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>



            {/* Row 4: Mobile & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider mb-2">
                  Mobile Contact Number *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="e.g. +91 9457585950"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-1.5 focus:ring-zinc-940 transition-all"
                  id="custom-mobile-field"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider mb-2">
                  Official Email Coordinates *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. logistics@clientfirm.com"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-1.5 focus:ring-zinc-940 transition-all"
                  id="custom-email-field"
                />
              </div>
            </div>

            {/* Row 5: Detailed Project Description */}
            <div>
              <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider mb-2">
                Project Scope and Technical Specifications *
              </label>
              <textarea
                name="projectDescription"
                required
                rows={4}
                value={formData.projectDescription}
                onChange={handleInputChange}
                placeholder="State power ratings (kW), load profiles, environmental context, or specific PLC / bus protocols required (e.g. Profinet, copper bus rating)..."
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-1.5 focus:ring-zinc-940 transition-all resize-y"
                id="custom-description-field"
              />
            </div>

            {/* Row 6: Usability patterns - file upload visual drag/drop tracker */}
            <div id="file-dropzone-container">
              <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider mb-2">
                Upload Reference Document (AutoCAD, specifications sheet, PDF)
              </label>
              
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={triggerFileBrowser}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  isDragActive
                    ? "border-zinc-900 bg-zinc-100 dark:border-white dark:bg-zinc-900"
                    : "border-zinc-200 hover:border-zinc-400 bg-white dark:border-zinc-800/80 dark:hover:border-zinc-600 dark:bg-zinc-900/40"
                }`}
                id="file-dropzone"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.dwg,.doc,.docx,.xls,.xlsx,.png,.jpg"
                  className="hidden"
                  id="reference-file-uploader"
                />

                {!file ? (
                  <div className="space-y-2">
                    <div className="mx-auto w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">
                      Drag and drop files here, or <span className="text-zinc-905 dark:text-white underline">browse files</span>
                    </p>
                    <p className="text-[10px] text-zinc-400">
                      Supports PDF, DWG, DOCX up to 10MB
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-left" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-8 h-8 rounded bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                          {file.name}
                        </p>
                        <p className="text-[10px] text-zinc-500">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clearSelectedFile}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Row 7: Special Requirements */}
            <div>
              <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider mb-2">
                Special Assembly Directives &amp; Requirements
              </label>
              <input
                type="text"
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleInputChange}
                placeholder="e.g. IP65 classification enclosure needed, external ventilation bypass switch, Semikron thyristors..."
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-1.5 focus:ring-zinc-940 transition-all"
                id="custom-special-requirements-field"
              />
            </div>

            {/* Validation Feedback & Action Buttons Grid */}
            <div className="pt-4 border-t border-zinc-200/50 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Success / Error Banners block */}
              <div className="flex-1 w-full text-left" id="submit-feedback">
                {successMsg && (
                  <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/20 py-2.5 px-4 rounded-xl border border-emerald-100 dark:border-emerald-900">
                    <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}
                {submitError && (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-xs font-semibold bg-red-50 dark:bg-red-950/20 py-2.5 px-4 rounded-xl border border-red-100 dark:border-red-900">
                    <AlertTriangle className="w-4.5 h-4.5 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex w-full sm:w-auto gap-4 shrink-0">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-zinc-950 dark:bg-white text-white dark:text-black hover:translate-y-[-1px] font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all disabled:opacity-55 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-md"
                  id="custom-submit-button"
                >
                  <span>{loading ? "Transmitting..." : "Proceed to WhatsApp"}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
