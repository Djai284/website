import React from "react";
import FloatingNetworkBackground from "@/components/floating-network";
import { Content } from "@/components/landing";

const App: React.FC = () => {
  return (
    <FloatingNetworkBackground nodeCount={30} connectionDistance={150} maxNodes={70}>
      <Content />
    </FloatingNetworkBackground>
  );
};

export default App;