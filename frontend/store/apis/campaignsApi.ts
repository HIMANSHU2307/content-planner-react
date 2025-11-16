import { baseApi } from '../baseApi';
import type { Campaign } from '@/types';

export const campaignsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query<Campaign[], void>({
      query: () => '/campaigns',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Campaign' as const, id })),
              { type: 'Campaign', id: 'LIST' },
            ]
          : [{ type: 'Campaign', id: 'LIST' }],
    }),

    getCampaign: builder.query<Campaign, string>({
      query: (id) => `/campaigns/${id}`,
      providesTags: (result, error, id) => [{ type: 'Campaign', id }],
    }),

    createCampaign: builder.mutation<Campaign, Partial<Campaign>>({
      query: (campaign) => ({
        url: '/campaigns',
        method: 'POST',
        body: campaign,
      }),
      invalidatesTags: [{ type: 'Campaign', id: 'LIST' }],
    }),

    updateCampaign: builder.mutation<
      Campaign,
      { id: string; data: Partial<Campaign> }
    >({
      query: ({ id, data }) => ({
        url: `/campaigns/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Campaign', id },
        { type: 'Campaign', id: 'LIST' },
      ],
    }),

    deleteCampaign: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/campaigns/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Campaign', id },
        { type: 'Campaign', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCampaignsQuery,
  useGetCampaignQuery,
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
  useDeleteCampaignMutation,
} = campaignsApi;

