import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
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
      removePost: builder.mutation({
        invalidatesTags: (result, error, post: Post) => {
          return [{ type: 'Post', id: post.id }] as any;
        },
        queryFn: async (post: Post) => {
          const postDoc = doc(db, 'posts', post.id);
          await deleteDoc(postDoc);
          return { data: post };
        },
      }),
      updatePost: builder.mutation({
        invalidatesTags: (result, error, { postId, updatedPost }) => {
          return [{ type: 'Post', id: postId }] as any;
        },
        queryFn: async ([postId, updatedPost]) => {
          const postDoc = doc(db, 'posts', postId);
          await updateDoc(postDoc, updatedPost);
          return { data: updatedPost };
        },
      }),
    };
  },
});

export const {
  useFetchPostsQuery,
  useAddPostMutation,
  useRemovePostMutation,
  useUpdatePostMutation,
} = postsApi;
export { postsApi };
