import React, { useState } from "react";
import { Mail, Phone, MapPin, Compass, Send, CheckCircle2, AlertTriangle, ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Industrial Automation Equipment Query",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMsg("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          companyName: "General Inquirer",
          productOrService: formData.subject,
          quantity: "1",
          mobile: "+91 9457585950 (Direct Query Line)",
          email: formData.email,
          requirement: formData.message,
          type: "standard_contact",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit message.");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "Industrial Automation Equipment Query",
        message: "",
      });
    } catch (e: any) {
      setErrorMsg(e.message || "Failed to submit contact query.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-us" className="py-24 bg-[#fbfbfd] text-slate-900 transition-colors border-t border-slate-200/60 w-full">
      <div className="container-wide">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-slate-600 font-sans text-xs uppercase tracking-wider font-semibold mb-4">
            <Compass className="w-3.5 h-3.5 text-slate-700" />
            <span>Connect Center</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-slate-900 tracking-[-0.03em] leading-[1.1]">
            Contact Our Engineers
          </h2>
          <p className="text-slate-600 mt-4 text-base sm:text-lg font-normal leading-relaxed">
            Have questions about copper busbar load specifications or DC drive calibration? Write to our division in Ghaziabad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Block */}
          <div className="lg:col-span-5 space-y-8" id="contact-coordinates">
            
            <div className="rounded-3xl border border-slate-200/80 p-8 space-y-6 bg-white shadow-xs">
              <h3 className="font-sans font-bold text-xl tracking-tight text-slate-900">
                Eastern Alliance Automation LLP
              </h3>
              <p className="font-sans text-sm text-slate-600 font-normal leading-relaxed">
                Our plant is located in the key manufacturing hub of Uttar Pradesh, equipped to assemble, test, and ship control panels globally.
              </p>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-600">
                  <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-slate-900">Main Works Facility</span>
                    <span className="block font-normal">Kh. No. 2563, Gausala Road, Indraprastha Marg,</span>
                    <span className="block font-normal">near Metro Power House, Karhera colony, Mohan Nagar,</span>
                    <span className="font-bold text-slate-900">Ghaziabad, Uttar Pradesh 201007</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-600">
                  <Phone className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-slate-900">WhatsApp Direct Lines</span>
                    <a href="https://wa.me/919457585950" target="_blank" rel="noreferrer" className="hover:underline text-slate-900 font-bold flex items-center space-x-1">
                      <span>+91 9457585950</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-600">
                  <Mail className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-slate-900">Email Coordinates</span>
                    <span className="text-slate-900 font-bold select-all">info@easternallianceautomation.in</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map Frame */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/80 h-64 shadow-xs bg-slate-100" id="google-mapping-box">
              <iframe
                title="EAA Ghaziabad Industrial Map Location"
                src="https://maps.google.com/maps?q=Kh.+No.+2563%2C+Gausala+Road%2C+Indraprastha+Marg%2C+near+Metro+Power+House%2C+Karhera+colony%2C+Mohan+Nagar%2C+Ghaziabad%2C+Uttar+Pradesh+201007&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs" id="contact-form-box">
            <h3 className="font-sans font-bold text-xl tracking-tight text-slate-900 mb-6">
              Send Dispatch Message
            </h3>
            
            <form onSubmit={handleContactSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Kapil Dev"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                    id="contact-name-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Your Email Coordinates *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. engineering@yourfirm.in"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                    id="contact-email-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Subject Matter
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                  id="contact-subject-input"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Detailed Query Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="State the specs, PLC types, or required services you are looking to address..."
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all resize-y"
                  id="contact-message-input"
                />
              </div>

              {/* Status block feedback */}
              <div id="contact-submit-feedback">
                {success && (
                  <div className="flex items-center space-x-2 text-emerald-700 text-xs font-semibold bg-emerald-50 py-2.5 px-4 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Your dispatch was sent successfully to EAA database. We will contact you back!</span>
                  </div>
                )}
                {errorMsg && (
                  <div className="flex items-center space-x-2 text-rose-700 text-xs font-semibold bg-rose-50 py-2.5 px-4 rounded-xl border border-rose-200">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 text-right">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white font-sans text-xs font-bold uppercase tracking-wider rounded-2xl transition-all hover:bg-slate-800 disabled:opacity-50 flex items-center justify-center space-x-2 shadow-xs cursor-pointer active:scale-95"
                  id="contact-message-submit-button"
                >
                  <Send className="w-3.5 h-3.5 fill-current shrink-0" />
                  <span>{loading ? "Transmitting..." : "Send Query"}</span>
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
