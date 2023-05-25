import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export type Post = {
  id: string;
  createdAt: number;
  title: string;
  introduction: string;
  tags: string[];
  authorId: string;
  image: string;
  commentsCount: number;
  likesCount: number;
  steps: {
    id: string;
    description: string;
  }[];
};

const postsApi = createApi({
  reducerPath: 'posts',
  baseQuery: fakeBaseQuery(),
  endpoints(builder) {
    return {
      fetchPosts: builder.query({
        queryFn: () => {
          return { data: null };
        },
      }),
    };
  },
});
