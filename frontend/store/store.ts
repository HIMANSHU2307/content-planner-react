/**
 * Redux Store Configuration
 * 
 * Centralized Redux store setup with RTK Query integration.
 * This store manages the global application state and API caching.
 */

import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './baseApi';

/**
 * Redux Store
 * 
 * Configured with:
 * - RTK Query middleware for API caching
 * - Redux DevTools integration (in development)
 * - Immutability checks disabled for performance
 */
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    // Add other reducers here as needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

