import React, { useEffect } from 'react';
import styles from './Modal.module.scss';

export interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modal__backdrop} onClick={onClose} aria-hidden="true" />
      <div className={styles.modal__content} role="dialog" aria-modal="true">
        <div className={styles.modal__header}>
          {title && <h2>{title}</h2>}
          <button
            type="button"
            className={styles.modal__close}
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className={styles.modal__body}>{children}</div>
      </div>
    </div>
  );
};

