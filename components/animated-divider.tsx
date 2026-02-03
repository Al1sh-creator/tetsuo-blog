'use client';

export function AnimatedDivider() {
  return (
    <div className="relative h-32 flex items-center justify-center overflow-hidden">
      {/* Animated horizontal line */}
      <div className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />
      
      {/* Animated vertical pulse */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-accent"
              style={{
                animation: `pulse 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        
        {/* Animated text */}
        <div className="text-xs font-bold tracking-widest text-muted-foreground animate-pulse">
          ▼ ▼ ▼
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
