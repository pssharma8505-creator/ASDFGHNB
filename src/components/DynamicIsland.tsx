import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  ChevronRight, 
  Compass, 
  Briefcase, 
  Cpu, 
  Image as ImageIcon, 
  PhoneCall, 
  Sparkles,
  Layers,
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

  // Web Audio synth engine for interactive chime & warning sounds
  const playSound = (type: "alert" | "error") => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      if (type === "alert") {
        // High-pitched warning warning chime
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(660, ctx.currentTime); // E5
        gain1.gain.setValueAtTime(0.15, ctx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start();
        osc1.stop(ctx.currentTime + 0.38);

        // Quick secondary note for pleasant retro/hardware feedback
        setTimeout(() => {
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = "sine";
          osc2.frequency.setValueAtTime(880, ctx.currentTime); // A5
          gain2.gain.setValueAtTime(0.12, ctx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
          
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start();
          osc2.stop(ctx.currentTime + 0.42);
        }, 90);
        
      } else if (type === "error") {
        // Harsh industrial buzzer sound
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

        // Dual resonant low oscillator
        setTimeout(() => {
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = "square";
          osc2.frequency.setValueAtTime(110, ctx.currentTime);
          osc2.frequency.linearRampToValueAtTime(65, ctx.currentTime + 0.45);
          
          gain2.gain.setValueAtTime(0.18, ctx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.50);
          
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start();
          osc2.stop(ctx.currentTime + 0.52);
        }, 120);
      }
    } catch (e) {
      console.warn("Chime Audio synthesis failed", e);
    }
  };

  // Prevent right-click globally and handle security alert logic
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault(); // Protect right-click globally

      // Redirect user to product page on right-click shortcut
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

      // Reset count after 5 seconds of right-click inactivity
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

  // Define spring transition configured for organic physical "bounce"
  const springTransition = {
    type: "spring",
    stiffness: 380,
    damping: 18,
    mass: 0.8,
  };

  // Nav actions
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
        className="pointer-events-auto text-white rounded-3xl overflow-hidden flex flex-col justify-center select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        layout
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 18,
          mass: 0.8,
          scale: {
            type: "keyframes",
            duration: 0.6,
            ease: "easeInOut"
          },
          x: {
            type: "keyframes",
            duration: 0.6,
            ease: "linear"
          }
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
        style={{
          background: 
            warningState === "second"
              ? "linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(185, 28, 28, 0.98) 100%)"
              : warningState === "first"
              ? "linear-gradient(135deg, rgba(220, 38, 38, 0.92) 0%, rgba(153, 27, 27, 0.95) 100%)"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)",
          backdropFilter: "blur(28px) saturate(190%)",
          WebkitBackdropFilter: "blur(28px) saturate(190%)",
          border: 
            warningState !== "none"
              ? "1px solid rgba(239, 68, 68, 0.45)"
              : "1px solid rgba(255, 255, 255, 0.22)",
          boxShadow: isHovered 
            ? "0 35px 60px -15px rgba(0, 0, 0, 0.5), inset 0 2px 4px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.2)" 
            : "0 20px 40px -10px rgba(0, 0, 0, 0.35), inset 0 1.5px 3px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.15)",
        }}
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
                className="flex items-center justify-center space-x-2 w-full h-full px-3 text-white cursor-pointer active:scale-95 hover:brightness-110 transition-all"
                title="Click to view our products instead"
              >
                <XCircle className="w-5 h-5 text-white/90 shrink-0" />
                <span className="text-[11px] sm:text-xs font-mono font-medium tracking-wide text-center">
                  SORRY you can't access background code. <span className="underline decoration-dotted text-amber-200 font-bold ml-1">Go to Products →</span>
                </span>
              </motion.div>
            ) : warningState === "second" ? (
              <motion.div 
                key="warning-second"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => scrollToSection("products")}
                className="flex items-center justify-center space-x-2 w-full h-full px-3 text-white cursor-pointer active:scale-95 hover:brightness-110 transition-all"
                title="Click to view our products instead"
              >
                <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0 animate-bounce" />
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wide text-center">
                  WARNING: Unauthorized inspect! <span className="underline decoration-dotted text-white font-black ml-1">Explore Products →</span>
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
                {/* Secure label and icon */}
                <div className="flex items-center space-x-2 text-zinc-300">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
                  <span className="text-xs font-mono font-medium tracking-[0.08em] uppercase text-zinc-100">
                    Secure
                  </span>
                </div>

                {/* Vertical Divider */}
                <div className="h-4 w-[1px] bg-white/10" />

                {/* Order Button */}
                <button
                  type="button"
                  onClick={() => scrollToSection("custom-control-panel")}
                  className="flex items-center space-x-1.5 px-3 py-1 bg-white hover:bg-zinc-105 active:scale-95 text-zinc-950 text-xs font-semibold rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
                  id="island-order-btn"
                >
                  <span>Order</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </motion.div>
            ) : (
              /* Expanded State Content */
              <motion.div 
                key="expanded"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-col justify-center w-full h-full space-y-2 px-2"
              >
                {/* Top bar with Secure, Order status and heading */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center space-x-1.5 text-zinc-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-300">Secure Panel Link</span>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => scrollToSection("custom-control-panel")}
                    className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm transition-all cursor-pointer"
                    id="island-expanded-order-btn"
                  >
                    <span>Instant Order</span>
                  </button>
                </div>

                {/* Shortcuts & quick-scroll map */}
                <div className="grid grid-cols-4 gap-1.5">
                  {shortcuts.map((sc) => {
                    const Icon = sc.icon;
                    const isActive = sc.id === "gallery_page" ? currentPage === "gallery" : false;
                    return (
                      <button
                        key={sc.id}
                        type="button"
                        onClick={() => scrollToSection(sc.id)}
                        className={`flex items-center justify-center space-x-1 py-1.5 px-1 rounded-lg border text-[10px] font-medium tracking-wide transition-all duration-200 active:scale-95 cursor-pointer ${
                          isActive 
                            ? "bg-white/15 border-white/25 text-white shadow-inner"
                            : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10 text-zinc-300 hover:text-white"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-zinc-400" />
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
