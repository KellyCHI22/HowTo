import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { usersApi } from './apis/usersApi';
import { postsApi } from './apis/postsApi';
import { commentsApi } from './apis/commentsApi';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare({
      serializableCheck: false,
    })
      .concat(usersApi.middleware)
      .concat(postsApi.middleware)
      .concat(commentsApi.middleware);
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
  useFetchUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from './apis/usersApi';
export {
  useFetchPostsQuery,
  useAddPostMutation,
  useRemovePostMutation,
  useUpdatePostMutation,
  useDeleteUserPostsMutation,
} from './apis/postsApi';
export {
  useFetchCommentsQuery,
  useAddCommentMutation,
  useRemoveCommentMutation,
  useUpdateCommentMutation,
  useDeleteUserCommentsMutation,
} from './apis/commentsApi';
