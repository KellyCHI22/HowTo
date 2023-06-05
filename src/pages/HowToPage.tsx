import { useState } from 'react';
import {
  RiArrowLeftLine,
  RiChat1Line,
  RiEdit2Line,
  RiHeartLine,
  RiBookmark2Line,
  RiMoreLine,
  RiDeleteBin6Line,
} from 'react-icons/ri';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '~/components/elements/Button';
import Tag from '~/components/elements/Tag';
import ReactTimeAgo from 'react-time-ago';
import { auth } from '~/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  useFetchUsersQuery,
  useFetchCommentsQuery,
  useFetchPostsQuery,
  useRemovePostMutation,
  useUpdateUserMutation,
  useUpdatePostMutation,
} from '~/store';
import Spinner from '~/components/elements/Spinner';
import clsx from 'clsx';
import CommentItem from '~/components/CommentItem';
import CommentInput from './CommentInput';

export default function HowToPage() {
  const [currentUser] = useAuthState(auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showOption, setShowOption] = useState(false);
  const handleShowOption = () => setShowOption((prev) => !prev);

  const {
    data: postsData,
    error: errorPostsData,
    isFetching: isFetchingPostsData,
  } = useFetchPostsQuery();
  const {
    data: usersData,
    error: errorUsersData,
    isFetching: isFetchingUsersData,
  } = useFetchUsersQuery();
  const {
    data: commentsData,
    error: errorCommentsData,
    isFetching: isFetchingCommentsData,
  } = useFetchCommentsQuery(id as string);

  const post = postsData?.find((post) => post.id === id);
  const user = usersData?.find((user) => user.uid === post?.authorId);
  const currentUserData = usersData?.find(
    (user) => user.uid === currentUser?.uid
  );

  const isLoading =
    isFetchingPostsData || isFetchingUsersData || isFetchingCommentsData;

  // * delete post
  const [removePost, removePostResults] = useRemovePostMutation();
  const handleDeletePost = async () => {
    if (post) {
      const result = confirm('Are you sure to delete this post?');
      if (result) {
        try {
          const success = await removePost(post);
          if (success) return navigate('/howtos');
        } catch {
          alert('something went wrong, please try again');
        }
      }
    }
  };

  // * add to/remove from bookmarks
  const [updateUser, updateUserResults] = useUpdateUserMutation();
  const handleBookmarks = async () => {
    if (currentUserData && post) {
      try {
        if (currentUserData.bookmarkedPosts.includes(post.id)) {
          const updatedBookmarkedPosts = currentUserData.bookmarkedPosts.filter(
            (bookmarkedPost) => bookmarkedPost !== post.id
          );
          const success = await updateUser([
            currentUserData,
            {
              bookmarkedPosts: updatedBookmarkedPosts,
            },
          ]);
          if (success) return;
        } else {
          const success = await updateUser([
            currentUserData,
            {
              bookmarkedPosts: [...currentUserData.bookmarkedPosts, post.id],
            },
          ]);
          if (success) return;
        }
      } catch {
        alert('something went wrong, please try again');
      }
    }
  };

  // * add/remove like
  const [updatePost, updatePostResults] = useUpdatePostMutation();
  const handleLike = async () => {
    if (currentUserData && post) {
      try {
        if (currentUserData.likedPosts.includes(post.id)) {
          await updatePost([post.id, { likesCount: post.likesCount - 1 }]);
          const updatedLikedPosts = currentUserData.likedPosts.filter(
            (likedPost) => likedPost !== post.id
          );
          const success = await updateUser([
            currentUserData,
            {
              likedPosts: updatedLikedPosts,
            },
          ]);
          if (success) return;
        } else {
          await updatePost([post.id, { likesCount: post.likesCount + 1 }]);
          const success = await updateUser([
            currentUserData,
            {
              likedPosts: [...currentUserData.likedPosts, post.id],
            },
          ]);
          if (success) return;
        }
      } catch {
        alert('something went wrong, please try again');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="my-5 grid h-96 w-full place-items-center rounded-lg bg-white md:my-12">
        <Spinner />
      </div>
    );
  }

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
          {currentUser && currentUser.uid === user?.uid && (
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
              <button
                className={clsx(
                  'flex items-center gap-2 rounded-lg p-2 text-red-400 hover:bg-gray-50',
                  {
                    'pointer-events-none opacity-80':
                      removePostResults.isLoading,
                  }
                )}
                onClick={handleDeletePost}
              >
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
                <Link to={`/users/${user?.uid}`}>
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
                  date={post?.createdAt as Date}
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
                <span>{commentsData?.length}</span>
                <span className="hidden lg:block">
                  {post && post?.commentsCount > 1 ? 'comments' : 'comment'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <RiHeartLine className="md:text-2xl" />
                <span>{post?.likesCount}</span>
                <span className="hidden lg:block">
                  {post && post?.likesCount > 1 ? 'likes' : 'like'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {currentUser && (
              <>
                <Button
                  loading={
                    updatePostResults.isLoading || updateUserResults.isLoading
                  }
                  primary={currentUserData?.likedPosts.includes(
                    post?.id as string
                  )}
                  outline={
                    !currentUserData?.likedPosts.includes(post?.id as string)
                  }
                  rounded
                  onClick={handleLike}
                >
                  <RiHeartLine className="text-2xl" />
                </Button>
                <Button
                  loading={updateUserResults.isLoading}
                  primary={currentUserData?.bookmarkedPosts.includes(
                    post?.id as string
                  )}
                  outline={
                    !currentUserData?.bookmarkedPosts.includes(
                      post?.id as string
                    )
                  }
                  rounded
                  onClick={handleBookmarks}
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
        {commentsData?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} post={post} />
        ))}
      </div>

      {/* comment input */}
      {currentUser && <CommentInput post={post} />}
    </div>
  );
}
