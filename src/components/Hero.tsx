import React from "react";
import { motion } from "motion/react";
import { GENERAL_STATS } from "../data";
import { ArrowRight, ChevronRight, Play, Server, Layers } from "lucide-react";

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  return (
    <section id="home" className="relative h-screen min-h-[650px] w-full bg-black overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-90"
        >
          <source
            src="https://res.cloudinary.com/doetkvre5/video/upload/v1781454714/Control_panel_assembly_text_reveal_202606141504_fjfp6v.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay (styled beautifully) */}
        <div className="absolute inset-0 bg-black/30 z-10" />
        {/* Sleek metallic bottom gradient to transition into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Hero Content Area */}
      <div className="relative z-20 container-wide w-full pt-32 pb-20 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Column: Typographic composition */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center space-x-3"
            >
              <span className="h-[2px] w-12 bg-emerald-500 block"></span>
              <span className="text-emerald-400 font-sans text-xs font-bold uppercase tracking-[0.2em]">
                Industrial Grade Solutions
              </span>
            </motion.div>

            {/* Headline - Apple-inspired typography scale */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.2 }}
              className="font-sans font-bold text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-[-0.035em]"
            >
              Powering <span className="font-extrabold text-white">Industries.</span><br />
              Engineering <span className="text-slate-300 font-normal">Future.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.4 }}
              className="font-sans text-base sm:text-lg md:text-xl text-slate-200 max-w-xl font-normal leading-relaxed"
            >
              Precision-designed Ghaziabad automation systems crafted for continuous operations, peak thermal layouts, and IEC 61439 reliability.
            </motion.p>

            {/* Interactive Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-2"
            >
              <button
                onClick={() => scrollToSection("products")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-sans text-sm font-semibold tracking-wide transition-all shadow-xl hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                Explore Products
              </button>
              <button
                onClick={() => scrollToSection("contact-us")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/30 text-white font-sans text-sm font-semibold tracking-wide backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                Contact Us
              </button>
            </motion.div>
          </div>

          {/* Right Column: Floating counters/stats panel */}
          <div className="lg:col-span-5 w-full flex justify-end lg:self-end lg:pb-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="w-full max-w-sm bg-white/10 dark:bg-zinc-950/50 backdrop-blur-xl border border-white/15 p-8 rounded-3xl grid grid-cols-2 gap-8 shadow-2xl"
              id="hero-stats-panel"
            >
              {GENERAL_STATS.map((stat, i) => (
                <div key={i} className="space-y-1 hover:translate-y-[-2px] transition-transform duration-300">
                  <p className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-[-0.03em]">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-slate-300 font-semibold">
                    {stat.label.replace("completed", "").replace("engineering", "").trim()}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
