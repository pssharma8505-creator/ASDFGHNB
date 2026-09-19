import React from "react";
import { Zap, ArrowUp, ArrowRight, Linkedin, Youtube, Facebook, Mail, Shield } from "lucide-react";

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    scrollToSection("home");
  };

  return (
    <footer className="bg-slate-900 dark:bg-zinc-950 text-white font-sans border-t border-slate-800 dark:border-zinc-900 pt-20 pb-12 transition-colors w-full">
      <div className="container-wide">
        
        {/* Main Links grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Col 1: Company Profile and Pitch */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection("home")}>
              <div className="w-20 h-20 bg-transparent flex items-center justify-center overflow-hidden">
                <img
                  src="https://res.cloudinary.com/doetkvre5/image/upload/v1781503492/ChatGPT_Image_Jun_15__2026__11_28_58_AM-removebg-preview_uk8b1b.png"
                  alt="Eastern Alliance Automation LLP Logo"
                  className="h-full w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="block font-display font-medium text-sm sm:text-base leading-none uppercase tracking-tight text-white">
                  Eastern Alliance
                </span>
                <span className="block text-[10px] sm:text-xs text-slate-450 font-medium tracking-widest mt-1 uppercase">
                  Automation LLP
                </span>
              </div>
            </div>
            <p className="text-sky-300 text-sm sm:text-base font-medium leading-relaxed max-w-sm">
              Manufacturers of electrical control panels, PLC systems, high-power AC/DC drives, and linear servo stabilizers. Designed with extreme attention to thermal safety and copper busbar dimension layouts.
            </p>
            
            {/* Social channels link lines */}
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors" title="Follow on LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors" title="Follow on YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors" title="Like on Facebook">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Map */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs text-sky-400 uppercase tracking-widest font-bold">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm sm:text-base text-sky-300 font-medium">
              {["home", "services", "products", "custom-control-panel", "order", "about-us", "contact-us"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className="hover:text-white text-left capitalize transition-colors"
                  >
                    {item.replace("-", " ")}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Products Highlight */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs text-sky-400 uppercase tracking-widest font-bold">
              Featured Systems
            </h4>
            <ul className="space-y-2.5 text-sm sm:text-base text-sky-300 font-medium">
              {["AC Drive Cabinets", "DC Converter Drives", "MCC & PCC Panels", "Voltage Stabilizers", "PLC customised software"].map((pItem) => (
                <li key={pItem}>
                  <button
                    onClick={() => scrollToSection("products")}
                    className="hover:text-white text-left transition-colors flex items-center space-x-1"
                  >
                    <span>{pItem}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Services Highlight */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs text-sky-400 uppercase tracking-widest font-bold">
              Engineering Support
            </h4>
            <ul className="space-y-2.5 text-sm sm:text-base text-sky-300 font-medium">
              <li className="flex items-start space-x-2">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Certified Type-Tested Assemblies IEC 61439 compliant.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span className="select-all text-sky-300 font-medium">support@easternallianceautomation.in</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-sans" id="footer-copyright-row">
          <div>
            <span>© {currentYear} Eastern Alliance Automation LLP. All Rights Reserved.</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Engineering</a>
            
            <button
              onClick={handleScrollToTop}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-850 transition-all flex items-center space-x-1"
              id="back-to-top-button"
              title="Return to topmost section"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[9px] font-mono tracking-widest uppercase">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
