import React from "react";
import { ArrowUp, Mail, Shield, Linkedin, Youtube, Facebook } from "lucide-react";

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    scrollToSection("home");
  };

  return (
    <footer className="bg-slate-100 text-slate-900 font-sans border-t border-slate-200/80 pt-20 pb-12 transition-colors w-full">
      <div className="container-wide">
        
        {/* Main Links grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-200">
          
          {/* Col 1 */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection("home")}>
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center p-1 overflow-hidden shadow-xs">
                <img
                  src="https://res.cloudinary.com/doetkvre5/image/upload/v1781503492/ChatGPT_Image_Jun_15__2026__11_28_58_AM-removebg-preview_uk8b1b.png"
                  alt="Eastern Alliance Automation LLP Logo"
                  className="h-full w-full object-contain"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div>
                <span className="block font-sans font-bold text-base leading-none tracking-tight text-slate-900">
                  Eastern Alliance Automation
                </span>
                <span className="block text-[10px] text-slate-500 font-bold tracking-wider mt-0.5 uppercase">
                  LLP • Ghaziabad, India
                </span>
              </div>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed max-w-sm">
              Manufacturers of electrical control panels, PLC systems, high-power AC/DC drives, and linear servo stabilizers. Designed with extreme attention to thermal safety and copper busbar dimension layouts.
            </p>
            
            {/* Social channels */}
            <div className="flex items-center space-x-2 pt-1">
              <a href="#" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-xs" title="Follow on LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-xs" title="Follow on YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-xs" title="Like on Facebook">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-sans text-xs text-slate-400 uppercase tracking-wider font-bold">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-medium">
              {["home", "services", "products", "custom-control-panel", "order", "about-us", "contact-us"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className="hover:text-slate-900 text-left capitalize transition-colors cursor-pointer"
                  >
                    {item.replace("-", " ")}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-sans text-xs text-slate-400 uppercase tracking-wider font-bold">
              Featured Systems
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-medium">
              {["AC Drive Cabinets", "DC Converter Drives", "MCC & PCC Panels", "Voltage Stabilizers", "PLC customised software"].map((pItem) => (
                <li key={pItem}>
                  <button
                    onClick={() => scrollToSection("products")}
                    className="hover:text-slate-900 text-left transition-colors cursor-pointer"
                  >
                    {pItem}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-sans text-xs text-slate-400 uppercase tracking-wider font-bold">
              Engineering Support
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 font-medium">
              <li className="flex items-start space-x-2">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Certified Type-Tested Assemblies IEC 61439 compliant.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="select-all text-slate-900 font-bold">support@easternallianceautomation.in</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans" id="footer-copyright-row">
          <div>
            <span>© {currentYear} Eastern Alliance Automation LLP. All Rights Reserved.</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Engineering</a>
            
            <button
              onClick={handleScrollToTop}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center space-x-1 cursor-pointer shadow-xs"
              id="back-to-top-button"
              title="Return to topmost section"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[10px] font-bold tracking-wider uppercase">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
