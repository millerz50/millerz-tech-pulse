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
      width: showText ? 130 : 28,
    },
    md: {
      height: 32,
      width: showText ? 148 : 32,
    },
    lg: {
      height: 40,
      width: showText ? 185 : 40,
    },
    xl: {
      height: 48,
      width: showText ? 220 : 48,
    },
  }[size];

  return (
    <div
      className={`inline-flex items-center shrink-0 ${className}`}
      style={{
        width: dimensions.width,
        height: dimensions.height,
      }}
    >
      <img
        src="/logo.png"
        alt="Millerz Technologies"
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full object-contain object-left"
        draggable={false}
      />
    </div>
  );
};
