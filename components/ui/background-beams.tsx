'use client';

import { useEffect, useRef } from 'react';

export function BackgroundBeams({ className = '' }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Beams animate via CSS
  }, []);

  const paths = [
    'M-50 0 Q250 150 600 100 T1200 200',
    'M-100 50 Q200 250 500 200 T1100 100',
    'M0 -50 Q300 200 650 150 T1300 250',
    'M-80 100 Q350 50 700 200 T1250 50',
    'M50 -30 Q400 300 750 100 T1400 300',
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="beam-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C8982E" stopOpacity="0" />
            <stop offset="50%" stopColor="#C8982E" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#C8982E" stopOpacity="0" />
          </linearGradient>
          <filter id="beam-glow">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        {paths.map((d, i) => (
          <g key={i}>
            <path
              d={d}
              stroke="url(#beam-grad)"
              strokeWidth="1.5"
              opacity={0.3 - i * 0.04}
            >
              <animate
                attributeName="d"
                values={`${d};${d.replace(/Q(\d+)/g, (_, n) => `Q${parseInt(n) + 30 * (i % 2 === 0 ? 1 : -1)}`)};${d}`}
                dur={`${8 + i * 2}s`}
                repeatCount="indefinite"
              />
            </path>
            <path
              d={d}
              stroke="#C8982E"
              strokeWidth="3"
              filter="url(#beam-glow)"
              opacity={0.06 - i * 0.008}
            >
              <animate
                attributeName="d"
                values={`${d};${d.replace(/Q(\d+)/g, (_, n) => `Q${parseInt(n) + 30 * (i % 2 === 0 ? 1 : -1)}`)};${d}`}
                dur={`${8 + i * 2}s`}
                repeatCount="indefinite"
              />
            </path>
          </g>
        ))}
      </svg>
    </div>
  );
}
