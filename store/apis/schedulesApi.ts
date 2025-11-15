import { baseApi } from '../baseApi';
import type { Schedule } from '@/types';

interface ScheduleFilters {
  postId?: string;
  startDate?: string;
  endDate?: string;
}

export const schedulesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSchedules: builder.query<Schedule[], ScheduleFilters | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.postId) searchParams.append('postId', params.postId);
        if (params?.startDate) searchParams.append('startDate', params.startDate);
        if (params?.endDate) searchParams.append('endDate', params.endDate);

        const queryString = searchParams.toString();
        return {
          url: `/schedules${queryString ? `?${queryString}` : ''}`,
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Schedule' as const, id })),
              { type: 'Schedule', id: 'LIST' },
            ]
          : [{ type: 'Schedule', id: 'LIST' }],
    }),

    createSchedule: builder.mutation<Schedule, Partial<Schedule>>({
      query: (schedule) => ({
        url: '/schedules',
        method: 'POST',
        body: schedule,
      }),
      invalidatesTags: [
        { type: 'Schedule', id: 'LIST' },
        { type: 'Post', id: 'LIST' },
      ],
    }),

    deleteSchedule: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/schedules/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Schedule', id },
        { type: 'Schedule', id: 'LIST' },
        { type: 'Post', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSchedulesQuery,
  useCreateScheduleMutation,
  useDeleteScheduleMutation,
} = schedulesApi;

