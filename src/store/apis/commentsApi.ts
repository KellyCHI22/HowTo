import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  FieldValue,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '~/firebase';

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
    };
  },
});

export const {
  useFetchCommentsQuery,
  useAddCommentMutation,
  useRemoveCommentMutation,
} = commentsApi;
export { commentsApi };
