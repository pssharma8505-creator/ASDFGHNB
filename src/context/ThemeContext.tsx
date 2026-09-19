import React, { createContext, useContext } from "react";

export type ThemeMode = "light";

interface ThemeContextType {
  themeMode: ThemeMode;
  resolvedDarkMode: boolean;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider
      value={{
        themeMode: "light",
        resolvedDarkMode: false,
        setThemeMode: () => {},
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
