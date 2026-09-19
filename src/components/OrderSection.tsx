import React, { useState, useEffect } from "react";
import { PRODUCTS_CATALOG, SERVICES_CATALOG } from "../data";
import { CheckCircle2, MessageSquare, AlertCircle, ShoppingCart } from "lucide-react";

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

  const handleProceedToWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    setLoading(true);
    const dbResult = await submitInquiryToDB();
    
    if (!dbResult) {
      setLoading(false);
      return;
    }

    try {
      const messageText = generateMessageText();
      await navigator.clipboard.writeText(messageText);
      setSuccessMsg("Details copied successfully. Redirecting to WhatsApp...");

      setTimeout(() => {
        const encoded = encodeURIComponent(messageText);
        window.open(`https://wa.me/919457585950?text=${encoded}`, "_blank");
        setLoading(false);
      }, 1800);

    } catch (err: any) {
      setErrorMsg("Permission Denied: Could not copy template automatically. Opening chat...");
      setTimeout(() => {
        const encoded = encodeURIComponent(generateMessageText());
        window.open(`https://wa.me/919457585950?text=${encoded}`, "_blank");
        setLoading(false);
      }, 1500);
    }
  };

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
    <section id="order" className="py-24 bg-[#fbfbfd] text-slate-900 transition-colors border-t border-slate-200/60 w-full">
      <div className="container-wide max-w-5xl">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-slate-600 font-sans text-xs font-semibold uppercase tracking-wider mb-4">
            <ShoppingCart className="w-3.5 h-3.5 text-slate-700" />
            <span>Industrial Inquiry Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-slate-900 tracking-[-0.03em] leading-[1.1]">
            Initiate System Order
          </h2>
          <p className="text-slate-600 mt-4 text-base sm:text-lg font-normal leading-relaxed">
            Fill in your system ratings below. Our Ghaziabad engineering plant delivers 100% type-tested electrical panels and certified drive boards.
          </p>
        </div>

        {/* Dual Inquiry Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 shadow-xs" id="order-form-container">
          <form onSubmit={handleProceedToWhatsApp} className="space-y-6">
            
            {/* Field Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Contact Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                  id="order-name-field"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g. Alliance Wire Mills"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                  id="order-company-field"
                />
              </div>
            </div>

            {/* Field Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Product / Service Segment *
                </label>
                <select
                  name="productOrService"
                  value={formData.productOrService}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all cursor-pointer"
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
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Quantity Required *
                </label>
                <input
                  type="number"
                  name="quantity"
                  required
                  min="1"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                  id="order-quantity-field"
                />
              </div>
            </div>

            {/* Field Row 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Mobile Number (WhatsApp Enabled) *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="e.g. +91 9457585950"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                  id="order-mobile-field"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Official Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. purchasing@firm.com"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                  id="order-email-field"
                />
              </div>
            </div>

            {/* Field Row 4 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Additional Requirements / Special Directives
              </label>
              <textarea
                name="requirement"
                rows={3}
                value={formData.requirement}
                onChange={handleInputChange}
                placeholder="Mention enclosure dimensions, desired partner brand of drive/PLC (e.g. Siemens), dynamic braking needs..."
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all resize-y"
                id="order-requirement-field"
              />
            </div>

            {/* Validation & Actions */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
              
              <div className="flex-1 w-full text-left" id="order-feedback">
                {successMsg && (
                  <div className="flex items-center space-x-2 text-emerald-700 text-xs font-semibold bg-emerald-50 py-2.5 px-4 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}
                {dbSuccessMsg && (
                  <div className="flex items-center space-x-2 text-sky-700 text-xs font-semibold bg-sky-50 py-2.5 px-4 rounded-xl border border-sky-200">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{dbSuccessMsg}</span>
                  </div>
                )}
                {errorMsg && (
                  <div className="flex items-center space-x-2 text-rose-700 text-xs font-semibold bg-rose-50 py-2.5 px-4 rounded-xl border border-rose-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleDirectSubmit}
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-sans text-xs font-bold uppercase tracking-wider rounded-2xl transition-all cursor-pointer border border-slate-200 disabled:opacity-50"
                  id="order-submit-db-button"
                >
                  Submit Inquiry
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs font-bold uppercase tracking-wider rounded-2xl transition-all shadow-xs flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer active:scale-95"
                  id="order-submit-whatsapp-button"
                >
                  <MessageSquare className="w-4 h-4 shrink-0 fill-current" />
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
