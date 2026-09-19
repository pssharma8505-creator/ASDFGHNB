import React from "react";
import * as LucideIcons from "lucide-react";
import { SERVICES_CATALOG } from "../data";
import { Sliders, ArrowUpRight } from "lucide-react";

interface ServicesSectionProps {
  onQuoteService: (serviceName: string) => void;
}

export default function ServicesSection({ onQuoteService }: ServicesSectionProps) {
  return (
    <section id="services" className="py-24 lg:py-28 xl:py-32 bg-white dark:bg-zinc-950 transition-colors w-full">
      <div className="container-wide">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center space-x-2 text-slate-500 dark:text-zinc-400 font-sans text-xs font-semibold uppercase tracking-widest mb-3">
            <Sliders className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Operational Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-slate-900 dark:text-white tracking-[-0.025em] leading-[1.1]">
            Industrial Engineering &amp; On-Site Services
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 mt-4 text-base sm:text-lg font-normal leading-relaxed">
            Providing high-caliber digital upgrades, VFD maintenance, certified programming, and full turn-key facility automation across India.
          </p>
        </div>

        {/* Services Cards Grid Layout - 4 Columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" id="services-grid">
          {SERVICES_CATALOG.map((srv) => {
            // Dynamically lookup the Lucide icon from importing all icons
            const IconComponent = (LucideIcons as any)[srv.icon] || LucideIcons.Cpu;

            return (
              <div
                key={srv.id}
                className="group relative flex flex-col justify-between p-7 rounded-2xl bg-white/90 dark:bg-zinc-900/80 border border-slate-300/90 dark:border-zinc-700/80 shadow-[0_0_15px_rgba(255,255,255,0.8)] dark:shadow-[0_0_15px_rgba(255,255,255,0.2)] origin-bottom transition-all duration-300 ease-out hover:-translate-y-4 hover:scale-[1.06] hover:z-20 hover:bg-white dark:hover:bg-zinc-900 hover:border-white dark:hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,1)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                id={`service-card-${srv.id}`}
              >
                <div>
                  {/* Icon Block */}
                  <div className="w-13 h-13 rounded-2xl bg-slate-200/80 dark:bg-zinc-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300 mb-6 shadow-sm">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title & Description of Service */}
                  <h3 className="text-xl sm:text-2xl font-sans font-extrabold text-black dark:text-white tracking-tight leading-snug mb-3">
                    {srv.title}
                  </h3>
                  <p className="text-sky-600 dark:text-sky-400 text-base sm:text-lg font-medium leading-relaxed mb-6">
                    {srv.description}
                  </p>
                </div>

                {/* Industries Metas & CTA Button */}
                <div>
                  <div className="mb-6">
                    <span className="block text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                      Sectors Served
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {srv.industriesServed.map((ind, i) => (
                        <span
                          key={i}
                          className="bg-slate-200/80 dark:bg-zinc-800 text-slate-800 dark:text-zinc-300 px-2.5 py-1 rounded-md text-xs font-medium"
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onQuoteService(srv.title)}
                    className="w-full py-3 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 font-sans text-xs font-bold tracking-wider uppercase hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Get Quote</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Professional Download Catalogue Card with Looping Video Background */}
        <div className="mt-20 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-slate-300 dark:border-zinc-800 shadow-2xl" id="services-catalog-card">
          {/* Looping Background Video in Original Quality without filter */}
          <video
            src="https://res.cloudinary.com/doetkvre5/video/upload/v1786615070/From_Klickpin.com-_Need_fresh_inspiration_Copy_these_smart_meal_prep_ideas_everyone_will_ask_you_about_using_simple_ideas_you_can_actually_pull_of_i44hyi.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
          />

          <div className="relative z-10 w-full flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12">
            {/* Left Content Area - Larger Typography */}
            <div className="space-y-5 max-w-3xl">
              <span className="inline-block bg-black text-white px-5 py-2 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider leading-none shadow-md">
                Official Company Documentation
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black text-black tracking-tight uppercase leading-tight drop-shadow-sm">
                DOWNLOAD OUR CATALOG
              </h3>
              <p className="text-black text-lg sm:text-xl font-bold leading-relaxed drop-shadow-sm">
                Get immediate access to our exhaustive <strong className="text-black font-extrabold underline decoration-rose-600 decoration-4 underline-offset-4">12-Page EAA Company Profile &amp; Product Catalog</strong>. It includes full engineering dimensions, technical specifications, supported global manufacturer coordinates, field device listings, and stabilizer calibration charts in standard print-ready A4 dimensions.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3 text-base sm:text-lg font-bold text-black">
                <div className="flex items-center space-x-3 bg-white/95 border border-black/25 px-4 py-3 rounded-xl shadow-md backdrop-blur-sm">
                  <div className="w-3 h-3 rounded-full bg-rose-600 shrink-0"></div>
                  <span className="text-black font-extrabold">12-Page A4 Profile PDF</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/95 border border-black/25 px-4 py-3 rounded-xl shadow-md backdrop-blur-sm">
                  <div className="w-3 h-3 rounded-full bg-rose-600 shrink-0"></div>
                  <span className="text-black font-extrabold">PLC, VFD &amp; MCC Ranges</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/95 border border-black/25 px-4 py-3 rounded-xl shadow-md backdrop-blur-sm">
                  <div className="w-3 h-3 rounded-full bg-rose-600 shrink-0"></div>
                  <span className="text-black font-extrabold">Field Spares Coordinates</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/95 border border-black/25 px-4 py-3 rounded-xl shadow-md backdrop-blur-sm">
                  <div className="w-3 h-3 rounded-full bg-rose-600 shrink-0"></div>
                  <span className="text-black font-extrabold">Servo Stabilizer Specs</span>
                </div>
              </div>
            </div>

            {/* Right-Down Corner Button Layout */}
            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-end lg:self-end w-full lg:w-auto min-w-[240px]">
              <a
                href="https://drive.google.com/file/d/1JZ9fXo3xcdv2aoIrAUxXWnU7StZQKoUS/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-7 py-4 bg-black text-white hover:bg-slate-900 font-sans text-base font-extrabold uppercase tracking-wider rounded-2xl transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2.5 cursor-pointer border border-black"
                id="catalog-download-pdf-btn"
              >
                <LucideIcons.FileDown className="w-5 h-5 text-rose-400" />
                <span>Download PDF (A4)</span>
              </a>
              <a
                href="https://drive.google.com/file/d/1JZ9fXo3xcdv2aoIrAUxXWnU7StZQKoUS/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-7 py-4 bg-white/95 border-2 border-black text-black hover:bg-white font-sans text-base font-extrabold tracking-wider rounded-2xl transition-all flex items-center justify-center space-x-2.5 cursor-pointer shadow-md backdrop-blur-sm"
                id="catalog-view-btn"
              >
                <LucideIcons.ExternalLink className="w-5 h-5 text-black" />
                <span>View Online</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
