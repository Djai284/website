"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

interface Theme {
  baseColor: string;
  accentColor: string;
  name: string;
  type: "light" | "mid" | "dark";
}

const colorSchemes: Theme[] = [
  // Light themes
  // {
  //   baseColor: "#0000FF",
  //   accentColor: "#FFE4E1",
  //   name: "light-red",
  //   type: "light",
  // },
  // {
  //   baseColor: "#0000FF",
  //   accentColor: "#DEB887",
  //   name: "light-brown",
  //   type: "light",
  // },
  // {
  //   baseColor: "#0000FF",
  //   accentColor: "#FFE4B5",
  //   name: "light-orange",
  //   type: "light",
  // },
  // {
  //   baseColor: "#0000FF",
  //   accentColor: "#FFFFE0",
  //   name: "light-yellow",
  //   type: "light",
  // },
  {
    baseColor: "#800080",
    accentColor: "#98FB98",
    name: "light-green",
    type: "light",
  },
  {
    baseColor: "#8B4513",
    accentColor: "#E0FFFF",
    name: "light-cyan",
    type: "light",
  },
  {
    baseColor: "#556B2F",
    accentColor: "#E6E6FA",
    name: "light-blue",
    type: "light",
  },
  {
    baseColor: "#006400",
    accentColor: "#FFE4E1",
    name: "light-violet",
    type: "light",
  },
  {
    baseColor: "#006400",
    accentColor: "#FFB6C1",
    name: "light-magenta",
    type: "light",
  },
  {
    baseColor: "#000000",
    accentColor: "#FFFFFF",
    name: "light-gray",
    type: "light",
  },

  // Mid themes
  {
    baseColor: "#000000",
    accentColor: "#FF4500",
    name: "mid-red",
    type: "mid",
  },
  {
    baseColor: "#E0FFFF",
    accentColor: "#8B4513",
    name: "mid-brown",
    type: "mid",
  },
  {
    baseColor: "#0000FF",
    accentColor: "#FFA500",
    name: "mid-orange",
    type: "mid",
  },
  // {
  //   baseColor: "#0000FF",
  //   accentColor: "#FFFF00",
  //   name: "mid-yellow",
  //   type: "mid",
  // },
  {
    baseColor: "#000000",
    accentColor: "#00FF00",
    name: "mid-green",
    type: "mid",
  },
  {
    baseColor: "#000000",
    accentColor: "#00FFFF",
    name: "mid-cyan",
    type: "mid",
  },
  {
    baseColor: "#FFFF00",
    accentColor: "#0000FF",
    name: "mid-blue",
    type: "mid",
  },
  {
    baseColor: "#98FB98",
    accentColor: "#8A2BE2",
    name: "mid-violet",
    type: "mid",
  },
  {
    baseColor: "#000000",
    accentColor: "#FF00FF",
    name: "mid-magenta",
    type: "mid",
  },
  {
    baseColor: "#000000",
    accentColor: "#808080",
    name: "mid-gray",
    type: "mid",
  },

  // Dark themes
  {
    baseColor: "#E6E6FA",
    accentColor: "#8B0000",
    name: "dark-red",
    type: "dark",
  },
  {
    baseColor: "#E6E6FA",
    accentColor: "#8B4513",
    name: "dark-brown",
    type: "dark",
  },
  {
    baseColor: "#FFFFFF",
    accentColor: "#8B4513",
    name: "dark-orange",
    type: "dark",
  },
  {
    baseColor: "#FFFFFF",
    accentColor: "#000000",
    name: "dark-yellow",
    type: "dark",
  },
  {
    baseColor: "#FFB6C1",
    accentColor: "#006400",
    name: "dark-green",
    type: "dark",
  },
  {
    baseColor: "#FFE4B5",
    accentColor: "#008080",
    name: "dark-cyan",
    type: "dark",
  },
  {
    baseColor: "#FFFF00",
    accentColor: "#000080",
    name: "dark-blue",
    type: "dark",
  },
  {
    baseColor: "#98FB98",
    accentColor: "#4B0082",
    name: "dark-violet",
    type: "dark",
  },
  {
    baseColor: "#98FB98",
    accentColor: "#8B008B",
    name: "dark-magenta",
    type: "dark",
  },
  {
    baseColor: "#FFFFFF",
    accentColor: "#000000",
    name: "dark-gray",
    type: "dark",
  },
];

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
