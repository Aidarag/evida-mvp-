import React from 'react';

interface EvidaLogoProps {
  className?: string;
  size?: number;
}

export const EvidaLogo: React.FC<EvidaLogoProps> = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} flex-shrink-0`}
    >
      <defs>
        {/* Purple to Blue gradient */}
        <linearGradient id="evida-purple-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="50%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
        {/* Blue to Green gradient */}
        <linearGradient id="evida-blue-green" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="60%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
      </defs>

      {/* The main 'e' body curve */}
      <path
        d="M 50,15 
           C 25,15 15,35 15,50 
           C 15,70 30,85 50,85 
           C 65,85 75,75 80,65
           C 82,60 83,55 83,50
           C 83,48 81,46 79,47
           C 74,49 68,52 62,54
           C 54,56 46,57 38,57
           C 28,57 22,51 22,43
           C 22,30 35,23 50,23
           C 65,23 75,32 75,43
           C 75,45 77,47 79,45
           L 84,40
           C 85,38 84,35 82,33
           C 76,23 64,15 50,15 Z"
        fill="url(#evida-purple-blue)"
      />

      {/* Overlapping lower ribbon that completes the 'e' structure */}
      <path
        d="M 50,85
           C 65,85 75,77 82,68
           C 84,65 85,61 85,57
           C 85,53 82,50 78,51
           C 70,53 62,55 54,55
           C 46,55 40,51 40,46
           C 40,43 43,40 47,38
           C 51,36 56,36 61,38
           C 65,39 67,37 66,33
           C 64,28 60,25 55,25
           C 43,25 33,35 33,48
           C 33,65 45,85 50,85 Z"
        fill="url(#evida-blue-green)"
        opacity="0.95"
      />

      {/* The organic leaf terminal at the bottom right */}
      <path
        d="M 68,66
           C 74,68 83,64 88,58
           C 93,52 95,43 95,43
           C 95,43 86,43 80,48
           C 74,53 68,60 68,66 Z"
        fill="#10B981"
      />
      {/* Leaf vein */}
      <path
        d="M 68,66 Q 81,54 95,43"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
};

export const EvidaLogoText: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 24 }) => {
  return (
    <div 
      className={`flex items-baseline select-none font-display font-extrabold tracking-tight ${className}`}
      style={{ fontSize: `${size}px`, lineHeight: 1 }}
    >
      <span>Ev</span>
      {/* The 'i' dot is replaced by a small vector leaf */}
      <span className="relative inline-block">
        <span>i</span>
        <svg
          className="absolute -top-[4px] -right-[1px]"
          width={size * 0.45}
          height={size * 0.45}
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 1,9 
               C 2.5,5.5 5.5,2.5 9,1 
               C 8,5.5 5.5,8 1,9 Z"
            fill="#10B981"
          />
        </svg>
      </span>
      <span>da</span>
    </div>
  );
};

export default EvidaLogo;
