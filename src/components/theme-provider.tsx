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

// Define a neutral initial theme
const initialTheme: Theme = {
  baseColor: "#000000",
  accentColor: "#ffffff",
  name: "initial",
  type: "light",
};

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
  // Use the neutral initial theme
  const [theme, setTheme] = useState<Theme>(initialTheme);
  
  useEffect(() => {
    // Set random theme immediately on mount
    const randomScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
    console.log('Current theme:', randomScheme.name, 
      '\nBase color:', randomScheme.baseColor, 
      '\nAccent color:', randomScheme.accentColor);
    setTheme(randomScheme);
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <div
        style={{
          backgroundColor: theme.baseColor,
          color: theme.accentColor,
          minHeight: "100vh",
          transition: "background-color 0.3s, color 0.3s", // Add smooth transition
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};