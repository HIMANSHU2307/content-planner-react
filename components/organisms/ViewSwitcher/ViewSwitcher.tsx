/**
 * ViewSwitcher Organism Component
 * 
 * Allows users to switch between list and calendar views.
 */

import React from 'react';
import { ViewMode } from '@/types';
import styles from './ViewSwitcher.module.scss';

export interface ViewSwitcherProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  currentView,
  onViewChange,
}) => {
  return (
    <div className={styles.viewSwitcher} role="tablist">
      <button
        type="button"
        role="tab"
        aria-selected={currentView === 'list'}
        className={`${styles.viewSwitcher__button} ${currentView === 'list' ? styles['viewSwitcher__button--active'] : ''}`}
        onClick={() => onViewChange('list')}
      >
        List View
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={currentView === 'calendar'}
        className={`${styles.viewSwitcher__button} ${currentView === 'calendar' ? styles['viewSwitcher__button--active'] : ''}`}
        onClick={() => onViewChange('calendar')}
      >
        Calendar View
      </button>
    </div>
  );
};

