import { useState, useRef } from 'react';
import {
  RiArrowLeftLine,
  RiChat1Line,
  RiEdit2Line,
  RiHeartLine,
  RiBookmark2Line,
  RiSendPlaneFill,
  RiMoreLine,
  RiDeleteBin6Line,
  RiArrowGoBackLine,
  RiCheckLine,
} from 'react-icons/ri';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '~/components/elements/Button';
import Tag from '~/components/elements/Tag';
import Textarea from '~/components/elements/Textarea';
import useAutosizeTextArea from '~/hooks/useAutosizeTextArea';

import {
  posts,
  users,
  comments,
  currentUser,
  Comment,
  Post,
} from '../dummyData';
import ReactTimeAgo from 'react-time-ago';
import { auth } from '~/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useFetchUsersQuery } from '~/store/apis/usersApi';

export default function HowToPage() {
  const [currentUser, loadingCurrentUser, errorCurrentUser] =
    useAuthState(auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showOption, setShowOption] = useState(false);
  const handleShowOption = () => setShowOption((prev) => !prev);
  const post = posts.find((post) => post.id === id) as Post;
  const user = users.find((user) => user.id === post?.authorId);
  const postComments = comments.filter((comment) => comment.postId === id);

  return (
    <div className="my-5 md:my-12">
      <div className=" mb-5 space-y-3 rounded-xl bg-white p-5 shadow-basic lg:space-y-0 ">
        <div className="relative flex justify-between text-teal-500">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <RiArrowLeftLine className="text-2xl" />
          </button>
          {/* // todo need to add if currentUser === post author check  */}
          {currentUser && (
            <button onClick={handleShowOption}>
              <RiMoreLine className="text-2xl" />
            </button>
          )}
          {showOption && (
            <div className="absolute right-6 top-0 rounded-lg bg-white p-1 text-left shadow-2xl shadow-gray-400">
              <Link to={`/howtos/${id}/edit`}>
                <button className="flex w-full items-center gap-2 rounded-lg p-2 hover:bg-gray-50">
                  <RiEdit2Line className="text-xl" />
                  Edit
                </button>
              </Link>
              <button className="flex items-center gap-2 rounded-lg p-2 text-red-400 hover:bg-gray-50">
                <RiDeleteBin6Line className="text-xl" />
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="flex">
          <div className="space-y-3">
            <img
              src={post?.image}
              alt=""
              className="aspect-video w-full rounded-xl object-cover lg:hidden"
            />
            <div className="flex items-center justify-between text-sm md:justify-start md:gap-2 md:text-base">
              <div className="flex items-center gap-2">
                <Link to={`/users/${user?.id}`}>
                  <img
                    src={user?.avatar}
                    alt="author-avatar"
                    className="aspect-square h-8 w-8 rounded-full object-cover"
                  />
                </Link>
                <span className="font-bold">{user?.name}</span>
              </div>
              <span className="text-gray-400">
                <ReactTimeAgo
                  date={post?.createdAt as unknown as Date}
                  locale="en-US"
                  timeStyle="round"
                />
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-teal-500 md:text-4xl">
              {post?.title}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-sm leading-3 md:text-base md:leading-4">
              {post?.tags.map((tag, index) => (
                <Tag label={tag} key={index} />
              ))}
            </div>
            <p className="text-sm italic text-gray-600 md:text-base">
              {post?.introduction}
            </p>
          </div>
          <img
            src={post?.image}
            alt="post-cover"
            className="ml-5 mt-3 hidden aspect-square w-[250px] flex-shrink-0 rounded-xl object-cover lg:block"
          />
        </div>
        <div className="space-y-3 pt-3 text-sm md:text-base">
          {post?.steps.map((step, index) => {
            return (
              <div key={step.id} className="flex items-center gap-2">
                <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-teal-500 text-teal-500">
                  {index + 1}
                </span>
                <p>{step.description}</p>
              </div>
            );
          })}
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="mt-5  flex items-center justify-end gap-3 text-gray-400">
              <div className="flex items-center gap-1">
                <RiChat1Line className="md:text-2xl" />
                <span>{postComments.length}</span>
                <span className="hidden lg:block">comments</span>
              </div>
              <div className="flex items-center gap-1">
                <RiHeartLine className="md:text-2xl" />
                <span>{post?.likesCount}</span>
                <span className="hidden lg:block">likes</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* // todo need to be fixed  */}
            {currentUser && (
              <>
                <Button
                  loading={false}
                  // primary={currentUser?.likedPosts.includes(post?.id)}
                  // outline={!currentUser?.likedPosts.includes(post?.id)}
                  rounded
                >
                  <RiHeartLine className="text-2xl" />
                </Button>
                <Button
                  loading={false}
                  // primary={currentUser.bookmarkedPosts.includes(post?.id)}
                  // outline={!currentUser.bookmarkedPosts.includes(post?.id)}
                  rounded
                >
                  <RiBookmark2Line className="text-2xl" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* comments */}
      <div className="space-y-3">
        {postComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {/* comment input */}
      {currentUser && <CommentInput />}
    </div>
  );
}

type CommentItemProps = {
  comment: Comment;
};

function CommentItem({ comment }: CommentItemProps) {
  const [currentUser, loadingCurrentUser, errorCurrentUser] =
    useAuthState(auth);
  const { id, createdAt, commentContent, userId } = comment;
  const user = users.find((user) => user.id === userId);

  const [showOption, setShowOption] = useState(false);
  const handleShowOption = () => setShowOption((prev) => !prev);
  const [isEditMode, setIsEditMode] = useState(false);
  const handleEditMode = () => setIsEditMode((prev) => !prev);
  const [commentEditInput, setCommentEditInput] = useState(
    comment.commentContent
  );
  const commentEditRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(commentEditRef.current, commentEditInput, 3);

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
            <div className="mt-2 flex justify-end gap-2">
              <Button
                loading={false}
                danger
                rounded
                className="absolute left-4"
              >
                <RiDeleteBin6Line className="text-xl" />
              </Button>
              <Button
                loading={false}
                secondary
                rounded
                onClick={handleEditMode}
              >
                <RiArrowGoBackLine className="text-xl" />
              </Button>
              <Button loading={false} primary basic className="font-bold">
                <RiCheckLine className="text-xl" />
                Save
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-3 rounded-xl bg-white p-5 text-sm shadow-basic md:text-base">
          <Link to={`/users/${user?.id}`} className="flex-shrink-0">
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
                  date={createdAt}
                  locale="en-US"
                  timeStyle="round"
                />
              </span>
              {currentUser && (
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
                  <button className="flex items-center gap-2 rounded-lg p-2 text-red-400 hover:bg-gray-50">
                    <RiDeleteBin6Line className="text-xl" />
                    Delete
                  </button>
                </div>
              )}
            </div>
            <p className="mt-3 text-gray-900">{commentContent}</p>
          </div>
        </div>
      )}
    </>
  );
}

function CommentInput() {
  const [currentUser] = useAuthState(auth);
  const { data, error, isFetching } = useFetchUsersQuery();
  const defaultImage =
    'https://firebasestorage.googleapis.com/v0/b/howto-creative.appspot.com/o/logo_wbg.png?alt=media&token=9afe0ad1-011c-45a0-a983-14b002ee9668';
  const currentUserData = data?.find((user) => user.uid === currentUser?.uid);

  const [commentInput, setCommentInput] = useState('');
  const commentRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(commentRef.current, commentInput, 3);

  return (
    <div className="mt-3 flex gap-3 rounded-xl bg-white p-5 text-sm shadow-basic md:text-base">
      <Link to="#" className="flex-shrink-0">
        <img
          src={isFetching || error ? defaultImage : currentUserData?.avatar}
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
        <Button
          loading={false}
          primary
          basic
          className="mt-2 self-end font-bold"
        >
          <RiSendPlaneFill />
          Send
        </Button>
      </div>
    </div>
  );
}
