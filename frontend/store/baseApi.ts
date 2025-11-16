/**
 * Base RTK Query API
 *
 * Provides shared configuration (base URL, headers, tags) that each domain-
 * specific slice can extend using `injectEndpoints`.
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      // Placeholder for future auth headers, etc.
      return headers;
    },
  }),
  tagTypes: ['Post', 'Channel', 'Campaign', 'Schedule'],
  endpoints: () => ({}),
});

