/**
 * Typed Redux Hooks
 * 
 * Pre-typed versions of Redux hooks for better TypeScript support.
 * Use these instead of the plain hooks from react-redux.
 */

import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

