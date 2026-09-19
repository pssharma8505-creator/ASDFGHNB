import React from "react";
import { Award, Briefcase, ShieldCheck } from "lucide-react";

export default function AboutOwners() {
  return (
    <section id="about-owners" className="py-24 bg-[#fbfbfd] text-slate-900 transition-colors overflow-hidden border-t border-slate-200/60 w-full">
      <div className="container-wide">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-slate-600 font-sans text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Leadership &amp; Vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-slate-900 tracking-[-0.03em] leading-[1.1]">
            About <span className="text-slate-900 font-bold">Our Owners</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Guided by technical absolute-precision and decades of industrial on-field experience.
          </p>
        </div>

        {/* Profiles Stack */}
        <div className="space-y-24">
          
          {/* Owner 1: Uma Shankar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Image */}
            <div className="lg:col-span-5 relative" id="owner-uma-shankar-image">
              <div className="relative aspect-square sm:aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 z-10 bg-slate-100">
                <img
                  referrerPolicy="no-referrer"
                  src="https://res.cloudinary.com/doetkvre5/image/upload/v1789796284/IMG_20260919_105854.jpg_bhhxhi.jpg"
                  alt="Uma Shankar - Owner behind Eastern Alliance Automation LLP"
                  loading="eager"
                  decoding="async"
                  style={{ objectPosition: 'center 15%' }}
                  className="w-full h-full object-cover object-[center_15%] select-none hover:scale-103 transition-transform duration-500"
                />
              </div>

              {/* Experience Badge */}
              <div className="absolute -bottom-6 -right-4 bg-slate-900 text-white p-5 rounded-3xl shadow-xl z-20 flex items-center space-x-3 border border-slate-800">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-sans text-xl font-extrabold leading-none">15+ Yrs</div>
                  <div className="font-sans text-[10px] uppercase tracking-wider text-slate-300 mt-1">
                    Industry Legacy
                  </div>
                </div>
              </div>
            </div>

            {/* Right Biography */}
            <div className="lg:col-span-7 space-y-6" id="owner-uma-shankar-writeup">
              <div className="space-y-1">
                <span className="font-sans text-xs text-emerald-600 uppercase tracking-wider font-bold">Founder &amp; Partner</span>
                <h3 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 tracking-tight">
                  Uma Shankar
                </h3>
              </div>

              <div className="space-y-4 font-sans text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                <p>
                  <strong className="text-slate-900 font-semibold">Uma Shankar</strong> began his professional journey in <strong className="text-slate-900 font-semibold">2011</strong> as an <strong className="text-slate-900 font-semibold">Assistant Engineer</strong> with a reputed automation company, building a strong foundation in <strong className="text-slate-900 font-semibold">Electrical Engineering and Industrial Automation</strong>. Over the years, he has developed extensive technical expertise and hands-on experience across diverse automation projects.
                </p>
                <p>
                  His exceptional problem-solving abilities, deep industry knowledge, and commitment to excellence are reflected in the way he successfully manages complex assignments and delivers reliable solutions. With a passion for innovation and engineering precision, he continues to contribute significantly to the advancement of industrial automation systems and customer success.
                </p>
              </div>

              {/* Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200/80">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-sans font-bold text-xs text-slate-900">Precision execution</div>
                    <div className="font-sans text-xs font-medium text-slate-500 mt-0.5">Hands-on supervision for high-capacity panels</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-sans font-bold text-xs text-slate-900">Compliance Standard</div>
                    <div className="font-sans text-xs font-medium text-slate-500 mt-0.5">Uncompromising safety and international IEC rules</div>
                  </div>
                </div>
              </div>
            </div>

          </div>


          {/* Owner 2: Ashish Kumar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-12 border-t border-slate-200/60">
            
            {/* Biography */}
            <div className="lg:col-span-7 order-2 lg:order-1 space-y-6" id="owner-ashish-kumar-writeup">
              <div className="space-y-1">
                <span className="font-sans text-xs text-emerald-600 uppercase tracking-wider font-bold">Founder &amp; Partner</span>
                <h3 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 tracking-tight">
                  Ashish Kumar
                </h3>
              </div>

              <div className="space-y-4 font-sans text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                <p>
                  <strong className="text-slate-900 font-semibold">Ashish Kumar</strong> commenced his engineering career in <strong className="text-slate-900 font-semibold">2013</strong> as an <strong className="text-slate-900 font-semibold">Automation Engineer</strong> with a reputed automation company, where he built a strong foundation in <strong className="text-slate-900 font-semibold">Electrical and Electronics Engineering</strong>. Through years of dedicated experience and continuous learning, he has developed exceptional expertise in industrial automation, control systems, and engineering solutions.
                </p>
                <p>
                  Renowned for his technical proficiency, analytical mindset, and innovative approach, Ashish Kumar has successfully handled numerous critical assignments with precision and efficiency. His commitment to excellence, problem-solving abilities, and passion for technological advancement continue to drive impactful results across diverse industrial sectors.
                </p>
              </div>

              {/* Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200/80">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-sans font-bold text-xs text-slate-900">Industrial Automation</div>
                    <div className="font-sans text-xs font-medium text-slate-500 mt-0.5">System architecting and high frequency systems</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-sans font-bold text-xs text-slate-900">Technical Proficiency</div>
                    <div className="font-sans text-xs font-medium text-slate-500 mt-0.5">Customised layout logic &amp; multi-module optimization</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="lg:col-span-5 order-1 lg:order-2 relative" id="owner-ashish-kumar-image">
              <div className="relative aspect-square sm:aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 z-10 bg-slate-100">
                <img
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  src="https://res.cloudinary.com/doetkvre5/image/upload/v1782370410/Gemini_Generated_Image_atdyfsatdyfsatdy_yir5ek.png"
                  alt="Ashish Kumar - Owner behind Eastern Alliance Automation LLP"
                  className="w-full h-full object-cover select-none hover:scale-103 transition-transform duration-500"
                />
              </div>

              {/* Badge */}
              <div className="absolute -bottom-6 -left-4 bg-slate-900 text-white p-5 rounded-3xl shadow-xl z-20 flex items-center space-x-3 border border-slate-800">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-sans text-xl font-extrabold leading-none">13+ Yrs</div>
                  <div className="font-sans text-[10px] uppercase tracking-wider text-slate-300 mt-1">
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
