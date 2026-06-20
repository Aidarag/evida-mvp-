import React from 'react';

interface EvidaLogoProps {
  className?: string;
  size?: number;
}

export const EvidaLogo: React.FC<EvidaLogoProps> = ({ className = '', size = 32 }) => {
  return (
    <div 
      className={`grid grid-cols-2 gap-[8%] ${className}`} 
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {/* Top Left Leaf */}
      <div 
        className="bg-[#FE7F42] transition-all duration-300 shadow-md shadow-[#FE7F42]/10"
        style={{
          borderTopLeftRadius: '40%',
          borderBottomRightRadius: '10%',
          borderTopRightRadius: '25%',
          borderBottomLeftRadius: '25%',
        }}
      />
      {/* Top Right Leaf */}
      <div 
        className="bg-[#FF8A4C] transition-all duration-300 shadow-md shadow-[#FF8A4C]/10"
        style={{
          borderTopRightRadius: '40%',
          borderBottomLeftRadius: '10%',
          borderTopLeftRadius: '25%',
          borderBottomRightRadius: '25%',
        }}
      />
      {/* Bottom Left Leaf */}
      <div 
        className="bg-[#FE7F42] transition-all duration-300 shadow-md shadow-[#FE7F42]/10"
        style={{
          borderBottomLeftRadius: '40%',
          borderTopRightRadius: '10%',
          borderBottomRightRadius: '25%',
          borderTopLeftRadius: '25%',
        }}
      />
      {/* Bottom Right Leaf */}
      <div 
        className="bg-[#FE7F42] transition-all duration-300 shadow-md shadow-[#FE7F42]/10"
        style={{
          borderBottomRightRadius: '40%',
          borderTopLeftRadius: '10%',
          borderBottomLeftRadius: '25%',
          borderTopRightRadius: '25%',
        }}
      />
    </div>
  );
};

export const EvidaLogoText: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 24 }) => {
  return (
    <span 
      className={`font-sans font-bold tracking-tight select-none text-white ${className}`}
      style={{ 
        fontSize: `${size}px`, 
        letterSpacing: '-0.03em',
        lineHeight: 1
      }}
    >
      Evida
    </span>
  );
};

export default EvidaLogo;

