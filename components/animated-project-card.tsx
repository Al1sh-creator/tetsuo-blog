'use client';

import React from "react"

import { useRef, useState } from 'react';

interface AnimatedProjectCardProps {
  name: string;
  description: string;
  index: number;
  isVisible: boolean;
}

export function AnimatedProjectCard({
  name,
  description,
  index,
  isVisible,
}: AnimatedProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-500 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-12 opacity-0'
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Animated gradient spotlight */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-sm overflow-hidden"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 65, 0.15), transparent 80%)`,
          }}
        />
      )}

      {/* Animated border with glow */}
      <div
        className={`absolute inset-0 rounded-sm transition-all duration-300 pointer-events-none ${
          isHovered
            ? 'shadow-lg shadow-primary/40 border-2 border-primary'
            : 'border-2 border-border'
        }`}
      />

      <div className="relative p-8 bg-card/40 backdrop-blur-sm h-full flex flex-col">
        {/* Animated tech stack indicator */}
        <div
          className={`inline-flex items-center gap-2 mb-4 transition-all duration-300 ${
            isHovered ? 'text-accent' : 'text-muted-foreground'
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              isHovered ? 'bg-accent animate-pulse' : 'bg-border'
            }`}
          />
          <span className="text-xs font-bold tracking-widest">SYSTEM ACTIVE</span>
        </div>

        {/* Project name with scale animation */}
        <h3
          className={`text-2xl font-black mb-3 transition-all duration-300 ${
            isHovered ? 'text-primary scale-105' : 'text-foreground'
          }`}
          style={{
            transformOrigin: '0',
          }}
        >
          {name}
        </h3>

        {/* Animated divider */}
        <div
          className={`h-1 bg-linear-to-r from-secondary to-accent mb-4 transition-all duration-500 ${
            isHovered ? 'w-full' : 'w-8'
          }`}
        />

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-6 grow leading-relaxed">
          {description}
        </p>

        {/* Animated action button */}
        <button
          className={`w-full py-3 font-bold text-sm tracking-widest transition-all duration-300 border-2 relative overflow-hidden group ${
            isHovered
              ? 'border-primary text-primary bg-primary/10'
              : 'border-muted text-muted-foreground'
          }`}
        >
          <span className="relative z-10">ENGAGE SYSTEM</span>
          <div
            className={`absolute inset-0 bg-primary/20 transform transition-transform duration-300 ${
              isHovered ? 'scale-x-100' : 'scale-x-0'
            }`}
            style={{ transformOrigin: '0' }}
          />
        </button>
      </div>
    </div>
  );
}
