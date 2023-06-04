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

const commentsApi = createApi({
  reducerPath: 'comments',
  baseQuery: fakeBaseQuery(),
  endpoints(builder) {
    return {
      fetchComments: builder.query<Comment[], string>({
        providesTags: (result, error, postId) => {
          const tags = result?.map((comment: Comment) => {
            return { type: 'Comment', id: comment.id };
          });
          tags?.push({ type: 'PostComments', id: postId });
          return tags as any;
        },
        queryFn: async (postId: string) => {
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
            return { error: error };
          }
        },
      }),
      addComment: builder.mutation({
        invalidatesTags: (result, error, newComment) => {
          return [{ type: 'PostComments', id: newComment.postId }] as any;
        },
        queryFn: async (newComment: Partial<Comment>) => {
          const commentsColRef = collection(db, 'comments');
          const docRef = await addDoc(commentsColRef, newComment);
          return { data: { id: docRef.id, ...newComment } };
        },
      }),
      removeComment: builder.mutation({
        invalidatesTags: (result, error, comment) => {
          return [{ type: 'PostComments', id: comment.postId }] as any;
        },
        queryFn: async (comment: Comment) => {
          const commentDoc = doc(db, 'comments', comment.id);
          await deleteDoc(commentDoc);
          return { data: comment };
        },
      }),
      updateComment: builder.mutation({
        invalidatesTags: (result, error, [comment, updatedComment]) => {
          return [{ type: 'PostComments', id: comment.postId }] as any;
        },
        queryFn: async ([comment, updatedComment]: [
          Comment,
          Partial<Comment>
        ]) => {
          const commentDoc = doc(db, 'comments', comment.id);
          await updateDoc(commentDoc, updatedComment);
          return { data: updatedComment };
        },
      }),
      deleteUserComments: builder.mutation({
        invalidatesTags: (result, error) => {
          const tags = result?.map((comment: Comment) => {
            return { type: 'Comment', id: comment.id };
          });
          return tags as any;
        },
        queryFn: async (user: User) => {
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
