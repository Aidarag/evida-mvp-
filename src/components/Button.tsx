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
  const baseStyle = 'inline-flex items-center justify-center font-display rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-sm hover:shadow-md hover:shadow-brand-purple/15 hover:opacity-95 hover:-translate-y-0.5',
    secondary: 'bg-brand-purple/10 text-brand-purple hover:bg-brand-purple/15 hover:-translate-y-0.5 font-bold',
    outline: 'border-2 border-brand-purple/25 text-brand-purple hover:bg-brand-purple/5 hover:border-brand-purple',
    ghost: 'text-brand-text/80 hover:text-brand-purple hover:bg-brand-purple/10',
    'coral-ghost': 'text-brand-purple hover:bg-brand-purple/10',
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
