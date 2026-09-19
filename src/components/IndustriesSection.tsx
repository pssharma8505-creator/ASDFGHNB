import React from "react";
import * as LucideIcons from "lucide-react";
import { INDUSTRIES_SERVED } from "../data";
import { Factory } from "lucide-react";

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-24 bg-[#fbfbfd] text-slate-900 transition-colors border-t border-slate-200/60 w-full">
      <div className="container-wide">
        
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-slate-600 font-sans text-xs uppercase tracking-wider font-semibold mb-4">
            <Factory className="w-3.5 h-3.5 text-slate-700" />
            <span>Market Sectors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-slate-900 tracking-[-0.03em] leading-[1.1]">
            Industries We Serve
          </h2>
          <p className="text-slate-600 mt-4 text-base sm:text-lg font-normal leading-relaxed">
            Deploying highly robust fieldbus cabinets and active drive setups that thrive in demanding thermal conditions and heavy duty applications.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8" id="industries-grid">
          {INDUSTRIES_SERVED.map((ind, idx) => {
            const IconComponent = (LucideIcons as any)[ind.icon] || Factory;

            return (
              <div
                key={idx}
                className="group p-8 rounded-3xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left"
                id={`industry-card-${idx}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300 mb-6 shadow-xs">
                  <IconComponent className="w-5 h-5" />
                </div>

                <h3 className="text-lg sm:text-xl font-sans font-bold text-slate-900 tracking-tight mb-2">
                  {ind.name}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
