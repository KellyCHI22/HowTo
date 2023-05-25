import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export type Comment = {
  id: string;
  createdAt: number;
  commentContent: string;
  postId: string;
  userId: string;
};

const commentsApi = createApi({
  reducerPath: 'comments',
  baseQuery: fakeBaseQuery(),
  endpoints(builder) {
    return {
      fetchComments: builder.query({
        queryFn: (post) => {
          return { data: null };
        },
      }),
    };
  },
});
