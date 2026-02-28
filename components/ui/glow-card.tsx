'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export function GlowCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      className={`relative overflow-hidden rounded-xl bg-[#161F2F] border border-[#C8982E]/20 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px"
        style={{
          background: `radial-gradient(250px circle at ${position.x}px ${position.y}px, rgba(200,152,46,0.15), transparent 40%)`,
        }}
        animate={{ opacity }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
