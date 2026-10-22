import React from 'react';

interface PoshanSetuLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const PoshanSetuLogo: React.FC<PoshanSetuLogoProps> = ({
  className = '',
  size = 'md',
  showText = false
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`relative ${sizeMap[size]} shrink-0 rounded-full overflow-hidden bg-white shadow-xs border border-emerald-600/20`}>
        <img
          src="/src/assets/images/poshan_setu_official_logo_1792660604697.jpg"
          alt="Poshan Setu Official Logo"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center font-black tracking-tight text-xl font-display">
            <span className="text-[#EA580C]">Poshan</span>
            <span className="text-[#15803D] ml-1">Setu</span>
          </div>
          <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase mt-0.5">
            Supervisor Command Center
          </span>
        </div>
      )}
    </div>
  );
};
