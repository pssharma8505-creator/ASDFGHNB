import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";

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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "py-3 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-lg shadow-slate-100/10 dark:shadow-none border-slate-200/80 dark:border-zinc-900"
          : "py-5 bg-transparent border-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => scrollToSection("home")}
          className="flex items-center space-x-3 cursor-pointer group select-none"
          id="nav-logo"
        >
          <div className={`transition-all duration-300 bg-transparent flex items-center justify-center overflow-hidden shrink-0 ${
            isScrolled ? "w-11 h-11 md:w-13 md:h-13" : "w-13 h-13 md:w-16 md:h-16"
          }`}>
            <img
              src="https://res.cloudinary.com/doetkvre5/image/upload/v1781503492/ChatGPT_Image_Jun_15__2026__11_28_58_AM-removebg-preview_uk8b1b.png"
              alt="Eastern Alliance Automation LLP Logo"
              className="h-full w-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="font-sans font-extrabold text-base sm:text-lg md:text-xl xl:text-2xl text-slate-900 dark:text-white tracking-[-0.025em] leading-tight transition-colors">
            Eastern Alliance Automation LLP
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center space-x-1 px-3 py-1.5 rounded-full border border-slate-300 dark:border-zinc-800 bg-slate-100/80 dark:bg-zinc-900/80 shadow-sm backdrop-blur-md" id="nav-desktop-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-3.5 py-2 rounded-full font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 relative cursor-pointer ${
                activeSection === item.id
                  ? "text-slate-900 dark:text-white bg-slate-200/80 dark:bg-zinc-800"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/60"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Side Integrations: Theme Switcher & Client CTAs */}
        <div className="hidden xl:flex items-center space-x-4" id="nav-actions">
          <ThemeSwitcher />
          <button
            onClick={() => scrollToSection("custom-control-panel")}
            className="bg-slate-900 text-white dark:bg-white dark:text-black px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md cursor-pointer"
            id="nav-cta-button"
          >
            <span>Customised Engineering</span>
          </button>
        </div>

        {/* Mobile menu and system buttons */}
        <div className="flex items-center space-x-2 xl:hidden" id="nav-mobile-controls">
          <ThemeSwitcher compact={true} />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 hover:scale-105 transition-transform"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-slate-200 dark:border-zinc-900 shadow-2xl px-6 py-6 transition-all duration-300" id="nav-mobile-drawer">
          <div className="flex flex-col space-y-3">
            <div className="pb-3 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-slate-500 dark:text-zinc-400">Select Theme</span>
              <ThemeSwitcher />
            </div>

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-3 rounded-xl font-sans text-base font-semibold transition-colors ${
                  activeSection === item.id
                    ? "text-slate-950 dark:text-white bg-slate-100 dark:bg-zinc-900"
                    : "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900"
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
              className="mt-2 text-center w-full py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-sans text-sm font-semibold tracking-wider uppercase shadow-md active:scale-95 transition-transform"
            >
              Customised Engineering Panel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

