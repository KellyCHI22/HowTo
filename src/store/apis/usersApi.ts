import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export type User = {
  id?: string;
  uid?: string;
  createdAt: number | string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  cover_image: string;
  followers: string[];
  following: string[];
  likedPosts: string[];
  bookmarkedPosts: string[];
};

const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fakeBaseQuery(),
  endpoints(builder) {
    return {
      fetchUsers: builder.query({
        queryFn: () => {
          return { data: null };
        },
      }),
    };
  },
});
