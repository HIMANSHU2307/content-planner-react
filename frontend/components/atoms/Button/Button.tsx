/**
 * Button Atom Component
 * 
 * A reusable button component with variants and sizes.
 * Supports RTL layout and accessibility features.
 */

import React from 'react';
import styles from './Button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  children: React.ReactNode;
}

/**
 * Button Component
 * 
 * @param variant - Visual style variant
 * @param size - Button size
 * @param isLoading - Shows loading state
 * @param children - Button content
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    isLoading && styles['button--loading'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className={styles.spinner} aria-hidden="true" />
          <span className={styles['button__text']}>{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

