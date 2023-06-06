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

export type Comment = {
  id: string;
  createdAt: Date | FieldValue;
  content: string;
  postId: string;
  userId: string;
};

type CustomErrorType = { message: string };
type TagType = 'Comments' | 'PostComments';

const commentsApi = createApi({
  reducerPath: 'comments',
  baseQuery: fakeBaseQuery<CustomErrorType>(),
  tagTypes: ['Comments', 'PostComments'],
  endpoints: (builder) => {
    return {
      fetchComments: builder.query<Comment[], string>({
        providesTags: (result, _, postId) => {
          if (result) {
            const tags = result?.map((comment: Comment) => {
              return { type: 'Comments' as TagType, id: comment.id };
            });
            tags?.push({ type: 'PostComments', id: postId });
            return tags;
          } else {
            return [{ type: 'PostComments', id: postId }];
          }
        },
        queryFn: async (postId) => {
          try {
            const commentsColRef = collection(db, 'comments');
            const q = query(commentsColRef, where('postId', '==', `${postId}`));
            const querySnapshot = await getDocs(q);
            const filteredData = querySnapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt.toDate(),
              } as Comment;
            });
            return { data: filteredData };
          } catch (error) {
            return { error: { message: 'error fetching comments' } };
          }
        },
      }),
      // ! idk how to type this one
      addComment: builder.mutation({
        invalidatesTags: (_, __, newComment) => {
          return [{ type: 'PostComments', id: newComment.postId }];
        },
        queryFn: async (newComment: Partial<Comment>) => {
          try {
            const commentsColRef = collection(db, 'comments');
            const docRef = await addDoc(commentsColRef, newComment);
            return { data: { id: docRef.id, ...newComment } };
          } catch (error) {
            return { error: { message: 'error adding comment' } };
          }
        },
      }),
      removeComment: builder.mutation<Comment, Comment>({
        invalidatesTags: (_, __, comment) => {
          return [{ type: 'PostComments', id: comment.postId }];
        },
        queryFn: async (comment) => {
          try {
            const commentDoc = doc(db, 'comments', comment.id);
            await deleteDoc(commentDoc);
            return { data: comment };
          } catch (error) {
            return { error: { message: 'error deleting comment' } };
          }
        },
      }),
      updateComment: builder.mutation<
        Partial<Comment>,
        [Comment, Partial<Comment>]
      >({
        invalidatesTags: (_, __, [comment]) => {
          return [{ type: 'PostComments', id: comment.postId }];
        },
        queryFn: async ([comment, updatedComment]) => {
          try {
            const commentDoc = doc(db, 'comments', comment.id);
            await updateDoc(commentDoc, updatedComment);
            return { data: updatedComment };
          } catch (error) {
            return { error: { message: 'error updating comment' } };
          }
        },
      }),
      deleteUserComments: builder.mutation<Comment[], User>({
        invalidatesTags: (result) => {
          if (result) {
            const tags = result?.map((comment: Comment) => {
              return { type: 'Comments' as TagType, id: comment.id };
            });
            return tags;
          } else {
            return [];
          }
        },
        queryFn: async (user) => {
          try {
            const batch = writeBatch(db);
            const commentsColRef = collection(db, 'comments');
            const q = query(commentsColRef, where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => batch.delete(doc.ref));
            batch.commit();
            const filteredData = querySnapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt.toDate(),
              } as Comment;
            });
            return { data: filteredData };
          } catch (error) {
            return { error: { message: 'error deleting user comments' } };
          }
        },
      }),
    };
  },
});

export const {
  useFetchCommentsQuery,
  useAddCommentMutation,
  useRemoveCommentMutation,
  useUpdateCommentMutation,
  useDeleteUserCommentsMutation,
} = commentsApi;
export { commentsApi };
