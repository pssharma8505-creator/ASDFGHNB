import React, { useState, useMemo } from "react";
import { PRODUCTS_CATALOG } from "../data";
import { Product } from "../types";
import { Search, ChevronRight, X, ArrowUpRight, ArrowRight, Layers, Cpu, ShieldAlert, Cpu as DriveIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProductSectionProps {
  onOrderProduct: (productName: string) => void;
  onViewGallery?: () => void;
}

export default function ProductSection({ onOrderProduct, onViewGallery }: ProductSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { key: "all", label: "All Catalog" },
    { key: "panel", label: "Control Panels" },
    { key: "drive", label: "Industrial Drives" },
    { key: "stabilizer", label: "Servo Stabilizers" },
    { key: "service", label: "Engineering Services" },
    { key: "spares", label: "Genuine Spares" },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <section id="products" className="py-24 lg:py-28 xl:py-32 bg-slate-50 dark:bg-zinc-950 transition-colors w-full">
      <div className="container-wide">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-slate-500 dark:text-zinc-400 font-sans text-xs font-semibold uppercase tracking-widest mb-3">
              <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Supreme Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-slate-900 dark:text-white tracking-[-0.025em] leading-[1.1]">
              Industrial Control &amp; Automation
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 mt-3 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              Uncompromising reliability for heavy metallurgy, paper mills, continuous cable extrusions, and enterprise grids.
            </p>
          </div>

          {/* Interactive Industrial Search Bar */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-slate-900 dark:group-focus-within:text-white transition-colors" />
            <input
              type="text"
              placeholder="Search catalog models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all shadow-sm"
              id="product-search-input"
            />
          </div>
        </div>

        {/* Filter Slider Switch */}
        <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-none mb-12 border-b border-slate-200/60 dark:border-zinc-800/60" id="product-category-filters">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-6 py-3 rounded-full font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap border cursor-pointer shadow-sm ${
                activeCategory === cat.key
                  ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black dark:border-white shadow-md"
                  : "bg-white text-slate-800 border-slate-200/90 hover:border-slate-400 dark:bg-zinc-900/70 dark:text-zinc-200 dark:border-zinc-800 dark:hover:border-zinc-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="products-grid">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="group flex flex-col justify-between h-full rounded-2xl bg-white dark:bg-zinc-900/80 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-zinc-950">
                  <img
                    referrerPolicy="no-referrer"
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-slate-950/80 dark:bg-zinc-950/90 text-white backdrop-blur-sm rounded-full">
                      {p.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-sans font-semibold text-slate-900 dark:text-white tracking-[-0.015em] leading-snug mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sky-600 dark:text-sky-400 text-base sm:text-lg font-medium leading-relaxed line-clamp-3 mb-6">
                      {p.shortDesc}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-auto">
                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="flex-1 py-3 rounded-full border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 font-sans text-xs font-semibold tracking-wider uppercase text-slate-900 dark:text-zinc-100 transition-colors cursor-pointer"
                    >
                      Specifications
                    </button>
                    <button
                      onClick={() => onOrderProduct(p.title)}
                      className="p-3 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black hover:scale-105 transition-transform cursor-pointer"
                      title="Pre-fill inquiry"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <p className="text-slate-500 dark:text-zinc-400 font-sans text-base font-medium uppercase tracking-wide">
                No industrial engineering models found.
              </p>
            </div>
          )}
        </div>

        {/* Dynamic Gallery Banner CTA */}
        {onViewGallery && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 p-8 sm:p-12 rounded-3xl bg-white dark:bg-zinc-900/60 text-slate-900 dark:text-white border border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl"
            id="product-gallery-banner"
          >
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-emerald-600 dark:text-emerald-400 font-sans text-xs uppercase tracking-widest font-bold"> Blueprint Showroom & Actual Builds </span>
              <h4 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 dark:text-white tracking-tight">
                Want to inspect our real control panels & assemblies?
              </h4>
              <p className="text-base sm:text-lg text-sky-600 dark:text-sky-300 font-medium max-w-xl leading-relaxed">
                Browse our engineering gallery showcasing actual custom Siemens PLC controllers, heavy-duty MCC/PCC assemblies, and breakdown repair testing stages in Ghaziabad.
              </p>
            </div>
            <button
              onClick={onViewGallery}
              className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 rounded-xl px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] shrink-0 cursor-pointer shadow-md"
            >
              Open Engineering Gallery →
            </button>
          </motion.div>
        )}
      </div>

      {/* Specifications Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Modal Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal content frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl z-20"
              id="product-specifications-modal"
            >
              {/* Close Button Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 z-30 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                id="modal-close-button"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
                
                {/* Left Panel: Cover Image in high res */}
                <div className="relative h-48 md:h-full bg-zinc-150 dark:bg-zinc-950">
                  <img
                    referrerPolicy="no-referrer"
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                    <span className="px-3 py-1 self-start text-[9px] font-bold tracking-widest uppercase bg-white/20 text-white backdrop-blur-sm rounded-full mb-3">
                      {selectedProduct.category} Catalog
                    </span>
                    <h3 className="text-2xl font-bold font-sans text-white tracking-tight">
                      {selectedProduct.title}
                    </h3>
                  </div>
                </div>

                {/* Right Panel: Scrollable details listing */}
                <div className="p-8 space-y-6">
                  
                  {/* Part 1: Specifications parameters */}
                  <div>
                    <h4 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
                      Product Parameters
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-start py-2 border-b border-zinc-100 dark:border-zinc-800 text-xs sm:text-sm">
                          <span className="text-zinc-550 dark:text-zinc-400 font-medium pl-1">{key}</span>
                          <span className="text-zinc-900 dark:text-white font-semibold text-right max-w-[60%]">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Part 2: Engineering Features */}
                  <div>
                    <h4 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
                      Engineering Features
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-zinc-650 dark:text-zinc-300">
                      {selectedProduct.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-zinc-950 dark:text-white font-bold mr-2">/</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Part 3: Applications & industries served */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2.5">
                        Applications
                      </h4>
                      <ul className="space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                        {selectedProduct.applications.map((app, idx) => (
                          <li key={idx} className="flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                            <span>{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2.5">
                        Sectors
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProduct.industriesServed.map((ind, idx) => (
                          <span key={idx} className="bg-zinc-100 dark:bg-zinc-800 text-zinc-750 dark:text-zinc-300 px-2 py-1 rounded text-[10px] font-semibold">
                            {ind}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA Grid inside modal */}
                  <div className="flex gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <button
                      onClick={() => {
                        onOrderProduct(selectedProduct.title);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 py-3 bg-zinc-950 dark:bg-white text-white dark:text-black font-sans text-xs font-bold uppercase tracking-wider rounded-xl hover:translate-y-[-1px] transition-transform flex items-center justify-center space-x-2 shadow-md"
                    >
                      <span>Inquire Now</span>
                      <ArrowUpRight className="w-4 h-4 font-bold" />
                    </button>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="px-5 py-3 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-sans text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-zinc-55 dark:hover:bg-zinc-850"
                    >
                      Close
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
