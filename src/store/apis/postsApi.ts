import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  FieldValue,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from '~/firebase';
import { User } from './usersApi';

export type Post = {
  id: string;
  createdAt: Date | FieldValue;
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
        queryFn: async (newPost: Partial<Post>) => {
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
        invalidatesTags: (result, error, [postId, updatedPost]) => {
          return [{ type: 'Post', id: postId }] as any;
        },
        queryFn: async ([postId, updatedPost]: [string, Partial<Post>]) => {
          const postDoc = doc(db, 'posts', postId);
          await updateDoc(postDoc, updatedPost);
          return { data: updatedPost };
        },
      }),
      deleteUserPosts: builder.mutation({
        invalidatesTags: (result, error) => {
          const tags = result?.map((post: Post) => {
            return { type: 'Post', id: post.id };
          });
          tags?.push({ type: 'Posts', id: 'LIST' });
          return tags as any;
        },
        queryFn: async (user: User) => {
          const batch = writeBatch(db);
          const postsColRef = collection(db, 'posts');
          const q = query(postsColRef, where('authorId', '==', user.uid));

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => batch.delete(doc.ref));
          batch.commit(); // * delete multiple docs at once
          const filteredData = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            } as Post;
          });
          return { data: filteredData };
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
  useDeleteUserPostsMutation,
} = postsApi;
export { postsApi };
