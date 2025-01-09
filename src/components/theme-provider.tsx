"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { colorSchemes } from "../lib/color-schemes";

interface Theme {
  baseColor: string;
  accentColor: string;
  name: string;
  type: "light" | "mid" | "dark";
}

const ThemeContext = createContext<Theme | null>(null);

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(colorSchemes[0]);
  const hasSetTheme = useRef(false);

  useEffect(() => {
    if (!hasSetTheme.current) {
      const randomScheme =
        colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
      setTheme(randomScheme);
      hasSetTheme.current = true;
    }
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <div
        style={{
          backgroundColor: theme.baseColor,
          color: theme.accentColor,
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
