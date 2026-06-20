import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'coral-ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-display rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/50 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#FF7A1A] to-[#E56717] text-white shadow-md shadow-[#FF7A1A]/15 hover:shadow-[#FF7A1A]/30 hover:opacity-95 hover:-translate-y-0.5',
    secondary: 'bg-[#FF7A1A]/10 text-[#FF7A1A] hover:bg-[#FF7A1A]/15 hover:-translate-y-0.5 font-bold',
    outline: 'border-2 border-[#FF7A1A]/20 text-[#FF7A1A] hover:bg-[#FF7A1A]/5 hover:border-[#FF7A1A]/40',
    ghost: 'text-white/80 hover:text-[#FF7A1A] hover:bg-white/5',
    'coral-ghost': 'text-[#FF7A1A] hover:bg-[#FF7A1A]/10',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs font-semibold',
    md: 'px-5 py-2.5 text-sm font-semibold',
    lg: 'px-7 py-3.5 text-base font-bold tracking-wide',
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
