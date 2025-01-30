"use client";
import React from "react";
import { useTheme } from "../components/theme-provider";
import { twMerge } from "tailwind-merge";
import AnimatedImage from "./animations/animated-image";
import pfp from "../app/images/jai.png";

export const Content: React.FC = () => {
  const theme = useTheme();

  const navItems = [
    { name: "Blog", url: "https://blog.jai.place/" },
    { name: "Projects", url: "/projects" },
    { name: "About", url: "/about" },
    {
      name: "Resume",
      url: "https://firebasestorage.googleapis.com/v0/b/personal-website-f0071.appspot.com/o/Dhananjai%20Resume.pdf?alt=media&token=d0e1625e-4780-40ef-9081-9209c7adc270",
    },
  ];

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/Djai284" },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/dhananjai-senthilkumar/",
    },
    { name: "Twitter", url: "https://x.com/Djai284" },
  ];

  const getContainerStyle = () => {
    switch (theme.type) {
      case "light":
        return "bg-white bg-opacity-70 text-gray-800";
      case "dark":
        return "bg-gray-900 bg-opacity-70 text-white";
      default: // 'mid'
        return "bg-gray-700 bg-opacity-70 text-white";
    }
  };

  const getTextColor = () => {
    return theme.type === "light" ? "text-gray-800" : "text-white";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 pointer-events-none">
      <div
        className={twMerge(
          "p-8 rounded-lg shadow-lg max-w-4xl w-full pointer-events-auto",
          getContainerStyle()
        )}
      >
        <div className="flex flex-col md:flex-row items-center justify-center mb-8">
          <div className="md:w-1/3 mb-6 md:mb-0">
            <AnimatedImage src={pfp} alt="Jai" width={192} height={192} />
            <div className="flex justify-center space-x-4 mt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="text-sm hover:underline transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="md:w-2/3 md:pl-8">
            <h1
              className={twMerge(
                "text-4xl md:text-5xl font-serif mb-4",
                getTextColor()
              )}
            >
              <span>hey, i&apos;m jai</span>
              <span style={{ color: theme.accentColor }}> 👋</span>
            </h1>
            <p
              className={twMerge(
                "text-lg md:text-xl font-serif mb-6 max-w-2xl mx-auto",
                getTextColor()
              )}
            >
              i&apos;m a passionate builder who dabbles in many things. welcome
              to my corner of the internet!
            </p>
            <nav>
              <ul className="flex flex-wrap justify-center space-x-4 font-sans text-lg">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.url}
                      className="transition-colors duration-300 border-b-2 border-transparent hover:border-current px-2 py-1"
                      target={item.url.startsWith("http") ? "_blank" : undefined}
                      rel={
                        item.url.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};