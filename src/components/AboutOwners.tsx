import React from "react";
import { Award, Briefcase, Calendar, ShieldCheck, User } from "lucide-react";

export default function AboutOwners() {
  return (
    <section id="about-owners" className="py-24 lg:py-28 xl:py-32 bg-zinc-50 dark:bg-zinc-900/35 border-t border-slate-100 dark:border-zinc-900/80 transition-colors overflow-hidden w-full">
      <div className="container-wide">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center space-x-3 text-emerald-600 dark:text-emerald-400 mb-3">
            <span className="h-[2px] w-6 bg-emerald-500 block"></span>
            <span className="font-sans text-xs font-semibold uppercase tracking-widest">Leadership &amp; Vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extralight text-slate-900 dark:text-white tracking-[-0.025em] leading-[1.1]">
            About <span className="font-bold">Our Owners</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-zinc-400 mt-3 leading-relaxed">
            Guided by technical absolute-precision and decades of industrial on-field experience.
          </p>
        </div>

        {/* Profiles Stack */}
        <div className="space-y-24">
          
          {/* Owner 1: Uma Shankar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Block: Image with offset backdrop effects & experience badges */}
            <div className="lg:col-span-5 relative" id="owner-uma-shankar-image">
              <div className="absolute -inset-4 bg-gradient-to-tr from-rose-500/10 to-emerald-500/10 dark:from-rose-500/5 dark:to-emerald-500/5 rounded-3xl -rotate-1 scale-[1.02] blur-md z-0" />
              <div className="absolute inset-0 bg-slate-100 dark:bg-zinc-900 rounded-2xl rotate-3 scale-[1.01] z-0 border border-slate-200/50 dark:border-zinc-800" />
              
              <div className="relative aspect-square sm:aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-zinc-800 z-10 bg-white dark:bg-zinc-950">
                <img
                  referrerPolicy="no-referrer"
                  src="https://res.cloudinary.com/doetkvre5/image/upload/v1789796284/IMG_20260919_105854.jpg_bhhxhi.jpg"
                  alt="Uma Shankar - Owner behind Eastern Alliance Automation LLP"
                  loading="eager"
                  decoding="async"
                  style={{ objectPosition: 'center 15%' }}
                  className="w-full h-full object-cover object-[center_15%] select-none hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Float Experience Badge */}
              <div className="absolute -bottom-6 -right-4 bg-slate-950 text-white dark:bg-white dark:text-zinc-950 p-5 rounded-2xl shadow-xl z-20 flex items-center space-x-3 border border-zinc-800 dark:border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center text-white">
                  <Award className="w-5.5 h-5.5" />
                </div>
                <div>
                  <div className="font-display text-xl font-extrabold leading-none">15+ Yrs</div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400 dark:text-zinc-500 mt-1">
                    Industry Legacy
                  </div>
                </div>
              </div>
            </div>

            {/* Right Block: Personal biography & key professional pillars */}
            <div className="lg:col-span-7 space-y-6" id="owner-uma-shankar-writeup">
              <div className="space-y-1">
                <span className="font-mono text-xs text-rose-500 dark:text-rose-400 uppercase tracking-wider font-semibold">Founder & Partner</span>
                <h3 className="text-2xl sm:text-3xl font-display font-semibold text-slate-900 dark:text-white tracking-tight">
                  Uma Shankar
                </h3>
              </div>

              <div className="space-y-4 font-sans text-sm sm:text-base text-slate-600 dark:text-zinc-300 font-light leading-relaxed">
                <p>
                  <strong className="text-slate-950 dark:text-white font-semibold">Uma Shankar</strong> began his professional journey in <strong className="text-slate-950 dark:text-white font-semibold">2011</strong> as an <strong className="text-slate-950 dark:text-white font-semibold">Assistant Engineer</strong> with a reputed automation company, building a strong foundation in <strong className="text-slate-950 dark:text-white font-semibold">Electrical Engineering and Industrial Automation</strong>. Over the years, he has developed extensive technical expertise and hands-on experience across diverse automation projects.
                </p>
                <p>
                  His exceptional problem-solving abilities, deep industry knowledge, and commitment to excellence are reflected in the way he successfully manages complex assignments and delivers reliable solutions. With a passion for innovation and engineering precision, he continues to contribute significantly to the advancement of industrial automation systems and customer success.
                </p>
              </div>

              {/* Leadership pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200/60 dark:border-zinc-800/80">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Briefcase className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-xs text-slate-900 dark:text-white">Precision execution</div>
                    <div className="font-sans text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-400 mt-0.5">Hands-on supervision for high-capacity panels</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-xs text-slate-900 dark:text-white">Compliance Standard</div>
                    <div className="font-sans text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-400 mt-0.5">Uncompromising safety and international IEC rules</div>
                  </div>
                </div>
              </div>
            </div>

          </div>


          {/* Owner 2: Ashish Kumar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-8 border-t border-slate-250/20 dark:border-zinc-800/50">
            
            {/* Left Block: Personal biography & key professional pillars (Alternating order on desktop) */}
            <div className="lg:col-span-7 order-2 lg:order-1 space-y-6" id="owner-ashish-kumar-writeup">
              <div className="space-y-1">
                <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold">Founder & Partner</span>
                <h3 className="text-2xl sm:text-3xl font-display font-semibold text-slate-900 dark:text-white tracking-tight">
                  Ashish Kumar
                </h3>
              </div>

              <div className="space-y-4 font-sans text-sm sm:text-base text-slate-600 dark:text-zinc-300 font-light leading-relaxed">
                <p>
                  <strong className="text-slate-950 dark:text-white font-semibold">Ashish Kumar</strong> commenced his engineering career in <strong className="text-slate-950 dark:text-white font-semibold">2013</strong> as an <strong className="text-slate-950 dark:text-white font-semibold">Automation Engineer</strong> with a reputed automation company, where he built a strong foundation in <strong className="text-slate-950 dark:text-white font-semibold">Electrical and Electronics Engineering</strong>. Through years of dedicated experience and continuous learning, he has developed exceptional expertise in industrial automation, control systems, and engineering solutions.
                </p>
                <p>
                  Renowned for his technical proficiency, analytical mindset, and innovative approach, Ashish Kumar has successfully handled numerous critical assignments with precision and efficiency. His commitment to excellence, problem-solving abilities, and passion for technological advancement continue to drive impactful results across diverse industrial sectors.
                </p>
              </div>

              {/* Leadership pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200/60 dark:border-zinc-800/80">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Briefcase className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-xs text-slate-900 dark:text-white">Industrial Automation</div>
                    <div className="font-sans text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-400 mt-0.5">System architecting and high frequency systems</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-xs text-slate-900 dark:text-white">Technical Proficiency</div>
                    <div className="font-sans text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-400 mt-0.5">Customised layout logic & multi-module optimization</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Block: Placeholder Image with offset backdrop effects & experience badges */}
            <div className="lg:col-span-5 order-1 lg:order-2 relative" id="owner-ashish-kumar-image">
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/10 to-rose-500/10 dark:from-emerald-500/5 dark:to-rose-500/5 rounded-3xl rotate-1 scale-[1.02] blur-md z-0" />
              <div className="absolute inset-0 bg-slate-100 dark:bg-zinc-900 rounded-2xl -rotate-3 scale-[1.01] z-0 border border-slate-200/50 dark:border-zinc-800" />
              
              <div className="relative aspect-square sm:aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-zinc-800 z-10 bg-white dark:bg-zinc-950">
                <img
                  referrerPolicy="no-referrer"
                  src="https://res.cloudinary.com/doetkvre5/image/upload/v1782370410/Gemini_Generated_Image_atdyfsatdyfsatdy_yir5ek.png"
                  alt="Ashish Kumar - Owner behind Eastern Alliance Automation LLP"
                  className="w-full h-full object-cover select-none hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Float Experience Badge */}
              <div className="absolute -bottom-6 -left-4 bg-slate-950 text-white dark:bg-white dark:text-zinc-950 p-5 rounded-2xl shadow-xl z-20 flex items-center space-x-3 border border-zinc-800 dark:border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                  <Award className="w-5.5 h-5.5" />
                </div>
                <div>
                  <div className="font-display text-xl font-extrabold leading-none">13+ Yrs</div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400 dark:text-zinc-500 mt-1">
                    Active Command
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
