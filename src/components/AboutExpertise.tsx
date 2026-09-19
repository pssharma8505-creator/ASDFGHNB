import React from "react";
import { TRUST_BADGES, PARTNER_BRANDS } from "../data";
import { ShieldCheck, Factory, Zap } from "lucide-react";

export default function AboutExpertise() {
  return (
    <section id="about-us" className="py-24 bg-[#fbfbfd] text-slate-900 transition-colors overflow-hidden border-t border-slate-200/60 w-full">
      <div className="container-wide">
        
        {/* Core Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Left Block: Company story write-up */}
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-6" id="about-profile-writeup">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-slate-600 font-sans text-xs font-semibold uppercase tracking-wider">
              <span>About Us Corporate Profile</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extralight text-slate-900 tracking-[-0.03em] leading-[1.1]">
              Pioneering Tomorrow&apos;s <span className="font-bold">Industrial Grids</span> Today
            </h2>
            
            <div className="space-y-4 font-sans text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              <p>
                At <strong className="text-slate-900 font-semibold">Eastern Alliance Automation LLP</strong>, our pursuit of excellence is driven by a commitment to delivering <strong>high-quality products, enhanced services, and systematic operational solutions</strong> that empower industries to achieve greater efficiency and reliability.
              </p>
              <p>
                Established in <strong className="text-slate-900 font-semibold">2022</strong>, Eastern Alliance Automation LLP has rapidly emerged as a <strong>trusted leader in industrial automation and electrical solutions</strong> based in <strong>Ghaziabad, India</strong>. We specialize in providing advanced automation systems and premium electrical products tailored to meet the evolving needs of modern industries.
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
              <p className="border-l-2 border-slate-900 pl-4 font-normal text-slate-800 italic font-serif mt-6">
                <strong>Passion to Innovate — Engineering Excellence for a Smarter Tomorrow.</strong>
              </p>
            </div>

            {/* Metrics list */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200/80">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-xs">
                  <Factory className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="font-sans font-bold text-xs text-slate-900">State-of-art Facility</div>
                  <div className="font-sans text-[11px] text-slate-500">Mohan Nagar, Ghaziabad, UP</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-xs">
                  <Zap className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="font-sans font-bold text-xs text-slate-900">IEC Compliance</div>
                  <div className="font-sans text-[11px] text-slate-500">Fully type-tested systems</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Image */}
          <div className="lg:col-span-5 order-1 lg:order-2 relative" id="about-image-stage">
            <div className="relative aspect-square sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-100 z-10">
              <img
                referrerPolicy="no-referrer"
                loading="lazy"
                src="https://easternallianceautomation.in/wp-content/uploads/2025/10/engineer-4941329_1280.jpg"
                alt="Eastern Alliance lead engineer troubleshooting panel busbars"
                className="w-full h-full object-cover select-none"
              />
            </div>
            {/* Float Badge overlay */}
            <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-6 rounded-3xl shadow-xl z-20 hidden sm:block">
              <div className="font-sans text-3xl font-extrabold leading-tight">Yrs 4+</div>
              <div className="font-sans text-[10px] uppercase tracking-wider text-slate-300 mt-1">
                Field Excellence
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Partnership Grid */}
        <div className="mb-24" id="partnerships-marquee-grid">
          <div className="text-center mb-10">
            <span className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Authorized Expertise
            </span>
            <h3 className="text-2xl font-bold font-sans text-slate-900 tracking-tight">
              Compatible Brand Ecosystems
            </h3>
          </div>

          <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-stretch" id="partners-group-logos">
            {PARTNER_BRANDS.map((partner, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="w-full h-24 mb-3 rounded-xl overflow-hidden flex items-center justify-center bg-white p-2 border border-slate-200/60 shadow-xs">
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  ) : (
                    <span className="font-sans font-bold text-slate-900 text-sm tracking-wider uppercase">
                      {partner.name}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <div className="font-sans text-xs font-bold text-slate-900 uppercase tracking-tight line-clamp-1">
                    {partner.name}
                  </div>
                  <span className="font-sans text-[11px] font-semibold text-slate-500 block mt-0.5 line-clamp-1">
                    {partner.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges grid */}
        <div className="border-t border-slate-200/80 pt-20" id="trust-badges-suite">
          <div className="text-center max-w-sm mx-auto mb-16">
            <span className="font-sans text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">
              Safety and Assembly Protocols
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
              Why Engineers Trust Eastern Alliance Automation LLP
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TRUST_BADGES.map((badge, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white border border-slate-200/80 space-y-3 hover:-translate-y-1 transition-all duration-300 shadow-xs"
                id={`trust-badge-card-${idx}`}
              >
                <div className="flex items-center space-x-2 text-slate-900">
                  <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600" />
                  <span className="font-sans font-bold text-sm text-slate-900 tracking-tight">
                    {badge.title}
                  </span>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
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
