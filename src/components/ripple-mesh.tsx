"use client";
import React, { useEffect, useRef, useCallback } from "react";
import { useTheme } from "./theme-provider";

interface Node {
  x: number;
  y: number;
  baseY: number;
  velocity: number;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

interface MeshRippleEffectProps {
  children?: React.ReactNode;
}

const MeshRippleEffect: React.FC<MeshRippleEffectProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const theme = useTheme();

  const ROWS = 70;
  const COLS = 70;
  const NODE_RADIUS = 10;
  const DAMPING = 0.98;
  const SPREAD = 0.3;
  const STIFFNESS = 0.3;

  class NodeImpl implements Node {
    baseY: number;
    velocity: number;

    constructor(public x: number, public y: number) {
      this.baseY = y;
      this.velocity = 0;
    }

    update() {
      const displacement = this.y - this.baseY;
      const acceleration = -STIFFNESS * displacement;

      this.velocity += acceleration;
      this.velocity *= DAMPING;
      this.y += this.velocity;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, NODE_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = theme.baseColor + "80"; // Use baseColor with 50% opacity
      ctx.fill();
    }
  }

  const initializeNodes = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    nodesRef.current = [];
    const spacing = {
      x: canvas.width / (COLS - 1),
      y: canvas.height / (ROWS - 1),
    };

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        nodesRef.current.push(new NodeImpl(j * spacing.x, i * spacing.y));
      }
    }
  }, []);

  const propagateWave = useCallback(() => {
    const nodes = nodesRef.current;
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        const index = i * COLS + j;
        const node = nodes[index];

        if (i > 0) node.velocity += (nodes[index - COLS].y - node.y) * SPREAD;
        if (i < ROWS - 1)
          node.velocity += (nodes[index + COLS].y - node.y) * SPREAD;
        if (j > 0) node.velocity += (nodes[index - 1].y - node.y) * SPREAD;
        if (j < COLS - 1)
          node.velocity += (nodes[index + 1].y - node.y) * SPREAD;
      }
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    propagateWave();

    const nodes = nodesRef.current;
    for (let node of nodes) {
      node.update();
      node.draw(ctx);
    }

    for (let i = 0; i < ROWS; i++) {
      ctx.beginPath();
      for (let j = 0; j < COLS; j++) {
        const index = i * COLS + j;
        if (j === 0) {
          ctx.moveTo(nodes[index].x, nodes[index].y);
        } else {
          ctx.lineTo(nodes[index].x, nodes[index].y);
        }
      }
      ctx.strokeStyle = theme.baseColor + "33"; // Use baseColor with 20% opacity
      ctx.stroke();
    }

    for (let j = 0; j < COLS; j++) {
      ctx.beginPath();
      for (let i = 0; i < ROWS; i++) {
        const index = i * COLS + j;
        if (i === 0) {
          ctx.moveTo(nodes[index].x, nodes[index].y);
        } else {
          ctx.lineTo(nodes[index].x, nodes[index].y);
        }
      }
      ctx.strokeStyle = theme.baseColor + "33"; // Use baseColor with 20% opacity
      ctx.stroke();
    }

    requestAnimationFrame(animate);
  }, [propagateWave, theme.baseColor]);

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const nodes = nodesRef.current;
    const maxDistance = Math.max(canvas.width, canvas.height) / 8;

    for (let node of nodes) {
      const dx = node.x - x;
      const dy = node.baseY - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        const force = 1 - distance / maxDistance;
        node.velocity -= force * 50;
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
        backgroundColor: theme.accentColor, // Use accentColor for background
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
          color: theme.baseColor, // Use baseColor for text
          textAlign: "center",
          padding: "20px",
          boxSizing: "border-box",
          pointerEvents: "none",
          background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2))`, // Add a subtle overlay for better readability
        }}
      >
        <div style={{ pointerEvents: "auto" }}>{children}</div>
      </div>
    </div>
  );
};

export default MeshRippleEffect;
