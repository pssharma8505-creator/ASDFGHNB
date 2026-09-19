import React from "react";
import * as LucideIcons from "lucide-react";
import { INDUSTRIES_SERVED } from "../data";
import { Shovel, ShieldCheck, Factory, Zap, Flame, Boxes, Printer, Cable, Pipette } from "lucide-react";

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-24 lg:py-28 xl:py-32 bg-slate-50 dark:bg-zinc-950 transition-colors border-t border-slate-200 dark:border-zinc-900 w-full">
      <div className="container-wide">
        
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-slate-500 dark:text-zinc-400 font-sans text-xs uppercase tracking-widest font-semibold mb-3">
            <Factory className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" />
            <span>Market Sectors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-slate-900 dark:text-white tracking-[-0.025em] leading-[1.1]">
            Industries We Serve
          </h2>
          <p className="text-sky-600 dark:text-sky-400 mt-4 text-lg sm:text-2xl font-medium leading-relaxed">
            Deploying highly robust fieldbus cabinets and active drive setups that thrive in demanding thermal conditions and heavy duty applications.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8" id="industries-grid">
          {INDUSTRIES_SERVED.map((ind, idx) => {
            // Dynamically load the Lucide icon
            const IconComponent = (LucideIcons as any)[ind.icon] || Factory;

            return (
              <div
                key={idx}
                className="group p-7 rounded-2xl bg-white dark:bg-zinc-900/80 border border-slate-200/80 dark:border-zinc-800/80 hover:border-slate-300 dark:hover:border-zinc-700 hover:shadow-xl transition-all duration-300 text-left"
                id={`industry-card-${idx}`}
              >
                {/* Icon wrapper */}
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-slate-950 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300 mb-5 shadow-sm">
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="text-lg sm:text-xl font-sans font-semibold text-slate-900 dark:text-white tracking-tight mb-2">
                  {ind.name}
                </h3>
                <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base font-normal leading-relaxed">
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
