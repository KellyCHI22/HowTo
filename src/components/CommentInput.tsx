import { auth } from '~/firebase';
import { serverTimestamp } from 'firebase/firestore/lite';
import { useState, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { RiSendPlaneFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Button, Textarea } from '~/components/elements';
import useAutosizeTextArea from '~/hooks/useAutosizeTextArea';
import {
  useFetchUsersQuery,
  useUpdatePostMutation,
  useAddCommentMutation,
} from '~/store';
import { Post } from '~/store/apis/postsApi.ts';

type CommentInputProps = {
  post: Post | undefined;
};

export default function CommentInput({ post }: CommentInputProps) {
  const [currentUser] = useAuthState(auth);
  const { data, error, isLoading } = useFetchUsersQuery();
  const defaultImage =
    'https://firebasestorage.googleapis.com/v0/b/howto-creative.appspot.com/o/logo_wbg.png?alt=media&token=9afe0ad1-011c-45a0-a983-14b002ee9668';
  const currentUserData = data?.find((user) => user.uid === currentUser?.uid);

  const [commentInput, setCommentInput] = useState('');
  const commentRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(commentRef.current, commentInput, 3);
  const [commentInputError, setCommentInputError] = useState('');

  const [addComment, addCommentResults] = useAddCommentMutation();
  const [updatePost, updatePostResults] = useUpdatePostMutation();
  const handleSubmitComment = async () => {
    if (commentInput.trim().length === 0) {
      return setCommentInputError('Comment should not be blank');
    } else {
      setCommentInputError('');
    }
    if (post && currentUser) {
      try {
        await updatePost([post.id, { commentsCount: post.commentsCount + 1 }]);
        const success = await addComment({
          createdAt: serverTimestamp(),
          content: commentInput,
          postId: post.id,
          userId: currentUser.uid,
        });
        if (success) return setCommentInput('');
      } catch {
        return setCommentInputError('Something went wrong, please try again');
      }
    }
  };

  return (
    <div className="mt-3 flex gap-3 rounded-xl bg-white p-5 text-sm shadow-basic md:text-base">
      <Link to="#" className="flex-shrink-0">
        <img
          src={isLoading || error ? defaultImage : currentUserData?.avatar}
          alt="author-avatar"
          className="aspect-square h-8 w-8 rounded-full object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col">
        <Textarea
          id="commentInput"
          value={commentInput}
          ref={commentRef}
          rows={3}
          placeholder="Add a comment..."
          className="text-sm md:text-base"
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <p className="text-red-500">{commentInputError}</p>
          <Button
            loading={addCommentResults.isLoading || updatePostResults.isLoading}
            primary
            basic
            className="mt-2 self-end font-bold"
            onClick={handleSubmitComment}
          >
            <RiSendPlaneFill />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
