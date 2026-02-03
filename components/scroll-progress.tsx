'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const percent = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
      setProgress(percent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 h-1 bg-linear-to-r from-primary via-secondary to-accent z-50" style={{ width: `${progress}%` }} />

      {/* Bottom accent bar */}
      <div
        className="fixed bottom-0 left-0 h-0.5 bg-linear-to-r from-accent via-primary to-secondary z-40"
        style={{ width: `${100 - progress}%`, marginLeft: 'auto' }}
      />
    </>
  );
}
