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
      icon: 28,
      text: 'text-lg',
    },
    md: {
      icon: 36,
      text: 'text-xl',
    },
    lg: {
      icon: 48,
      text: 'text-2xl',
    },
    xl: {
      icon: 64,
      text: 'text-3xl',
    },
  }[size];

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2.5
        select-none
        ${className}
      `}
    >
      {/* Millerz Emblem */}
      <div
        style={{
          width: dimensions.icon,
          height: dimensions.icon,
        }}
        className="
          relative
          shrink-0
          rounded-xl
          overflow-hidden
          bg-gradient-to-br
          from-[#C85223]
          via-[#D85B28]
          to-[#8E391A]
          shadow-lg
          shadow-[#C85223]/20
          transition-all
          duration-300
          group-hover:shadow-[#C85223]/30
        "
      >
        {/* Geometric M */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-[72%] h-[72%]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M18 72V28L36 45L50 25L64 45L82 28V72"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M36 45L50 62L64 45"
              stroke="#F6D5C5"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* subtle highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/20 pointer-events-none" />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`
              ${dimensions.text}
              font-black
              tracking-tight
              text-white
            `}
          >
            MILLERZ
          </span>

          <span
            className="
              mt-1
              text-[8px]
              sm:text-[9px]
              font-semibold
              tracking-[0.22em]
              text-[#C29845]
              uppercase
            "
          >
            Technologies
          </span>
        </div>
      )}
    </div>
  );
};

export default MillerzLogo;
