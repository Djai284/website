"use client";
import React, { useEffect, useRef, useCallback } from "react";
import { useTheme } from "./theme-provider";

interface Node {
  x: number;
  y: number;
  displacement: number;
  velocity: number;
  update: () => void;
}

interface RippleEffectProps {
  children?: React.ReactNode;
}

const RippleEffect: React.FC<RippleEffectProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const spacingRef = useRef({ x: 0, y: 0 });
  const theme = useTheme();

  const ROWS = 100;
  const COLS = 100;
  const DAMPING = 0.95;
  const SPREAD = 0.3;

  class NodeImpl implements Node {
    displacement: number;
    velocity: number;

    constructor(public x: number, public y: number) {
      this.displacement = 0;
      this.velocity = 0;
    }

    update() {
      this.velocity += -0.2 * this.displacement;
      this.velocity *= DAMPING;
      this.displacement += this.velocity;

      if (Math.abs(this.displacement) < 0.001) {
        this.displacement = 0;
        this.velocity = 0;
      }
    }
  }

  const initializeNodes = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    nodesRef.current = [];
    spacingRef.current = {
      x: canvas.width / (COLS - 1),
      y: canvas.height / (ROWS - 1),
    };

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        nodesRef.current.push(
          new NodeImpl(j * spacingRef.current.x, i * spacingRef.current.y)
        );
      }
    }
  }, []);

  const propagateWave = useCallback(() => {
    const nodes = nodesRef.current;
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        const index = i * COLS + j;
        const node = nodes[index];

        if (i > 0)
          node.velocity +=
            (nodes[index - COLS].displacement - node.displacement) * SPREAD;
        if (i < ROWS - 1)
          node.velocity +=
            (nodes[index + COLS].displacement - node.displacement) * SPREAD;
        if (j > 0)
          node.velocity +=
            (nodes[index - 1].displacement - node.displacement) * SPREAD;
        if (j < COLS - 1)
          node.velocity +=
            (nodes[index + 1].displacement - node.displacement) * SPREAD;
      }
    }
  }, []);

  const drawRipples = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    const nodes = nodesRef.current;
    const spacing = spacingRef.current;

    for (let i = 0; i < ROWS - 1; i++) {
      for (let j = 0; j < COLS - 1; j++) {
        const index = i * COLS + j;
        const avgDisplacement =
          (nodes[index].displacement +
            nodes[index + 1].displacement +
            nodes[index + COLS].displacement +
            nodes[index + COLS + 1].displacement) /
          4;

        const intensity = Math.floor(128 + avgDisplacement * 128);
        const x = Math.floor(j * spacing.x);
        const y = Math.floor(i * spacing.y);

        for (let py = y; py < y + spacing.y; py++) {
          for (let px = x; px < x + spacing.x; px++) {
            const dataIndex = (py * canvas.width + px) * 4;
            data[dataIndex] = intensity;
            data[dataIndex + 1] = intensity;
            data[dataIndex + 2] = intensity;
            data[dataIndex + 3] = 32;
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.fillStyle = theme.baseColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    propagateWave();

    for (let i = 0; i < nodesRef.current.length; i++) {
      nodesRef.current[i].update();
    }

    drawRipples();

    requestAnimationFrame(animate);
  }, [propagateWave, drawRipples, theme.baseColor]);

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const maxDistance = Math.min(canvas.width, canvas.height) / 8;

    for (const node of nodesRef.current) {
      const dx = node.x - x;
      const dy = node.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        const force = Math.cos(((distance / maxDistance) * Math.PI) / 2) * 2;
        node.displacement = force;
      }
    }
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeNodes();
  }, [initializeNodes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeNodes();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [initializeNodes, animate, handleResize]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: theme.baseColor,
      }}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: theme.accentColor,
          textAlign: "center",
          padding: "20px",
          boxSizing: "border-box",
          pointerEvents: "none",
        }}
      >
        <div style={{ pointerEvents: "auto" }}>{children}</div>
      </div>
    </div>
  );
};

export default RippleEffect;
