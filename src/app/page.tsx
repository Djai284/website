"use client";
import React from "react";
import { ThemeProvider } from "../components/theme-provider";
import FloatingNetworkBackground from "@/components/floating-network";
import { Content } from "@/components/landing";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <FloatingNetworkBackground nodeCount={50} connectionDistance={150} maxNodes={100}>
        <Content />
      </FloatingNetworkBackground>
    </ThemeProvider>
  );
};

export default App;