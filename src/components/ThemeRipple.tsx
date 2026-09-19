import React, { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export const ThemeRipple: React.FC = () => {
  const { rippleState, clearRipple, resolvedDarkMode } = useTheme();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rippleState || !overlayRef.current) return;

    const { x, y } = rippleState;
    const overlay = overlayRef.current;

    // Calculate distance to furthest corner from click origin
    const maxDistX = Math.max(x, window.innerWidth - x);
    const maxDistY = Math.max(y, window.innerHeight - y);
    const maxRadius = Math.hypot(maxDistX, maxDistY);

    // Apply animation via Web Animations API for fast GPU smoothness
    const animation = overlay.animate(
      [
        { clipPath: `circle(0px at ${x}px ${y}px)`, opacity: 0.95 },
        { clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`, opacity: 1 },
      ],
      {
        duration: 220,
        easing: "cubic-bezier(0.2, 0, 0, 1)",
        fill: "forwards",
      }
    );

    animation.onfinish = () => {
      clearRipple();
    };

    return () => {
      animation.cancel();
    };
  }, [rippleState, clearRipple]);

  if (!rippleState) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-[9999] ${
        resolvedDarkMode ? "bg-zinc-950" : "bg-slate-50"
      }`}
      style={{
        clipPath: `circle(0px at ${rippleState.x}px ${rippleState.y}px)`,
      }}
    />
  );
};
