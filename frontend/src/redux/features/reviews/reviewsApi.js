import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/reviews`,
    credentials: 'include',
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    postReview: builder.mutation({
      query: (reviewData) => ({
        url: "/post-reviews",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: "Reviews", id: postId }],
    }),
    getReviewCount: builder.query({
      query: () => ({
        url: "/total-reviews",
      }),
    }),
    getReviewsByUserId: builder.query({
      query: (userId) => ({
        url: `/${userId}`,
      }),
      providesTags: (result) =>
        result ? result.map((review) => ({ type: "Reviews", id: review.userId })) : [],
    }),
  }),
});

export const { usePostReviewMutation, useGetReviewCountQuery, useGetReviewsByUserIdQuery } = reviewApi;

export default reviewApi;
