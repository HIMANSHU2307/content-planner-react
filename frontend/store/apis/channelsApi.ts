import { baseApi } from '../baseApi';
import type { Channel } from '@/types';

export const channelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query<Channel[], void>({
      query: () => '/channels',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Channel' as const, id })),
              { type: 'Channel', id: 'LIST' },
            ]
          : [{ type: 'Channel', id: 'LIST' }],
    }),

    getChannel: builder.query<Channel, string>({
      query: (id) => `/channels/${id}`,
      providesTags: (result, error, id) => [{ type: 'Channel', id }],
    }),

    createChannel: builder.mutation<Channel, Partial<Channel>>({
      query: (channel) => ({
        url: '/channels',
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: [{ type: 'Channel', id: 'LIST' }],
    }),

    updateChannel: builder.mutation<
      Channel,
      { id: string; data: Partial<Channel> }
    >({
      query: ({ id, data }) => ({
        url: `/channels/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Channel', id },
        { type: 'Channel', id: 'LIST' },
      ],
    }),

    deleteChannel: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/channels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Channel', id },
        { type: 'Channel', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetChannelsQuery,
  useGetChannelQuery,
  useCreateChannelMutation,
  useUpdateChannelMutation,
  useDeleteChannelMutation,
} = channelsApi;

