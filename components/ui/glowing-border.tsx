'use client';

import { motion } from 'framer-motion';

export function GlowingBorder({
  children,
  className = '',
  color = '#C8982E',
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <div className={`relative rounded-2xl p-[1.5px] overflow-hidden ${className}`}>
      {/* Rotating gradient border */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, ${color} 10%, transparent 20%, transparent 50%, ${color} 60%, transparent 70%, transparent 100%)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
      {/* Glow behind */}
      <motion.div
        className="absolute inset-0 blur-md opacity-40"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, ${color} 10%, transparent 20%, transparent 50%, ${color} 60%, transparent 70%, transparent 100%)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative bg-[#161F2F] rounded-2xl h-full z-10">
        {children}
      </div>
    </div>
  );
}
