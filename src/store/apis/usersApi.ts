import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '~/firebase';

export type User = {
  id: string;
  uid: string;
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

type CustomErrorType = { message: string };

const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fakeBaseQuery<CustomErrorType>(),
  tagTypes: ['Users'],
  endpoints: (builder) => {
    return {
      fetchUsers: builder.query<User[], void>({
        providesTags: (result) => {
          if (result) {
            const tags = result?.map((user: User) => {
              return { type: 'Users' as const, id: user.uid };
            });
            tags?.push({ type: 'Users', id: 'LIST' });
            return tags;
          } else {
            return [{ type: 'Users', id: 'LIST' }];
          }
        },
        queryFn: async () => {
          try {
            const usersColRef = collection(db, 'users');
            const docSnapshot = await getDocs(usersColRef);
            const filteredData = docSnapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              } as User;
            });
            return { data: filteredData };
          } catch (error) {
            return { error: { message: 'error fetching users' } };
          }
        },
      }),
      updateUser: builder.mutation<Partial<User>, [User, Partial<User>]>({
        invalidatesTags: (_, __, [user]) => {
          return [{ type: 'Users', id: user.uid }];
        },
        queryFn: async ([user, updatedUser]) => {
          try {
            const userDoc = doc(db, 'users', user.id);
            await updateDoc(userDoc, updatedUser);
            return { data: updatedUser };
          } catch (error) {
            return { error: { message: 'error updating user' } };
          }
        },
      }),
      deleteUser: builder.mutation<User, User>({
        invalidatesTags: (_, __, user) => {
          return [{ type: 'Users', id: user.uid }];
        },
        queryFn: async (user) => {
          try {
            const userDoc = doc(db, 'users', user.id);
            await deleteDoc(userDoc);
            return { data: user };
          } catch (error) {
            return { error: { message: 'error deleting user' } };
          }
        },
      }),
    };
  },
});

export const {
  useFetchUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
export { usersApi };
