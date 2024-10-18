"use client";
import React from "react";
import { ThemeProvider } from "../components/theme-provider";
import FloatingNetworkBackground from "@/components/floating-network";
import { Content } from "@/components/landing";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <FloatingNetworkBackground nodeCount={30} connectionDistance={150} maxNodes={70}>
        <Content />
      </FloatingNetworkBackground>
    </ThemeProvider>
  );
};

export default App;