import React from 'react';

interface FlamingoLogoProps {
  className?: string;
  variant?: 'dark-bg' | 'light-bg';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const FlamingoLogo: React.FC<FlamingoLogoProps> = ({
  className = '',
  variant = 'dark-bg',
  showSubtitle = true,
  size = 'md'
}) => {
  const isLight = variant === 'light-bg';

  const sizeClasses = {
    sm: {
      badge: 'w-8 h-8',
      title: 'text-base sm:text-lg',
      sub: 'text-[8px] tracking-wider'
    },
    md: {
      badge: 'w-10 h-10 sm:w-11 sm:h-11',
      title: 'text-lg sm:text-xl md:text-2xl',
      sub: 'text-[9px] sm:text-[10px] tracking-wider'
    },
    lg: {
      badge: 'w-14 h-14 sm:w-16 sm:h-16',
      title: 'text-2xl sm:text-3xl md:text-4xl',
      sub: 'text-xs sm:text-sm tracking-widest'
    }
  }[size];

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Flamingo Emblem Badge */}
      <div className={`relative shrink-0 ${sizeClasses.badge} rounded-full overflow-hidden shadow-md shadow-orange-500/20`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer Radiant Red-Orange Gradient */}
            <radialGradient id="flamingoDiscGrad" cx="30%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="45%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#F59E0B" />
            </radialGradient>
            
            {/* Subtle Metallic Ring Gradient */}
            <linearGradient id="silverRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E5E7EB" />
              <stop offset="50%" stopColor="#9CA3AF" />
              <stop offset="100%" stopColor="#4B5563" />
            </linearGradient>
          </defs>

          {/* Outer Glowing Circle Disc */}
          <circle cx="50" cy="50" r="49" fill="url(#flamingoDiscGrad)" />

          {/* Inner Off-Center White Backing with Silver Ring */}
          <circle
            cx="52"
            cy="46"
            r="31"
            fill="#FFFFFF"
            stroke="url(#silverRingGrad)"
            strokeWidth="3.5"
          />

          {/* Standing Flamingo Silhouette */}
          <g transform="translate(14, 10) scale(0.72)">
            {/* Legs */}
            <path
              d="M 52 58 L 52 86 M 50 86 L 56 86"
              stroke="#EA580C"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Bent secondary leg */}
            <path
              d="M 48 58 L 42 68 L 50 70"
              stroke="#EA580C"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Flamingo Body */}
            <path
              d="M 36 50 C 33 46, 34 38, 42 36 C 50 34, 58 38, 60 46 C 61 54, 52 60, 44 59 C 38 58, 35 54, 36 50 Z"
              fill="#E11D48"
            />

            {/* Wing Feather Layer */}
            <path
              d="M 37 49 C 36 44, 40 40, 47 38 C 52 40, 54 44, 55 49 C 52 52, 44 54, 37 49 Z"
              fill="#F43F5E"
            />

            {/* Graceful S-Curved Neck */}
            <path
              d="M 54 42 C 58 38, 62 30, 60 22 C 59 16, 52 14, 50 19 C 48 23, 51 26, 55 24"
              stroke="#E11D48"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />

            {/* Head */}
            <circle cx="53" cy="18" r="4.5" fill="#E11D48" />

            {/* Beak with Gold / Amber Tip */}
            <path
              d="M 55 17 Q 61 18, 62 23 Q 57 20, 54 20 Z"
              fill="#F59E0B"
            />
            <path
              d="M 60 20 Q 62 22, 62 24 Q 59 21, 58 20 Z"
              fill="#18181B"
            />
          </g>
        </svg>
      </div>

      {/* Typography: FLAMINGO DESIGNS-SA */}
      <div className="flex flex-col leading-none">
        <div className={`font-display font-black tracking-tight ${sizeClasses.title} uppercase whitespace-nowrap flex items-baseline gap-1`}>
          <span className={isLight ? 'text-zinc-800' : 'text-zinc-100'}>
            FLAMINGO
          </span>
          <span className="text-[#F04423]">
            DESIGNS-SA
          </span>
        </div>

        {/* Subtitle: DESIGNS ■ WEBSITES ■ IT SUPPORT */}
        {showSubtitle && (
          <div className={`font-display font-bold uppercase mt-1 flex items-center gap-1.5 ${sizeClasses.sub} ${
            isLight ? 'text-zinc-600' : 'text-zinc-400'
          } whitespace-nowrap`}>
            <span>DESIGNS</span>
            <span className="text-[#F04423] text-[7px] sm:text-[8px] leading-none">■</span>
            <span>WEBSITES</span>
            <span className="text-[#F04423] text-[7px] sm:text-[8px] leading-none">■</span>
            <span>IT SUPPORT</span>
          </div>
        )}
      </div>
    </div>
  );
};
