import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  ChevronRight, 
  Briefcase, 
  Cpu, 
  Image as ImageIcon, 
  PhoneCall, 
  XCircle,
  AlertTriangle
} from "lucide-react";

interface DynamicIslandProps {
  scrollToSection: (id: string) => void;
  currentPage: "home" | "gallery";
}

export default function DynamicIsland({ scrollToSection, currentPage }: DynamicIslandProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [rightClickCount, setRightClickCount] = useState(0);
  const [warningState, setWarningState] = useState<"none" | "first" | "second">("none");

  const scrollToSectionRef = useRef(scrollToSection);
  useEffect(() => {
    scrollToSectionRef.current = scrollToSection;
  }, [scrollToSection]);

  const playSound = (type: "alert" | "error") => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      if (type === "alert") {
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(660, ctx.currentTime);
        gain1.gain.setValueAtTime(0.15, ctx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start();
        osc1.stop(ctx.currentTime + 0.38);

        setTimeout(() => {
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = "sine";
          osc2.frequency.setValueAtTime(880, ctx.currentTime);
          gain2.gain.setValueAtTime(0.12, ctx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start();
          osc2.stop(ctx.currentTime + 0.42);
        }, 90);
        
      } else if (type === "error") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(75, ctx.currentTime + 0.45);
        gain.gain.setValueAtTime(0.22, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.52);
      }
    } catch (e) {
      console.warn("Chime Audio synthesis failed", e);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();

      if (scrollToSectionRef.current) {
        scrollToSectionRef.current("products");
      }

      if (timer) clearTimeout(timer);

      setRightClickCount((prev) => {
        const next = prev + 1;
        if (next === 4) {
          setWarningState("first");
          playSound("alert");
        } else if (next === 8) {
          setWarningState("second");
          playSound("error");
        }
        return next;
      });

      timer = setTimeout(() => {
        setRightClickCount(0);
        setWarningState("none");
      }, 5000);
    };

    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const shortcuts = [
    { label: "Services", id: "services", icon: Briefcase },
    { label: "Products", id: "products", icon: Cpu },
    { label: "Gallery", id: "gallery_page", icon: ImageIcon },
    { label: "Contact", id: "contact-us", icon: PhoneCall },
  ];

  return (
    <div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full max-w-xl px-4 flex justify-center"
      id="dynamic-island-anchor"
    >
      <motion.div
        className="pointer-events-auto text-slate-900 rounded-full overflow-hidden flex flex-col justify-center select-none shadow-xl border border-slate-200/80 bg-white/90 backdrop-blur-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        layout
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 18,
          mass: 0.8,
        }}
        animate={
          warningState === "second"
            ? {
                width: "480px",
                height: "56px",
                borderRadius: "20px",
                x: [0, -10, 10, -10, 10, -5, 5, -2, 2, 0],
                scale: [1, 1.05, 0.95, 1.02, 1],
              }
            : warningState === "first"
            ? {
                width: "420px",
                height: "52px",
                borderRadius: "20px",
                scale: [1, 1.15, 0.92, 1.06, 1],
                x: 0,
              }
            : {
                width: isHovered ? "100%" : "315px",
                height: isHovered ? "84px" : "48px",
                borderRadius: isHovered ? "24px" : "9999px",
                scale: 1,
                x: 0,
              }
        }
        id="dynamic-island-body"
      >
        <div className="relative w-full h-full flex flex-col justify-center px-2">
          
          <AnimatePresence mode="wait">
            {warningState === "first" ? (
              <motion.div 
                key="warning-first"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => scrollToSection("products")}
                className="flex items-center justify-center space-x-2 w-full h-full px-3 text-rose-700 font-sans cursor-pointer active:scale-95 transition-all"
                title="Click to view our products instead"
              >
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold tracking-wide text-center">
                  SORRY you can&apos;t access code. <span className="underline font-bold ml-1">Go to Products →</span>
                </span>
              </motion.div>
            ) : warningState === "second" ? (
              <motion.div 
                key="warning-second"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => scrollToSection("products")}
                className="flex items-center justify-center space-x-2 w-full h-full px-3 text-rose-800 font-sans cursor-pointer active:scale-95 transition-all"
                title="Click to view our products instead"
              >
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 animate-bounce" />
                <span className="text-[11px] sm:text-xs font-bold tracking-wide text-center">
                  WARNING: Inspect restricted! <span className="underline font-extrabold ml-1">Explore Products →</span>
                </span>
              </motion.div>
            ) : !isHovered ? (
              <motion.div 
                key="resting"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-between w-full h-full px-3"
              >
                <div className="flex items-center space-x-2 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Secure
                  </span>
                </div>

                <div className="h-4 w-[1px] bg-slate-200" />

                <button
                  type="button"
                  onClick={() => scrollToSection("custom-control-panel")}
                  className="flex items-center space-x-1 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-full transition-all cursor-pointer"
                  id="island-order-btn"
                >
                  <span>Order</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="expanded"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-col justify-center w-full h-full space-y-2 px-2"
              >
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center space-x-1.5 text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Secure Link</span>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => scrollToSection("custom-control-panel")}
                    className="flex items-center space-x-1 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-xs transition-all cursor-pointer"
                    id="island-expanded-order-btn"
                  >
                    <span>Instant Order</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  {shortcuts.map((sc) => {
                    const Icon = sc.icon;
                    const isActive = sc.id === "gallery_page" ? currentPage === "gallery" : false;
                    return (
                      <button
                        key={sc.id}
                        type="button"
                        onClick={() => scrollToSection(sc.id)}
                        className={`flex items-center justify-center space-x-1 py-1.5 px-1 rounded-xl text-[10px] font-bold tracking-wide transition-all cursor-pointer ${
                          isActive 
                            ? "bg-slate-200 text-slate-900 font-bold"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-slate-500" />
                        <span className="hidden sm:inline">{sc.label}</span>
                      </button>
                    );
                  })}
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
}
