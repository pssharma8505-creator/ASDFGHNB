import React, { useState, useEffect } from "react";
import { PRODUCTS_CATALOG, SERVICES_CATALOG } from "../data";
import { Server, Clipboard, CheckCircle2, MessageSquare, ShieldAlert, AlertCircle, ShoppingCart } from "lucide-react";

interface OrderSectionProps {
  preselectedItem: string;
}

export default function OrderSection({ preselectedItem }: OrderSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    productOrService: "AC DRIVE PANEL UPTO 1000 KW",
    quantity: "1",
    mobile: "",
    email: "",
    requirement: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [dbSuccessMsg, setDbSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Keep state synced with any outer product clicks
  useEffect(() => {
    if (preselectedItem) {
      setFormData((prev) => ({ ...prev, productOrService: preselectedItem }));
    }
  }, [preselectedItem]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Logic to build EAA standardized template message
  const generateMessageText = () => {
    return `================================
NEW INDUSTRIAL INQUIRY

Name:
${formData.name}

Company:
${formData.companyName || "Personal/Individual Inquiry"}

Selected Product:
${formData.productOrService}

Quantity:
${formData.quantity}

Mobile:
${formData.mobile}

Email:
${formData.email}

Requirement:
${formData.requirement || "No special requirements indicated."}
================================`;
  };

  // Submit to Express local JSON database securely
  const submitInquiryToDB = async () => {
    setErrorMsg("");
    setDbSuccessMsg("");

    if (!formData.name || !formData.productOrService || !formData.quantity || !formData.mobile || !formData.email) {
      setErrorMsg("Please fill out all required fields marked with an asterisk (*).");
      return null;
    }

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          companyName: formData.companyName,
          productOrService: formData.productOrService,
          quantity: formData.quantity,
          mobile: formData.mobile,
          email: formData.email,
          requirement: formData.requirement,
          type: "standard",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to persist industrial inquiry.");
      }
      return data.inquiry;
    } catch (e: any) {
      setErrorMsg(e.message || "Could not log into EAA backend controllers.");
      return null;
    }
  };

  // Action 1: Proceed to WhatsApp
  const handleProceedToWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    setLoading(true);
    const dbResult = await submitInquiryToDB();
    
    if (!dbResult) {
      setLoading(false);
      return; // Stop if db validation failed
    }

    try {
      const messageText = generateMessageText();
      
      // Auto-copy parameters to clipboard as required
      await navigator.clipboard.writeText(messageText);
      setSuccessMsg("Details copied successfully. Redirecting to WhatsApp...");

      // Short timeout to let the user see the premium copy banner before navigating
      setTimeout(() => {
        const encoded = encodeURIComponent(messageText);
        window.open(`https://wa.me/919457585950?text=${encoded}`, "_blank");
        setLoading(false);
      }, 1800);

    } catch (err: any) {
      setErrorMsg("Permission Denied: Could not copy template automatically. However, we're opening your chat...");
      setTimeout(() => {
        const encoded = encodeURIComponent(generateMessageText());
        window.open(`https://wa.me/919457585950?text=${encoded}`, "_blank");
        setLoading(false);
      }, 1500);
    }
  };

  // Action 2: Direct DB Submit Only
  const handleDirectSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    setDbSuccessMsg("");

    setLoading(true);
    const dbResult = await submitInquiryToDB();

    if (dbResult) {
      setDbSuccessMsg(`Inquiry logged successfully with ID: ${dbResult.id}. Our engineers will contact you shortly.`);
    }
    setLoading(false);
  };

  return (
    <section id="order" className="py-24 lg:py-28 xl:py-32 bg-slate-50 dark:bg-zinc-950 transition-colors border-t border-slate-200 dark:border-zinc-900 w-full">
      <div className="container-wide max-w-6xl">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-slate-500 dark:text-zinc-400 font-sans text-xs sm:text-sm uppercase tracking-widest font-bold mb-3">
            <ShoppingCart className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" />
            <span>Industrial Inquiry Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-slate-900 dark:text-white tracking-[-0.025em] leading-[1.1]">
            Initiate System Order
          </h2>
          <p className="text-sky-600 dark:text-sky-400 mt-4 text-lg sm:text-2xl font-medium leading-relaxed">
            Fill in your system ratings below. Our Ghaziabad engineering plant delivers 100% type-tested electrical panels and certified drive boards.
          </p>
        </div>

        {/* Dual Inquiry Card */}
        <div className="rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-8 sm:p-12 shadow-xl" id="order-form-container">
          <form onSubmit={handleProceedToWhatsApp} className="space-y-6">
            
            {/* Field Row 1: Name & Company Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                  Contact Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white text-base font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all shadow-sm"
                  id="order-name-field"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g. Alliance Wire Mills"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white text-base font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all shadow-sm"
                  id="order-company-field"
                />
              </div>
            </div>

            {/* Field Row 2: Product/Service Selector & Quantity Required */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider mb-2">
                  Select Product / Service Segment *
                </label>
                <select
                  name="productOrService"
                  value={formData.productOrService}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-1.5 focus:ring-zinc-940 transition-all"
                  id="order-product-select"
                >
                  <optgroup label="System Panels">
                    {PRODUCTS_CATALOG.filter(p => p.category === "panel" || p.category === "stabilizer").map(p => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Converter Drives">
                    {PRODUCTS_CATALOG.filter(p => p.category === "drive").map(p => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Spares & Accessories">
                    {PRODUCTS_CATALOG.filter(p => p.category === "spares").map(p => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Technical Services">
                    {SERVICES_CATALOG.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider mb-2">
                  Quantity Required *
                </label>
                <input
                  type="number"
                  name="quantity"
                  required
                  min="1"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-1.5 focus:ring-zinc-940 transition-all"
                  id="order-quantity-field"
                />
              </div>
            </div>

            {/* Field Row 3: Mobile Number & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider mb-2">
                  Mobile Number (WhatsApp Enabled) *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="e.g. +91 9457585950"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-1.5 focus:ring-zinc-940 transition-all"
                  id="order-mobile-field"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider mb-2">
                  Official Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. purchasing@firm.com"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-1.5 focus:ring-zinc-940 transition-all"
                  id="order-email-field"
                />
              </div>
            </div>

            {/* Field Row 4: Additional Requirements */}
            <div>
              <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider mb-2">
                Additional Requirements / Special Directives
              </label>
              <textarea
                name="requirement"
                rows={3}
                value={formData.requirement}
                onChange={handleInputChange}
                placeholder="Mention enclosure dimensions, desired partner brand of drive/PLC (e.g. Siemens), dynamic braking needs..."
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-1.5 focus:ring-zinc-940 transition-all resize-y"
                id="order-requirement-field"
              />
            </div>

            {/* Validation messages & Action triggers */}
            <div className="pt-4 border-t border-zinc-200/50 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Message feeds */}
              <div className="flex-1 w-full text-left" id="order-feedback">
                {successMsg && (
                  <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/20 py-2.5 px-4 rounded-xl border border-emerald-100 dark:border-emerald-900">
                    <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}
                {dbSuccessMsg && (
                  <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 text-xs font-semibold bg-blue-50 dark:bg-blue-950/20 py-2.5 px-4 rounded-xl border border-blue-100 dark:border-blue-900">
                    <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                    <span>{dbSuccessMsg}</span>
                  </div>
                )}
                {errorMsg && (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-xs font-semibold bg-red-50 dark:bg-red-950/20 py-2.5 px-4 rounded-xl border border-red-100 dark:border-red-900">
                    <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </div>

              {/* Action triggering layout */}
              <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4 shrink-0">
                <button
                  type="button"
                  onClick={handleDirectSubmit}
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-3.5 bg-zinc-150 dark:bg-zinc-850 text-zinc-900 dark:text-white font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800 disabled:opacity-50"
                  id="order-submit-db-button"
                >
                  Submit Inquiry
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-zinc-950 dark:bg-white text-white dark:text-black font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all hover:translate-y-[-1px] shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                  id="order-submit-whatsapp-button"
                >
                  <MessageSquare className="w-4.5 h-4.5 shrink-0 fill-current" />
                  <span>{loading ? "Processing..." : "Proceed to WhatsApp"}</span>
                </button>
              </div>

            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
