/**
 * Providers Component
 * 
 * Wraps the application with Redux Provider for state management.
 */

'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

