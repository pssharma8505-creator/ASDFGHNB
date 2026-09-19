import React, { useState, useMemo } from "react";
import { PRODUCTS_CATALOG } from "../data";
import { Product } from "../types";
import { Search, X, ArrowUpRight, ArrowRight, Layers } from "lucide-react";
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
    <section id="products" className="py-24 bg-[#fbfbfd] text-slate-900 transition-colors w-full border-t border-slate-200/60">
      <div className="container-wide">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-slate-600 font-sans text-xs font-semibold uppercase tracking-wider mb-4">
              <Layers className="w-3.5 h-3.5 text-slate-700" />
              <span>Supreme Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-slate-900 tracking-[-0.03em] leading-[1.1]">
              Industrial Control &amp; Automation
            </h2>
            <p className="text-slate-600 mt-3 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              Uncompromising reliability for heavy metallurgy, paper mills, continuous cable extrusions, and enterprise grids.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
            <input
              type="text"
              placeholder="Search catalog models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all shadow-xs"
              id="product-search-input"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex overflow-x-auto pb-4 gap-2.5 scrollbar-none mb-12 border-b border-slate-200/60" id="product-category-filters">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.key
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50"
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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col justify-between h-full rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase bg-white/90 text-slate-900 backdrop-blur-md rounded-full border border-slate-200/80 shadow-xs">
                      {p.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-sans font-bold text-slate-900 tracking-tight leading-snug mb-3">
                      {p.title}
                    </h3>
                    <p className="text-slate-600 text-sm font-normal leading-relaxed line-clamp-3 mb-6">
                      {p.shortDesc}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-auto">
                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="flex-1 py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 font-sans text-xs font-bold tracking-wider uppercase text-slate-900 transition-colors cursor-pointer shadow-xs"
                    >
                      Specifications
                    </button>
                    <button
                      onClick={() => onOrderProduct(p.title)}
                      className="p-3 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-all cursor-pointer shadow-xs active:scale-95"
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
              <p className="text-slate-500 font-sans text-sm font-medium uppercase tracking-wide">
                No industrial engineering models found matching query.
              </p>
            </div>
          )}
        </div>

        {/* Gallery Banner CTA */}
        {onViewGallery && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20 p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/80 text-slate-900 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-sm"
            id="product-gallery-banner"
          >
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-slate-500 font-sans text-xs uppercase tracking-wider font-bold">
                Blueprint Showroom &amp; Actual Builds
              </span>
              <h4 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 tracking-tight">
                Want to inspect our real control panels &amp; assemblies?
              </h4>
              <p className="text-sm sm:text-base text-slate-600 font-normal max-w-xl leading-relaxed">
                Browse our engineering gallery showcasing actual custom Siemens PLC controllers, heavy-duty MCC/PCC assemblies, and breakdown repair testing stages in Ghaziabad.
              </p>
            </div>
            <button
              onClick={onViewGallery}
              className="bg-slate-900 text-white hover:bg-slate-800 rounded-2xl px-8 py-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] shrink-0 cursor-pointer shadow-sm"
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
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs"
            />

            {/* Modal Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl z-20 border border-slate-200/80"
              id="product-specifications-modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 z-30 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
                id="modal-close-button"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
                
                {/* Left Panel */}
                <div className="relative h-48 md:h-full bg-slate-100">
                  <img
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex flex-col justify-end p-6">
                    <span className="px-3 py-1 self-start text-[10px] font-bold tracking-widest uppercase bg-white/20 text-white backdrop-blur-md rounded-full mb-2">
                      {selectedProduct.category} Catalog
                    </span>
                    <h3 className="text-2xl font-bold font-sans text-white tracking-tight">
                      {selectedProduct.title}
                    </h3>
                  </div>
                </div>

                {/* Right Panel */}
                <div className="p-8 space-y-6">
                  
                  {/* Specifications */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Product Parameters
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-start py-2 border-b border-slate-100 text-xs sm:text-sm">
                          <span className="text-slate-500 font-medium">{key}</span>
                          <span className="text-slate-900 font-bold text-right max-w-[60%]">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Engineering Features */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Engineering Features
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                      {selectedProduct.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-slate-900 font-bold mr-2">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Applications & Sectors */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Applications
                      </h4>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {selectedProduct.applications.map((app, idx) => (
                          <li key={idx} className="flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            <span>{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Sectors
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProduct.industriesServed.map((ind, idx) => (
                          <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-[10px] font-semibold">
                            {ind}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA Grid */}
                  <div className="flex gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => {
                        onOrderProduct(selectedProduct.title);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 py-3.5 bg-slate-900 text-white font-sans text-xs font-bold uppercase tracking-wider rounded-2xl hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                    >
                      <span>Inquire Now</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="px-5 py-3.5 border border-slate-200 text-slate-700 font-sans text-xs font-bold uppercase tracking-wider rounded-2xl hover:bg-slate-50 cursor-pointer"
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
