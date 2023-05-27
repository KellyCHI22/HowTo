import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '~/firebase';

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
      fetchUsers: builder.query<User[], void>({
        providesTags: (result, error) => {
          const tags = result?.map((user: User) => {
            return { type: 'User', id: user.uid };
          });
          return tags as any;
        },
        queryFn: async () => {
          const usersColRef = collection(db, 'users');
          const docSnapshot = await getDocs(usersColRef);
          const filteredData = docSnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            } as User;
          });
          return { data: filteredData };
        },
      }),
    };
  },
});

export const { useFetchUsersQuery } = usersApi;
export { usersApi };
