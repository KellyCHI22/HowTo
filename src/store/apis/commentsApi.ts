import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '~/firebase';

export type Comment = {
  id: string;
  createdAt: Date;
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
    };
  },
});

export const { useFetchCommentsQuery } = commentsApi;
export { commentsApi };
