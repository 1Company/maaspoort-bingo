'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface DockItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export function FloatingDock({
  items,
  className = '',
}: {
  items: DockItem[];
  className?: string;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5, type: 'spring', stiffness: 200 }}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-end gap-2 bg-[#161F2F]/80 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-2xl ${className}`}
    >
      {items.map((item, i) => {
        const isHovered = hoveredIdx === i;
        const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - i) === 1;
        const size = isHovered ? 56 : isNeighbor ? 48 : 40;

        return (
          <motion.a
            key={item.label}
            href={item.href}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            animate={{ width: size, height: size }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex items-center justify-center rounded-xl bg-white/10 hover:bg-[#C8982E]/30 transition-colors relative group"
          >
            <span className="text-sm">{item.icon || item.label.charAt(0)}</span>
            <span className="absolute -top-8 px-2 py-1 bg-[#161F2F] border border-white/10 rounded-md text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {item.label}
            </span>
          </motion.a>
        );
      })}
    </motion.div>
  );
}
