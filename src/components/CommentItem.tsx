import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '~/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useUpdatePostMutation, useRemoveCommentMutation } from '~/store';
import { Post } from '~/store/apis/postsApi.ts';
import { Comment, useUpdateCommentMutation } from '~/store/apis/commentsApi.ts';
import clsx from 'clsx';
import {
  RiDeleteBin6Line,
  RiArrowGoBackLine,
  RiCheckLine,
  RiMoreLine,
  RiEdit2Line,
} from 'react-icons/ri';
import ReactTimeAgo from 'react-time-ago';
import useAutosizeTextArea from '~/hooks/useAutosizeTextArea';
import { Button, Textarea } from './elements';
import { User } from '~/store/apis/usersApi';

type CommentItemProps = {
  comment: Comment;
  post: Post | undefined;
  usersData: User[] | undefined;
};

export default function CommentItem({
  comment,
  post,
  usersData,
}: CommentItemProps) {
  const [currentUser] = useAuthState(auth);
  const { createdAt, content, userId } = comment;
  const user = usersData?.find((user) => user.uid === userId);

  const [showOption, setShowOption] = useState(false);
  const handleShowOption = () => setShowOption((prev) => !prev);
  const [isEditMode, setIsEditMode] = useState(false);
  const handleEditMode = () => setIsEditMode((prev) => !prev);
  const [commentEditInput, setCommentEditInput] = useState(comment.content);
  const commentEditRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(commentEditRef.current, commentEditInput, 3);
  const [commentEditError, setCommentEditError] = useState('');

  // * delete comment
  const [removeComment, removeCommentResults] = useRemoveCommentMutation();
  const [updatePost, updatePostResults] = useUpdatePostMutation();
  const handleDeleteComment = async () => {
    if (comment && post) {
      const result = confirm('Are you sure to delete this comment?');
      if (result) {
        try {
          await updatePost([
            post.id,
            { commentsCount: post.commentsCount - 1 },
          ]);
          const success = await removeComment(comment);
          if (success) return;
        } catch {
          setCommentEditError('Something went wrong, please try again');
        }
      }
    }
  };

  // * update comment
  const [updateComment, updateCommentResults] = useUpdateCommentMutation();
  const handleSubmit = async () => {
    if (commentEditInput.trim().length === 0) {
      return setCommentEditError('Comment should not be blank');
    } else {
      setCommentEditError('');
    }
    try {
      const success = await updateComment([
        comment,
        { content: commentEditInput },
      ]);
      if (success) return;
    } catch {
      setCommentEditError('Something went wrong, please try again');
    }
  };

  return (
    <>
      {isEditMode ? (
        <div className="relative mt-3 flex gap-3 rounded-xl bg-white p-5 text-sm shadow-basic md:text-base">
          <Link to="#" className="flex-shrink-0">
            <img
              src={user?.avatar}
              alt="author-avatar"
              className="aspect-square h-8 w-8 rounded-full object-cover"
            />
          </Link>
          <div className="flex flex-1 flex-col">
            <Textarea
              id="commentInput"
              value={commentEditInput}
              ref={commentEditRef}
              rows={3}
              placeholder="Edit your comment..."
              className="text-sm md:text-base"
              onChange={(e) => setCommentEditInput(e.target.value)}
            />
            <div className="mt-2 flex justify-between">
              <Button
                loading={
                  removeCommentResults.isLoading || updatePostResults.isLoading
                }
                danger
                rounded
                className="absolute left-4"
                onClick={handleDeleteComment}
              >
                <RiDeleteBin6Line className="text-xl" />
              </Button>
              <p className="text-red-500">{commentEditError}</p>
              <div className="flex gap-2">
                <Button
                  loading={false}
                  secondary
                  rounded
                  onClick={() => {
                    handleEditMode();
                    setShowOption(false);
                  }}
                >
                  <RiArrowGoBackLine className="text-xl" />
                </Button>
                <Button
                  loading={updateCommentResults.isLoading}
                  primary
                  basic
                  className="font-bold"
                  onClick={handleSubmit}
                >
                  <RiCheckLine className="text-xl" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-3 rounded-xl bg-white p-5 text-sm shadow-basic md:text-base">
          <Link to={`/users/${user?.uid}`} className="flex-shrink-0">
            <img
              src={user?.avatar}
              alt="author-avatar"
              className="aspect-square h-8 w-8 rounded-full object-cover"
            />
          </Link>
          <div className="w-full">
            <div className="relative space-x-2 text-gray-400">
              <span className="font-bold text-gray-900">{user?.name}</span>
              <span>
                <ReactTimeAgo
                  date={createdAt as Date}
                  locale="en-US"
                  timeStyle="round"
                />
              </span>
              {currentUser && currentUser.uid === comment?.userId && (
                <button
                  className="absolute right-0 top-0 text-teal-500"
                  onClick={handleShowOption}
                >
                  <RiMoreLine className="text-2xl" />
                </button>
              )}
              {showOption && (
                <div className="absolute right-6 top-0 rounded-lg bg-white p-1 text-left text-base shadow-2xl shadow-gray-400">
                  <button
                    className="flex w-full items-center gap-2 rounded-lg p-2 text-teal-500 hover:bg-gray-50"
                    onClick={handleEditMode}
                  >
                    <RiEdit2Line className="text-xl" />
                    Edit
                  </button>
                  <button
                    className={clsx(
                      'flex items-center gap-2 rounded-lg p-2 text-red-400 hover:bg-gray-50',
                      { 'pointer-events-none': removeCommentResults.isLoading }
                    )}
                    onClick={handleDeleteComment}
                  >
                    <RiDeleteBin6Line className="text-xl" />
                    Delete
                  </button>
                </div>
              )}
            </div>
            <p className="mt-3 text-gray-900">{content}</p>
          </div>
        </div>
      )}
    </>
  );
}
