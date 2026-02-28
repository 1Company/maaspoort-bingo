'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export function Spotlight({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-0"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(200,152,46,0.12), transparent 40%)`,
        }}
        animate={{ opacity }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </div>
  );
}
