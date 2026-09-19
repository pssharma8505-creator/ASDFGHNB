import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  themeMode: ThemeMode;
  resolvedDarkMode: boolean;
  setThemeMode: (mode: ThemeMode, origin?: { x: number; y: number }) => void;
  rippleState: { x: number; y: number; mode: ThemeMode } | null;
  clearRipple: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "eaa_theme_mode";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode;
      if (saved === "light" || saved === "dark" || saved === "system") {
        return saved;
      }
    }
    return "system";
  });

  const [resolvedDarkMode, setResolvedDarkMode] = useState<boolean>(false);
  const [rippleState, setRippleState] = useState<{ x: number; y: number; mode: ThemeMode } | null>(null);

  // Helper to determine if system prefers dark mode
  const getSystemPrefersDark = useCallback(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  }, []);

  // Update resolved dark mode whenever themeMode or system preference changes
  useEffect(() => {
    const isDark =
      themeMode === "dark" || (themeMode === "system" && getSystemPrefersDark());

    setResolvedDarkMode(isDark);

    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  }, [themeMode, getSystemPrefersDark]);

  // Listen to system preference changes when in 'system' mode
  useEffect(() => {
    if (themeMode !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const isDark = e.matches;
      setResolvedDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.style.colorScheme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.colorScheme = "light";
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [themeMode]);

  const setThemeMode = useCallback((mode: ThemeMode, origin?: { x: number; y: number }) => {
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: reduce)").matches;

    // Check View Transitions API support
    const hasViewTransition = typeof document !== "undefined" && "startViewTransition" in document && !prefersReducedMotion;

    if (hasViewTransition) {
      const x = origin?.x ?? (typeof window !== "undefined" ? window.innerWidth / 2 : 0);
      const y = origin?.y ?? (typeof window.innerHeight !== "undefined" ? window.innerHeight / 2 : 0);

      const maxDistX = Math.max(x, window.innerWidth - x);
      const maxDistY = Math.max(y, window.innerHeight - y);
      const endRadius = Math.hypot(maxDistX, maxDistY);

      const transition = (document as any).startViewTransition(() => {
        setThemeModeState(mode);
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, mode);
        }
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          [
            { clipPath: `circle(0px at ${x}px ${y}px)` },
            { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` },
          ],
          {
            duration: 220,
            easing: "cubic-bezier(0.2, 0, 0, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      setThemeModeState(mode);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, mode);
      }

      if (origin && !prefersReducedMotion) {
        setRippleState({ x: origin.x, y: origin.y, mode });
      }
    }
  }, []);

  const clearRipple = useCallback(() => {
    setRippleState(null);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        resolvedDarkMode,
        setThemeMode,
        rippleState,
        clearRipple,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
