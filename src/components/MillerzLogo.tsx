import React from 'react';

interface MillerzLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const MillerzLogo: React.FC<MillerzLogoProps> = ({
  className = '',
  size = 'md',
  showText = true
}) => {
  const dimensions = {
    sm: { height: 28, width: showText ? 140 : 28, textClass: 'text-xs' },
    md: { height: 36, width: showText ? 180 : 36, textClass: 'text-sm' },
    lg: { height: 48, width: showText ? 240 : 48, textClass: 'text-lg' },
    xl: { height: 64, width: showText ? 320 : 64, textClass: 'text-2xl' }
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 transition-transform hover:scale-[1.01] ${className}`}>
      {/* Millerz Geometric Isometric M Emblem */}
      <svg
        width={dimensions.height}
        height={dimensions.height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-md"
      >
        {/* Forest Green Top Chevron V-block */}
        <path
          d="M 50 12 L 80 28 L 50 44 L 20 28 Z"
          fill="#2B4C33"
        />
        <path
          d="M 20 28 L 50 44 L 50 54 L 20 38 Z"
          fill="#1C3322"
        />
        <path
          d="M 80 28 L 50 44 L 50 54 L 80 38 Z"
          fill="#376142"
        />

        {/* Burnt Copper Orange Central Folded 'M' */}
        <path
          d="M 32 38 L 50 48 L 50 88 L 32 76 Z"
          fill="#C85223"
        />
        <path
          d="M 68 38 L 50 48 L 50 88 L 68 76 Z"
          fill="#E06332"
        />
        <path
          d="M 50 48 L 32 38 L 32 48 L 50 58 Z"
          fill="#A83E17"
        />

        {/* Warm Gold / Mustard Outer Isometric Flanks */}
        <path
          d="M 12 44 L 26 52 L 26 80 L 12 72 Z"
          fill="#A88238"
        />
        <path
          d="M 88 44 L 74 52 L 74 80 L 88 72 Z"
          fill="#C29845"
        />
        <path
          d="M 26 52 L 32 55 L 32 76 L 26 73 Z"
          fill="#8A6A2C"
        />
        <path
          d="M 74 52 L 68 55 L 68 76 L 74 73 Z"
          fill="#8A6A2C"
        />
      </svg>

      {/* Brand Name & Subtitle */}
      {showText && (
        <div className="flex flex-col justify-center border-l border-emerald-900/80 pl-3">
          <span className={`font-mono font-black tracking-wider text-white uppercase leading-none ${dimensions.textClass}`}>
            MILLERZ
          </span>
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#C29845] font-semibold uppercase mt-0.5">
            TECHNOLOGIES
          </span>
        </div>
      )}
    </div>
  );
};
