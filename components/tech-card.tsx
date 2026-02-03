'use client';

import { useEffect, useRef, useState } from 'react';

interface TechCardProps {
  title: string;
  description: string;
  index: number;
}

export function TechCard({ title, description, index }: TechCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePos({ x, y });

      const rotateX = (y - rect.height / 2) * 0.5;
      const rotateY = (x - rect.width / 2) * -0.5;

      card.style.setProperty('--rotate-x', `${rotateX}deg`);
      card.style.setProperty('--rotate-y', `${rotateY}deg`);
    };

    const handleMouseLeave = () => {
      card.style.setProperty('--rotate-x', '0deg');
      card.style.setProperty('--rotate-y', '0deg');
      setIsHovered(false);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', () => setIsHovered(true));

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative h-full animate-bounce-in"
      style={{
        animationDelay: `${index * 0.1}s`,
        perspective: '1000px',
      }}
    >
      <div
        className="relative p-6 bg-card/50 backdrop-blur-sm border border-border rounded-sm h-full transition-all duration-300 overflow-hidden"
        style={{
          transform: `rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Animated border glow on hover */}
        {isHovered && (
          <div className="absolute inset-0 border border-primary pointer-events-none animate-border-glow" />
        )}

        {/* Background gradient on hover */}
        <div
          className={`absolute inset-0 bg-linear-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : ''
          }`}
        />

        <div className="relative z-10">
          <div
            className={`w-10 h-10 rounded-sm mb-4 flex items-center justify-center transition-all duration-300 ${
              isHovered
                ? 'bg-primary text-background scale-110'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <span className="text-lg font-bold">&lt;&gt;</span>
          </div>

          <h3 className="text-lg font-bold mb-3 transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

          <div
            className={`mt-4 flex items-center gap-2 text-xs font-bold text-accent transition-all duration-300 ${
              isHovered ? 'translate-x-2' : ''
            }`}
          >
            EXPLORE <span>→</span>
          </div>
        </div>

        {/* Animated underline */}
        <div
          className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-primary to-accent transition-all duration-300 ${
            isHovered ? 'w-full' : 'w-0'
          }`}
        />
      </div>
    </div>
  );
}
