/**
 * Badge Atom Component
 * 
 * A small status indicator component for displaying labels and statuses.
 */

import React from 'react';
import styles from './Badge.module.scss';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'small' | 'medium';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'medium',
}) => {
  return (
    <span className={`${styles.badge} ${styles[`badge--${variant}`]} ${styles[`badge--${size}`]}`}>
      {children}
    </span>
  );
};

