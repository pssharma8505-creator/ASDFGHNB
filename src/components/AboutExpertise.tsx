import React from "react";
import { TRUST_BADGES, PARTNER_BRANDS } from "../data";
import { CheckCircle, Award, Briefcase, Shovel, ShieldCheck, Factory, Zap } from "lucide-react";

export default function AboutExpertise() {
  return (
    <section id="about-us" className="py-24 lg:py-28 xl:py-32 bg-white dark:bg-zinc-950 transition-colors overflow-hidden border-t border-slate-100 dark:border-zinc-900 w-full">
      <div className="container-wide">
        
        {/* Core Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Left Block: Company story write-up */}
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-6" id="about-profile-writeup">
            <div className="flex items-center space-x-3 text-slate-500 dark:text-zinc-400">
              <span className="h-[2px] w-6 bg-emerald-500 block"></span>
              <span className="font-sans text-xs font-semibold uppercase tracking-widest">About Us Corporate Profile</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extralight text-slate-900 dark:text-white tracking-[-0.025em] leading-[1.1]">
              Pioneering Tomorrow&apos;s <span className="font-bold">Industrial Grids</span> Today
            </h2>
            
            <div className="space-y-4 font-sans text-base sm:text-lg text-slate-600 dark:text-zinc-300 font-normal leading-relaxed">
              <p>
                At <strong className="text-slate-950 dark:text-white font-semibold">Eastern Alliance Automation LLP</strong>, our pursuit of excellence is driven by a commitment to delivering <strong>high-quality products, enhanced services, and systematic operational solutions</strong> that empower industries to achieve greater efficiency and reliability.
              </p>
              <p>
                Established in <strong className="text-slate-950 dark:text-white font-semibold">2022</strong>, Eastern Alliance Automation LLP has rapidly emerged as a <strong>trusted leader in industrial automation and electrical solutions</strong> based in <strong>Ghaziabad, India</strong>. We specialize in providing advanced automation systems and premium electrical products tailored to meet the evolving needs of modern industries.
              </p>
              <p>
                Our strong partnerships with globally recognized brands such as <strong>Siemens, ABB, Parker, Control Techniques, and Danfoss</strong> enable us to deliver solutions that uphold the highest standards of <strong>quality, performance, and reliability</strong>.
              </p>
              <p>
                At the heart of our success lies a deep understanding of our customers&apos; ever-changing requirements. By offering a diverse range of innovative products and customised solutions, we consistently stay ahead of industry demands and market competition.
              </p>
              <p>
                Our team of <strong>highly skilled engineers and dedicated professionals</strong> is committed to delivering exceptional customer experiences through <strong>technical expertise, precision engineering, and responsive support</strong>. Every project we undertake reflects our core values of <strong>innovation, integrity, safety, and customer satisfaction</strong>.
              </p>
              <p className="border-l-2 border-slate-900 dark:border-white pl-4 font-normal text-slate-800 dark:text-zinc-100 italic font-serif mt-6">
                <strong>Passion to Innovate — Engineering Excellence for a Smarter Tomorrow.</strong>
              </p>
            </div>

            {/* Structured horizontal metrics list */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-zinc-900">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-zinc-900 flex items-center justify-center text-slate-800 dark:text-zinc-200">
                  <Factory className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="font-display font-semibold text-xs text-slate-900 dark:text-white">State-of-art Facility</div>
                  <div className="font-sans text-[10px] text-slate-400">Mohan Nagar, Ghaziabad, UP</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-zinc-900 flex items-center justify-center text-slate-800 dark:text-zinc-200">
                  <Zap className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="font-display font-semibold text-xs text-slate-900 dark:text-white">IEC Compliance</div>
                  <div className="font-sans text-[10px] text-slate-400">Fully type-tested systems</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Image with offset backdrop effects */}
          <div className="lg:col-span-5 order-1 lg:order-2 relative" id="about-image-stage">
            <div className="absolute -inset-4 bg-slate-50 dark:bg-zinc-900 rounded-3xl rotate-2 scale-[1.02] z-0" />
            <div className="relative aspect-square sm:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl z-10">
              <img
                referrerPolicy="no-referrer"
                src="https://easternallianceautomation.in/wp-content/uploads/2025/10/engineer-4941329_1280.jpg"
                alt="Eastern Alliance lead engineer troubleshooting panel busbars"
                className="w-full h-full object-cover select-none"
              />
            </div>
            {/* Float Badge overlay */}
            <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white dark:bg-white dark:text-black p-6 rounded-2xl shadow-xl z-20 hidden sm:block">
              <div className="font-display text-3xl font-extrabold leading-tight">Yrs 4+</div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-1">
                Field Excellence
              </div>
            </div>
          </div>

        </div>

        {/* Part 2: Dynamic Partnership Marquee / Grid */}
        <div className="mb-24" id="partnerships-marquee-grid">
          <div className="text-center mb-10">
            <span className="font-display text-xs font-bold text-slate-400 uppercase tracking-[0.2em] block mb-1">
              Authorized Expertise
            </span>
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
              Compatible Brand Ecosystems
            </h3>
          </div>

          <div className="p-3 sm:p-5 rounded-3xl bg-slate-200/70 dark:bg-zinc-950/80 border border-slate-300/80 dark:border-zinc-800/90 shadow-2xl backdrop-blur-xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5 items-end" id="partners-group-logos">
            {PARTNER_BRANDS.map((partner, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800/90 shadow-md transition-all duration-300 ease-out origin-bottom hover:-translate-y-3.5 hover:scale-110 hover:z-20 hover:shadow-2xl hover:shadow-sky-500/20 hover:border-sky-500 dark:hover:border-sky-400 text-center cursor-pointer"
              >
                <div className="w-full h-28 mb-2.5 rounded-xl overflow-hidden flex items-center justify-center bg-white p-2 border border-slate-100 dark:border-zinc-800 shadow-inner">
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="font-display font-extrabold text-slate-900 dark:text-white text-base sm:text-lg tracking-wider uppercase">
                      {partner.name}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <div className="font-display text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-tight line-clamp-1">
                    {partner.name}
                  </div>
                  <span className="font-sans text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-400 block mt-0.5 line-clamp-1">
                    {partner.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 3: Trust Badges grid with custom indicators */}
        <div className="border-t border-slate-100 dark:border-zinc-900 pt-20" id="trust-badges-suite">
          <div className="text-center max-w-sm mx-auto mb-16">
            <span className="font-display text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] block mb-1">
              Safety and Assembly Protocols
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
              Why Engineers Trust Eastern Alliance Automation LLP
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TRUST_BADGES.map((badge, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-white dark:bg-zinc-900/20 border border-slate-200/50 dark:border-zinc-850/50 space-y-3 hover:translate-y-[-2px] transition-transform duration-300 shadow-sm"
                id={`trust-badge-card-${idx}`}
              >
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <span className="font-display font-bold text-sm text-slate-900 dark:text-white tracking-tight">
                    {badge.title}
                  </span>
                </div>
                <p className="text-sky-600 dark:text-sky-400 text-sm sm:text-base font-medium leading-relaxed">
                  {badge.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
