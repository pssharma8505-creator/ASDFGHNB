import React, { useState, useRef } from "react";
import { PRODUCTS_CATALOG, SERVICES_CATALOG } from "../data";
import { Upload, CheckCircle2, Calculator, AlertTriangle, FileText, Trash2, ArrowRight } from "lucide-react";

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
          requirement: `Special requirements: ${formData.specialRequirements}. File attachment reference: ${file ? file.name : "None"}`,
          type: "custom_panel",
          projectDescription: formData.projectDescription,
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || "Failed to log enterprise inquiry.");
      }

      const waMessage = `================================
NEW ENTERPRISE PROJECT INQUIRY

Name: ${formData.name}
Company: ${formData.companyName}
Selected Product: ${formData.productName}
Selected Service: ${formData.serviceName}
Mobile Line: ${formData.mobile}
Email Coordinates: ${formData.email}

Project Description:
${formData.projectDescription}

Special Requirements:
${formData.specialRequirements || "N/A"}

File Reference:
${file ? `Attached: ${file.name} (${(file.size / 1024).toFixed(1)} KB)` : "Direct Submission (No doc)"}
================================`;

      await navigator.clipboard.writeText(waMessage);

      setSuccessMsg("Details copied successfully. Redirecting to WhatsApp...");

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
    <section id="custom-control-panel" className="py-24 bg-[#fbfbfd] text-slate-900 transition-colors border-t border-slate-200/60 w-full">
      <div className="container-wide max-w-5xl">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-slate-600 font-sans text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5 text-slate-700" />
            <span>Enterprise Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-slate-900 tracking-[-0.03em] leading-[1.1]">
            CUSTOMIZED CONTROL PANEL
          </h2>
          <p className="text-slate-600 mt-4 text-base sm:text-lg font-normal leading-relaxed">
            Model, dimension, and authorize complex PLC drawer MCC/PCC assemblies tailored to your load profiles.
          </p>
        </div>

        {/* Form Container Panel */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 shadow-xs" id="control-panel-form-container">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            
            {/* Row 1: Name and Company Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Client Contact Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Anubhav Sharma"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                  id="custom-name-field"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Registered Enterprise Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g. Ghaziabad Steel Corp"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                  id="custom-company-field"
                />
              </div>
            </div>

            {/* Row 2: Select Product & Select Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select System Panel Item
                </label>
                <select
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all cursor-pointer"
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
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Associated Service Line
                </label>
                <select
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all cursor-pointer"
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

            {/* Row 3: Mobile & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Mobile Contact Number *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="e.g. +91 9457585950"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                  id="custom-mobile-field"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Official Email Coordinates *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. logistics@clientfirm.com"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                  id="custom-email-field"
                />
              </div>
            </div>

            {/* Row 4: Detailed Project Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Project Scope and Technical Specifications *
              </label>
              <textarea
                name="projectDescription"
                required
                rows={4}
                value={formData.projectDescription}
                onChange={handleInputChange}
                placeholder="State power ratings (kW), load profiles, environmental context, or specific PLC / bus protocols required (e.g. Profinet, copper bus rating)..."
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all resize-y"
                id="custom-description-field"
              />
            </div>

            {/* Row 5: File dropzone */}
            <div id="file-dropzone-container">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
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
                    ? "border-slate-900 bg-slate-100"
                    : "border-slate-200 hover:border-slate-400 bg-slate-50/50"
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
                    <div className="mx-auto w-10 h-10 rounded-full bg-slate-200/80 flex items-center justify-center text-slate-700">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-slate-700 font-medium">
                      Drag and drop files here, or <span className="text-slate-900 font-bold underline">browse files</span>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Supports PDF, DWG, DOCX up to 10MB
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200 text-left" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {file.name}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clearSelectedFile}
                      className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Row 6: Special Requirements */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Special Assembly Directives &amp; Requirements
              </label>
              <input
                type="text"
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleInputChange}
                placeholder="e.g. IP65 classification enclosure needed, external ventilation bypass switch, Semikron thyristors..."
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                id="custom-special-requirements-field"
              />
            </div>

            {/* Validation Feedback & Action Buttons */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <div className="flex-1 w-full text-left" id="submit-feedback">
                {successMsg && (
                  <div className="flex items-center space-x-2 text-emerald-700 text-xs font-semibold bg-emerald-50 py-2.5 px-4 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}
                {submitError && (
                  <div className="flex items-center space-x-2 text-rose-700 text-xs font-semibold bg-rose-50 py-2.5 px-4 rounded-xl border border-rose-200">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}
              </div>

              <div className="flex w-full sm:w-auto gap-4 shrink-0">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white hover:bg-slate-800 font-sans text-xs font-bold uppercase tracking-wider rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-xs cursor-pointer active:scale-95"
                  id="custom-submit-button"
                >
                  <span>{loading ? "Transmitting..." : "Proceed to WhatsApp"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
