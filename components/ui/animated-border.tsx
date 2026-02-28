'use client';

import { motion } from 'framer-motion';

export function AnimatedBorder({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative rounded-xl p-[1px] overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          background: 'conic-gradient(from 0deg, transparent, #C8982E, transparent, transparent)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative bg-[#161F2F] rounded-xl h-full">
        {children}
      </div>
    </div>
  );
}
