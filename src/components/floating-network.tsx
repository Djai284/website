"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { useTheme } from "./theme-provider";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isNew: boolean;
}

interface FloatingNetworkBackgroundProps {
  children?: React.ReactNode;
  nodeCount?: number;
  connectionDistance?: number;
  maxNodes?: number;
}

const FloatingNetworkBackground: React.FC<FloatingNetworkBackgroundProps> = ({
  children,
  nodeCount = 30,
  connectionDistance = 150,
  maxNodes = 50,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const [nodeCountState, setNodeCountState] = useState(nodeCount);
  const theme = useTheme();

  const createNode = useCallback(
    (x: number, y: number, isNew = false): Node => ({
      x,
      y,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 2,
      isNew,
    }),
    []
  );

  const initNodes = useCallback(
    (width: number, height: number) => {
      nodesRef.current = [];
      for (let i = 0; i < nodeCountState; i++) {
        nodesRef.current.push(createNode(Math.random() * width, Math.random() * height));
      }
    },
    [nodeCountState, createNode]
  );

  const handleCanvasClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;

      if (nodesRef.current.length < maxNodes) {
        nodesRef.current.push(createNode(x, y, true));
        setNodeCountState((prev) => prev + 1);
      } else {
        // Replace oldest node
        nodesRef.current.shift();
        nodesRef.current.push(createNode(x, y, true));
      }
    },
    [createNode, maxNodes]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // no canvas yet

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // no 2D context

    function resizeCanvas() {
      if (!canvas) return;

      const oldWidth = canvas.width;
      const oldHeight = canvas.height;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // If this is first load or we want to scale nodes
      if (nodesRef.current.length === 0) {
        initNodes(canvas.width, canvas.height);
      } else {
        const widthRatio = canvas.width / oldWidth;
        const heightRatio = canvas.height / oldHeight;

        nodesRef.current = nodesRef.current.map((node) => ({
          ...node,
          x: node.x * widthRatio,
          y: node.y * heightRatio,
        }));
      }
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function animate() {
      // again, check for canvas & context
      if (!canvas) return;
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // update & draw nodes
      nodesRef.current.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

        if (node.isNew) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = theme.accentColor;
          ctx.fillStyle = "white";
          node.isNew = false;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = theme.accentColor;
        }
        ctx.fill();

        // draw connections
        nodesRef.current.slice(i + 1).forEach((otherNode) => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            const opacity = 1 - dist / connectionDistance;
            // alpha channel in hex
            const alpha = Math.floor(opacity * 255).toString(16).padStart(2, "0");
            ctx.strokeStyle = `${theme.accentColor}${alpha}`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [connectionDistance, initNodes, theme.accentColor]);

  return (
    <div style={{ position: "relative" }}>
      {/* Fixed background layer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          cursor: "pointer",
          zIndex: 0,
        }}
        onClick={handleCanvasClick}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {/* Normal page content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default FloatingNetworkBackground;
