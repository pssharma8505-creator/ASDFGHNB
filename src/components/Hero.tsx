import React from "react";
import { motion } from "motion/react";
import { GENERAL_STATS } from "../data";
import { ArrowRight, ShieldCheck, Play } from "lucide-react";

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] pt-32 pb-20 bg-[#fbfbfd] text-slate-900 flex flex-col justify-center overflow-hidden"
    >
      <div className="container-wide w-full">
        
        {/* Top Kicker Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/90 text-slate-700 text-xs font-semibold tracking-wider uppercase mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Industrial Grade Automation &amp; Engineering</span>
        </motion.div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Typographic composition */}
          <div className="lg:col-span-6 space-y-6 text-left">

            {/* Headline - Apple-inspired typography scale */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-sans font-bold text-4xl sm:text-6xl lg:text-7xl text-slate-900 leading-[1.05] tracking-[-0.035em]"
            >
              Powering <span className="text-slate-900 font-extrabold">Industries.</span><br />
              Engineering <span className="text-slate-500 font-normal">Future.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed"
            >
              Precision-designed Ghaziabad automation systems crafted for continuous operations, peak thermal layouts, and IEC 61439 reliability.
            </motion.p>

            {/* Interactive Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-2"
            >
              <button
                onClick={() => scrollToSection("products")}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSection("contact-us")}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 font-sans text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center"
              >
                Contact Us
              </button>
            </motion.div>

            {/* Key Trust Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200/80"
              id="hero-stats-panel"
            >
              {GENERAL_STATS.map((stat, i) => (
                <div key={i} className="space-y-0.5">
                  <p className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 tracking-[-0.03em]">
                    {stat.value}
                  </p>
                  <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

          </div>

          {/* Right Column: Hero Showcase Video inside Rounded Container */}
          <div className="lg:col-span-6 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, delay: 0.2 }}
              className="relative w-full aspect-video sm:aspect-[4/3] rounded-3xl lg:rounded-[2.5rem] overflow-hidden bg-slate-900 border border-slate-200/80 shadow-2xl group"
            >
              {/* Preserved Original Hero Video */}
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="https://easternallianceautomation.in/wp-content/uploads/2025/11/Untitled-design-5-scaled.jpg"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              >
                <source
                  src="https://res.cloudinary.com/doetkvre5/video/upload/v1781454714/Control_panel_assembly_text_reveal_202606141504_fjfp6v.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              {/* Gentle overlay for visual depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/10 pointer-events-none" />

              {/* Video Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white pointer-events-none">
                <div className="flex items-center space-x-3 bg-slate-950/75 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 shadow-lg">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                  <span className="text-xs font-medium tracking-wide">
                    Live Panel Assembly Showcase • Ghaziabad Works
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
