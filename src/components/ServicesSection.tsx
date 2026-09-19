import React from "react";
import * as LucideIcons from "lucide-react";
import { SERVICES_CATALOG } from "../data";
import { Sliders, ArrowUpRight, FileDown, ExternalLink } from "lucide-react";

interface ServicesSectionProps {
  onQuoteService: (serviceName: string) => void;
}

export default function ServicesSection({ onQuoteService }: ServicesSectionProps) {
  return (
    <section id="services" className="py-24 bg-[#fbfbfd] text-slate-900 transition-colors w-full border-t border-slate-200/60">
      <div className="container-wide">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-slate-600 font-sans text-xs font-semibold uppercase tracking-wider mb-4">
            <Sliders className="w-3.5 h-3.5 text-slate-700" />
            <span>Operational Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-slate-900 tracking-[-0.03em] leading-[1.1]">
            Industrial Engineering &amp; On-Site Services
          </h2>
          <p className="text-slate-600 mt-4 text-base sm:text-lg font-normal leading-relaxed">
            Providing high-caliber digital upgrades, VFD maintenance, certified programming, and full turn-key facility automation across India.
          </p>
        </div>

        {/* Services Cards Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" id="services-grid">
          {SERVICES_CATALOG.map((srv) => {
            const IconComponent = (LucideIcons as any)[srv.icon] || LucideIcons.Cpu;

            return (
              <div
                key={srv.id}
                className="group flex flex-col justify-between p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                id={`service-card-${srv.id}`}
              >
                <div>
                  {/* Icon Block */}
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300 mb-6 shadow-xs">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-sans font-bold text-slate-900 tracking-tight leading-snug mb-3">
                    {srv.title}
                  </h3>
                  <p className="text-slate-600 text-sm font-normal leading-relaxed mb-6">
                    {srv.description}
                  </p>
                </div>

                {/* Industries Metas & CTA Button */}
                <div>
                  <div className="mb-6">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Sectors Served
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {srv.industriesServed.map((ind, i) => (
                        <span
                          key={i}
                          className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-[11px] font-semibold"
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onQuoteService(srv.title)}
                    className="w-full py-3 rounded-2xl border border-slate-200 text-slate-900 font-sans text-xs font-bold tracking-wider uppercase hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                  >
                    <span>Get Quote</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Download Catalogue Card with Looping Video Background Preserved */}
        <div className="mt-20 rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden bg-slate-900 text-white border border-slate-200/80 shadow-2xl" id="services-catalog-card">
          {/* Looping Background Video */}
          <video
            src="https://res.cloudinary.com/doetkvre5/video/upload/v1786615070/From_Klickpin.com-_Need_fresh_inspiration_Copy_these_smart_meal_prep_ideas_everyone_will_ask_you_about_using_simple_ideas_you_can_actually_pull_of_i44hyi.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-20"
          />

          <div className="relative z-10 w-full flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12">
            {/* Left Content Area */}
            <div className="space-y-5 max-w-3xl">
              <span className="inline-block bg-white text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                Official Company Documentation
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-white tracking-tight uppercase leading-tight">
                DOWNLOAD OUR CATALOG
              </h3>
              <p className="text-slate-200 text-base sm:text-lg font-normal leading-relaxed">
                Get immediate access to our exhaustive <strong className="text-white font-bold underline decoration-amber-400 decoration-2 underline-offset-4">12-Page EAA Company Profile &amp; Product Catalog</strong>. It includes full engineering dimensions, technical specifications, supported global manufacturer coordinates, field device listings, and stabilizer calibration charts in standard print-ready A4 dimensions.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs sm:text-sm font-semibold text-white">
                <div className="flex items-center space-x-3 bg-white/10 border border-white/15 px-4 py-3 rounded-2xl backdrop-blur-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></div>
                  <span>12-Page A4 Profile PDF</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 border border-white/15 px-4 py-3 rounded-2xl backdrop-blur-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></div>
                  <span>PLC, VFD &amp; MCC Ranges</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 border border-white/15 px-4 py-3 rounded-2xl backdrop-blur-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></div>
                  <span>Field Spares Coordinates</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 border border-white/15 px-4 py-3 rounded-2xl backdrop-blur-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></div>
                  <span>Servo Stabilizer Specs</span>
                </div>
              </div>
            </div>

            {/* Right Buttons */}
            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end lg:self-end w-full lg:w-auto min-w-[240px]">
              <a
                href="https://drive.google.com/file/d/1JZ9fXo3xcdv2aoIrAUxXWnU7StZQKoUS/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-7 py-4 bg-white text-slate-900 hover:bg-slate-100 font-sans text-xs font-bold uppercase tracking-wider rounded-2xl transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer"
                id="catalog-download-pdf-btn"
              >
                <FileDown className="w-4 h-4 text-emerald-600" />
                <span>Download PDF (A4)</span>
              </a>
              <a
                href="https://drive.google.com/file/d/1JZ9fXo3xcdv2aoIrAUxXWnU7StZQKoUS/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-7 py-4 bg-white/10 border border-white/20 text-white hover:bg-white/20 font-sans text-xs font-bold uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center space-x-2 cursor-pointer backdrop-blur-md"
                id="catalog-view-btn"
              >
                <ExternalLink className="w-4 h-4 text-white" />
                <span>View Online</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
