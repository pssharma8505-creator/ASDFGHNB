import React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme, ThemeMode } from "../context/ThemeContext";

interface ThemeSwitcherProps {
  className?: string;
  compact?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  className = "",
  compact = false,
}) => {
  const { themeMode, setThemeMode } = useTheme();

  const options: { mode: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { mode: "light", label: "Light", icon: <Sun className="w-3.5 h-3.5" /> },
    { mode: "dark", label: "Dark", icon: <Moon className="w-3.5 h-3.5" /> },
    { mode: "system", label: "System", icon: <Monitor className="w-3.5 h-3.5" /> },
  ];

  const handleSelect = (mode: ThemeMode, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    setThemeMode(mode, { x, y });
  };

  return (
    <div
      className={`inline-flex items-center p-1 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-inner transition-colors ${className}`}
      role="group"
      aria-label="Select color theme"
    >
      {options.map((option) => {
        const isActive = themeMode === option.mode;
        return (
          <button
            key={option.mode}
            onClick={(e) => handleSelect(option.mode, e)}
            type="button"
            title={`${option.label} theme`}
            aria-label={`Switch to ${option.label} theme`}
            aria-pressed={isActive}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
              isActive
                ? "bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm font-semibold"
                : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
            }`}
          >
            {option.icon}
            {!compact && <span className="text-[11px] font-sans">{option.label}</span>}
          </button>
        );
      })}
    </div>
  );
};
