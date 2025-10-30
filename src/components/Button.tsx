import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

const Button = ({
  variant = 'primary',
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'py-3 rounded-lg font-semibold uppercase tracking-wider transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl';

  const widthStyles = fullWidth ? "w-full" : "";

  const variantStyles = variant === 'primary' 
    ? {
        backgroundColor: '#a00000',
        color: 'white',
      }
    : {
        backgroundColor: 'white',
        color: '#a00000',
        border: '2px solid #a00000',
      };

  return (
    <button
      className={`${baseStyles} ${widthStyles} ${className}`}
      style={variantStyles}
      onMouseEnter={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.backgroundColor = '#8a0000';
        } else {
          e.currentTarget.style.backgroundColor = '#a00000';
          e.currentTarget.style.color = 'white';
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.backgroundColor = '#a00000';
        } else {
          e.currentTarget.style.backgroundColor = 'white';
          e.currentTarget.style.color = '#a00000';
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;