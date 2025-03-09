"use client";

import React, { useEffect } from 'react';
import { useTheme } from './theme-provider';

const DynamicFavicon: React.FC = () => {
  const theme = useTheme();

  useEffect(() => {
    // Generate SVG for Flower of Life
    const generateFlowerOfLifeSVG = () => {
      const size = 64;
      const radius = size / 4;
      const circles = [];
      
      // Center circle
      const centerX = size / 2;
      const centerY = size / 2;
      
      // Add center circle
      circles.push(`<circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="none" stroke="${theme.accentColor}" stroke-width="1.5" />`);
      
      // First ring of 6 circles
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        circles.push(`<circle cx="${x}" cy="${y}" r="${radius}" fill="none" stroke="${theme.accentColor}" stroke-width="1.5" />`);
      }
      
      // Second ring of 12 circles for complete flower of life
      // for (let i = 0; i < 6; i++) {
      //   const angle = (Math.PI / 3) * i;
      //   const x = centerX + radius * 2 * Math.cos(angle);
      //   const y = centerY + radius * 2 * Math.sin(angle);
      //   circles.push(`<circle cx="${x}" cy="${y}" r="${radius}" fill="none" stroke="${theme.accentColor}" stroke-width="1.5" />`);
        
      //   // Add intermediate circles
      //   const nextAngle = (Math.PI / 3) * ((i + 1) % 6);
      //   const midX = centerX + radius * Math.cos(angle + Math.PI / 6);
      //   const midY = centerY + radius * Math.sin(angle + Math.PI / 6);
      //   circles.push(`<circle cx="${midX}" cy="${midY}" r="${radius}" fill="none" stroke="${theme.accentColor}" stroke-width="1.5" />`);
      // }
      
      const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
          <rect width="${size}" height="${size}" fill="${theme.baseColor}" />
          ${circles.join('')}
        </svg>
      `;
      
      return svgContent;
    };

    const svgContent = generateFlowerOfLifeSVG();
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    
    // Set the favicon
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.setAttribute('rel', 'shortcut icon');
    link.setAttribute('href', url);
    document.getElementsByTagName('head')[0].appendChild(link);
    
    // Clean up the URL object when component unmounts
    return () => URL.revokeObjectURL(url);
  }, [theme.accentColor, theme.baseColor]); // Re-run when theme colors change

  return null; // This component doesn't render anything
};

export default DynamicFavicon;