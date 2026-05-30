import React from 'react';
import './Button.scss';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...rest
}) => (
  <button className={`btn btn--${variant} ${className}`} {...rest}>
    {children}
  </button>
);

export default Button;