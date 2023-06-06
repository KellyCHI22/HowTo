import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  FieldValue,
  Timestamp,
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

// * createdAt has a different type
export type PostCreateType = {
  id: string;
  createdAt: Timestamp | FieldValue;
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

type CustomErrorType = { message: string };

const postsApi = createApi({
  reducerPath: 'posts',
  baseQuery: fakeBaseQuery<CustomErrorType>(),
  tagTypes: ['Posts'],
  endpoints: (builder) => {
    return {
      fetchPosts: builder.query<Post[], void>({
        providesTags: (result) => {
          if (result) {
            const tags = result?.map((post: Post) => {
              return { type: 'Posts' as const, id: post.id };
            });
            tags?.push({ type: 'Posts', id: 'LIST' });
            return tags;
          } else {
            return [{ type: 'Posts', id: 'LIST' }];
          }
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
            return { error: { message: 'error fetching posts' } };
          }
        },
      }),
      // ! idk how to type this one
      addPost: builder.mutation({
        invalidatesTags: () => {
          return [{ type: 'Posts', id: 'LIST' }];
        },
        queryFn: async (newPost: Partial<PostCreateType>) => {
          try {
            const postsColRef = collection(db, 'posts');
            const docRef = await addDoc(postsColRef, newPost);
            return { data: { ...newPost, id: docRef.id } };
          } catch (error) {
            return { error: { message: 'error adding posts' } };
          }
        },
      }),
      removePost: builder.mutation<Post, Post>({
        invalidatesTags: (_, __, post: Post) => {
          return [{ type: 'Posts', id: post.id }];
        },
        queryFn: async (post) => {
          try {
            const postDoc = doc(db, 'posts', post.id);
            await deleteDoc(postDoc);
            return { data: post };
          } catch (error) {
            return { error: { message: 'error removing posts' } };
          }
        },
      }),
      updatePost: builder.mutation<Partial<Post>, [string, Partial<Post>]>({
        invalidatesTags: (_, __, [postId]) => {
          return [{ type: 'Posts', id: postId }];
        },
        queryFn: async ([postId, updatedPost]) => {
          try {
            const postDoc = doc(db, 'posts', postId);
            await updateDoc(postDoc, updatedPost);
            return { data: updatedPost };
          } catch (error) {
            return { error: { message: 'error updating posts' } };
          }
        },
      }),
      deleteUserPosts: builder.mutation<Post[], User>({
        invalidatesTags: (result) => {
          if (result) {
            const tags = result?.map((post: Post) => {
              return { type: 'Posts' as const, id: post.id };
            });
            tags?.push({ type: 'Posts', id: 'LIST' });
            return tags;
          } else {
            return [{ type: 'Posts', id: 'LIST' }];
          }
        },
        queryFn: async (user) => {
          try {
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
          } catch (error) {
            return { error: { message: 'error deleting user posts' } };
          }
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
