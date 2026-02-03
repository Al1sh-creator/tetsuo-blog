'use client';

import { useRef, useState } from 'react';

interface AnimatedPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  index: number;
  isVisible: boolean;
}

export function AnimatedPostCard({
  title,
  excerpt,
  date,
  category,
  readTime,
  index,
  isVisible,
}: AnimatedPostCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-500 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-12 opacity-0'
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background glow */}
      <div
        className={`absolute inset-0 bg-linear-to-r from-secondary to-accent rounded-sm transition-opacity duration-300 ${
          isHovered ? 'opacity-20' : 'opacity-0'
        }`}
      />

      {/* Animated border */}
      <div
        className={`absolute inset-0 border-2 rounded-sm transition-all duration-300 ${
          isHovered
            ? 'border-primary shadow-lg shadow-primary/50'
            : 'border-border'
        }`}
      />

      <div className="relative p-6 bg-card/50 backdrop-blur-sm">
        {/* Category badge with animation */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`text-xs font-black tracking-widest px-3 py-1 border transition-all duration-300 ${
              isHovered
                ? 'border-secondary text-secondary bg-secondary/10'
                : 'border-accent text-accent'
            }`}
          >
            {category}
          </span>
          <span className="text-xs text-muted-foreground">{readTime}</span>
        </div>

        {/* Title with glitch effect on hover */}
        <h3
          className={`text-xl font-bold mb-3 transition-all duration-300 ${
            isHovered ? 'text-primary' : 'text-foreground'
          }`}
        >
          {title}
        </h3>

        {/* Animated underline */}
        <div
          className={`h-0.5 bg-linear-to-r from-primary to-transparent mb-4 transition-all duration-300 ${
            isHovered ? 'w-full' : 'w-0'
          }`}
        />

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground mb-6 line-clamp-3">{excerpt}</p>

        {/* Read more with arrow animation */}
        <div className="flex items-center gap-2 text-sm font-bold text-secondary group-hover:text-primary transition-colors duration-300">
          <span>ENTER ARCHIVE</span>
          <span
            className={`transition-all duration-300 ${
              isHovered ? 'translate-x-2' : 'translate-x-0'
            }`}
          >
            →
          </span>
        </div>

        {/* Date at bottom */}
        <div className="mt-6 pt-4 border-t border-border/30 text-xs text-muted-foreground">
          {date}
        </div>
      </div>
    </div>
  );
}
