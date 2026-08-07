import React from 'react';

interface MillerzLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const MillerzLogo: React.FC<MillerzLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const dimensions = {
    sm: {
      height: 28,
      width: showText ? 140 : 28,
    },
    md: {
      height: 36,
      width: showText ? 180 : 36,
    },
    lg: {
      height: 48,
      width: showText ? 240 : 48,
    },
    xl: {
      height: 64,
      width: showText ? 320 : 64,
    },
  }[size];

  return (
    <div
      className={`inline-flex items-center shrink-0 transition-transform duration-200 hover:scale-[1.02] ${className}`}
    >
      <img
        src="/images/millerz-logo.png"
        alt="Millerz Technologies"
        width={dimensions.width}
        height={dimensions.height}
        className="h-auto w-auto max-w-full object-contain"
        draggable={false}
      />
    </div>
  );
};
