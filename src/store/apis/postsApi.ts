import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from 'firebase/auth';
import {
  FieldValue,
  Timestamp,
  addDoc,
  collection,
  getDocs,
} from 'firebase/firestore';
import { db } from '~/firebase';

export type Post = {
  id: string;
  createdAt: Date;
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
      fetchPosts: builder.query<Post[], void>({
        providesTags: (result, error) => {
          const tags = result?.map((post: Post) => {
            return { type: 'Post', id: post.id };
          });
          tags?.push({ type: 'Posts', id: 'LIST' });
          return tags as any;
        },
        queryFn: async () => {
          try {
            const postsColRef = collection(db, 'posts');
            const docSnapshot = await getDocs(postsColRef);
            const filteredData = docSnapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt.toDate(),
              } as Post;
            });
            return { data: filteredData };
          } catch (error) {
            return { error: error };
          }
        },
      }),
      addPost: builder.mutation({
        invalidatesTags: () => {
          return [{ type: 'Posts', id: 'LIST' }] as any;
        },
        queryFn: async (newPost) => {
          try {
            const postsColRef = collection(db, 'posts');
            const docRef = await addDoc(postsColRef, newPost);
            return { data: { ...newPost, id: docRef.id } };
          } catch (error) {
            return { error: error };
          }
        },
      }),
    };
  },
});

export const { useFetchPostsQuery, useAddPostMutation } = postsApi;
export { postsApi };
