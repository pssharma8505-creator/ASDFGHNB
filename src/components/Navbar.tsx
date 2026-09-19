import React, { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export default function Navbar({
  activeSection,
  scrollToSection,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Services", id: "services" },
    { label: "Products", id: "products" },
    { label: "Gallery", id: "gallery_page" },
    { label: "Control Panel", id: "custom-control-panel" },
    { label: "Order", id: "order" },
    { label: "About Us", id: "about-us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "py-3 bg-white/85 backdrop-blur-md shadow-sm border-slate-200/80"
          : "py-5 bg-white/50 backdrop-blur-xs border-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div
          onClick={() => scrollToSection("home")}
          className="flex items-center space-x-3 cursor-pointer group select-none"
          id="nav-logo"
        >
          <div
            className={`transition-all duration-300 bg-slate-50 border border-slate-200/80 rounded-2xl p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-xs ${
              isScrolled ? "w-11 h-11" : "w-12 h-12"
            }`}
          >
            <img
              src="https://res.cloudinary.com/doetkvre5/image/upload/v1781503492/ChatGPT_Image_Jun_15__2026__11_28_58_AM-removebg-preview_uk8b1b.png"
              alt="Eastern Alliance Automation LLP Logo"
              className="h-full w-full object-contain"
              loading="eager"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-extrabold text-base sm:text-lg md:text-xl text-slate-900 tracking-[-0.03em] leading-tight">
              Eastern Alliance Automation
            </span>
            <span className="text-[10px] sm:text-xs font-medium text-slate-500 tracking-wider uppercase">
              LLP • Ghaziabad, India
            </span>
          </div>
        </div>

        {/* Desktop Menu Pill */}
        <div
          className="hidden xl:flex items-center space-x-1 p-1.5 rounded-full border border-slate-200/90 bg-slate-100/80 shadow-xs backdrop-blur-md"
          id="nav-desktop-menu"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-1.5 rounded-full font-sans text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-slate-900 bg-white shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right CTA */}
        <div className="hidden xl:flex items-center space-x-3" id="nav-actions">
          <button
            onClick={() => scrollToSection("custom-control-panel")}
            className="inline-flex items-center space-x-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide hover:bg-slate-800 active:scale-95 transition-all shadow-sm cursor-pointer"
            id="nav-cta-button"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-current" />
            <span>Custom Engineering</span>
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex items-center space-x-2 xl:hidden" id="nav-mobile-controls">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="p-2.5 rounded-2xl bg-slate-100 text-slate-800 border border-slate-200/80 hover:bg-slate-200/80 transition-colors cursor-pointer"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="xl:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl px-6 py-6 transition-all duration-300"
          id="nav-mobile-drawer"
        >
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-3 rounded-2xl font-sans text-sm font-semibold transition-colors ${
                  activeSection === item.id
                    ? "text-slate-900 bg-slate-100 font-bold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                scrollToSection("custom-control-panel");
                setMobileMenuOpen(false);
              }}
              className="mt-3 w-full py-3.5 rounded-2xl bg-slate-900 text-white font-sans text-xs font-bold tracking-wider uppercase shadow-md active:scale-98 transition-transform flex items-center justify-center space-x-2"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-current" />
              <span>Custom Engineering Panel</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
