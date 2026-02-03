'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  trail: { x: number; y: number }[];
  angle: number;
  rotationSpeed: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface LightBeam {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  angle: number;
  speed: number;
}

export function VideoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;
    const particles: Particle[] = [];
    const lightBeams: LightBeam[] = [];
    const nodes: Node[] = [];
    const gridSize = 200;

    // Create grid nodes
    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        nodes.push({
          x,
          y,
          vx: 0,
          vy: 0,
        });
      }
    }

    // Create light beams for dramatic effect
    for (let i = 0; i < 3; i++) {
      lightBeams.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: Math.random() * 100 + 50,
        height: canvas.height,
        opacity: Math.random() * 0.15 + 0.05,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.002 + 0.001,
      });
    }

    const colors = [
      { r: 0, g: 255, b: 65 },    // green
      { r: 0, g: 212, b: 255 },   // cyan
      { r: 255, g: 0, b: 128 },   // magenta
      { r: 255, g: 200, b: 0 },   // gold
    ];

    const createParticle = () => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 1,
        maxLife: Math.random() * 120 + 80,
        color: `rgba(${color.r}, ${color.g}, ${color.b}, `,
        size: Math.random() * 4 + 1.5,
        trail: [],
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
      });
    };

    const drawLine = (x1: number, y1: number, x2: number, y2: number, alpha: number) => {
      ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const drawLightBeams = () => {
      lightBeams.forEach((beam) => {
        beam.angle += beam.speed;
        const x = canvas.width / 2 + Math.cos(beam.angle) * 300;
        const rotation = beam.angle;

        ctx.save();
        ctx.globalAlpha = beam.opacity;
        ctx.translate(x, 0);
        ctx.rotate(rotation);

        const gradient = ctx.createLinearGradient(0, 0, beam.width, 0);
        gradient.addColorStop(0, 'rgba(0, 212, 255, 0)');
        gradient.addColorStop(0.5, 'rgba(255, 0, 128, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, -canvas.height / 2, beam.width, canvas.height * 2);
        ctx.restore();
      });
    };

    const drawVortex = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = 100 + Math.sin(time * 0.01) * 50;

      ctx.globalAlpha = 0.08;
      for (let i = 0; i < 10; i++) {
        const radius = baseRadius + i * 30;
        const opacity = (1 - i / 10) * 0.15;
        ctx.strokeStyle = `rgba(0, 255, 65, ${opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const drawAnimatedGrid = () => {
      const offsetX = (time * 0.3) % gridSize;
      const offsetY = (time * 0.2) % gridSize;

      ctx.strokeStyle = 'rgba(0, 212, 255, 0.08)';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = -offsetX; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = -offsetY; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawPulsingNodes = () => {
      nodes.forEach((node) => {
        const pulse = Math.sin(time * 0.05 + node.x * 0.005 + node.y * 0.005) * 0.5 + 0.5;
        const size = 1 + pulse * 1.5;
        const opacity = 0.3 + pulse * 0.3;

        ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes
        nodes.forEach((otherNode) => {
          const dist = Math.hypot(otherNode.x - node.x, otherNode.y - node.y);
          if (dist < gridSize * 1.5 && dist > 0) {
            const opacity = (1 - dist / (gridSize * 1.5)) * 0.15;
            drawLine(node.x, node.y, otherNode.x, otherNode.y, opacity);
          }
        });
      });
    };

    const drawWavyLines = () => {
      // Multiple wave layers
      for (let layer = 0; layer < 3; layer++) {
        ctx.strokeStyle = `rgba(${layer === 0 ? '0, 255, 65' : layer === 1 ? '0, 212, 255' : '255, 0, 128'}, ${0.06 - layer * 0.01})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();

        for (let x = 0; x < canvas.width; x += 5) {
          const y =
            canvas.height / 2 +
            Math.sin((x * 0.008 + time * (0.008 + layer * 0.002)) * Math.PI) * 80 +
            Math.cos((x * 0.004 + time * (0.005 - layer * 0.001)) * Math.PI) * 60;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    const animate = () => {
      // Rich cinematic dark background with dramatic gradients
      const centerGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height * 0.4,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.hypot(canvas.width, canvas.height) * 1.2
      );
      centerGradient.addColorStop(0, 'rgba(40, 20, 60, 0.6)');
      centerGradient.addColorStop(0.3, 'rgba(15, 15, 35, 0.85)');
      centerGradient.addColorStop(1, 'rgba(5, 5, 15, 1)');

      ctx.fillStyle = centerGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add dark overlay
      ctx.fillStyle = 'rgba(5, 5, 10, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw dramatic light beams
      drawLightBeams();

      // Draw central vortex
      drawVortex();

      // Draw animated background effects
      drawAnimatedGrid();
      drawWavyLines();
      drawPulsingNodes();

      // Create particles more frequently for dramatic effect
      if (Math.random() < 0.5) {
        createParticle();
      }

      // Update and draw particles with trails
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1 / p.maxLife;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Add to trail
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 15) p.trail.shift();

        // Draw particle trail
        for (let j = 0; j < p.trail.length; j++) {
          const opacity = (j / p.trail.length) * Math.sin(p.life * Math.PI) * 0.6;
          ctx.fillStyle = `${p.color}${opacity})`;
          const trailSize = (p.size * j) / p.trail.length;
          ctx.beginPath();
          ctx.arc(p.trail[j].x, p.trail[j].y, trailSize, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw rotating particle with more visual impact
        const opacity = Math.sin(p.life * Math.PI) * 0.8;
        p.angle += p.rotationSpeed;

        // Draw particle core
        ctx.fillStyle = `${p.color}${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Add strong glow effect
        ctx.fillStyle = `${p.color}${opacity * 0.6})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Add outer aura
        ctx.fillStyle = `${p.color}${opacity * 0.2})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle scan line effect
      for (let i = 0; i < canvas.height; i += 3) {
        ctx.strokeStyle = `rgba(0, 255, 65, 0.02)`;
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      time++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
    />
  );
}
