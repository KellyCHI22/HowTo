import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiEdit2Line } from 'react-icons/ri';

import { auth } from '~/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import Button from '~/components/elements/Button';
import SortOption from '~/components/SortOptions';
import PaginatedPosts from '~/components/PaginatedPosts';
import Spinner from '~/components/elements/Spinner';

import { useFetchPostsQuery, useFetchUsersQuery } from '~/store';
import { Post } from '~/store/apis/postsApi';

export default function BookmarksPage() {
  // ! need to refactor this part in every page, too messy
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
  const isLoading = isFetchingPostsData || isFetchingUsersData;
  const isError = errorPostsData || errorUsersData;
  const [currentUser] = useAuthState(auth);
  // ! refactor above
  const [bookmarkedPosts, setBookmarkPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (postsData && usersData) {
      const user = usersData?.find((user) => user.uid === currentUser?.uid);
      const bookmarkedPosts = postsData?.filter((post) => {
        return user?.bookmarkedPosts.includes(post.id);
      });
      setBookmarkPosts(bookmarkedPosts);
    }
  }, [postsData, usersData]);

  const handleSortOptionSelect = (option: string) => {
    if (bookmarkedPosts !== undefined) {
      if (option === 'latest') {
        const sortedPosts = [...bookmarkedPosts].sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
        setBookmarkPosts(sortedPosts);
      } else if (option === 'oldest') {
        const sortedPosts = [...bookmarkedPosts].sort(
          (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
        );
        setBookmarkPosts(sortedPosts);
      } else if (option === 'popularity') {
        const sortedPosts = [...bookmarkedPosts].sort(
          (a, b) =>
            b.commentsCount + b.likesCount - a.commentsCount - a.likesCount
        );
        setBookmarkPosts(sortedPosts);
      } else {
        setBookmarkPosts(bookmarkedPosts);
      }
    }
  };

  return (
    <div className="my-5 md:my-12">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="ml-2 font-slabo text-2xl text-teal-500 md:text-3xl">
          Bookmarks
        </h2>
        <div className="flex md:gap-3">
          <SortOption onSortOptionSelect={handleSortOptionSelect} />
          <Link to="/create">
            <Button loading={false} basic primary className="hidden md:flex">
              <RiEdit2Line className="text-2xl" />
              Create<span className="hidden xl:inline">How To</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {isLoading && (
          <div className="grid h-96 w-full place-items-center rounded-lg bg-white">
            <Spinner />
          </div>
        )}
        {(isError as ReactNode) && 'error loading bookmarked posts'}
        {bookmarkedPosts !== undefined && (
          <PaginatedPosts posts={bookmarkedPosts} postsPerPage={4} />
        )}
      </div>

      <Button
        loading={false}
        rounded
        primary
        className="fixed bottom-8 right-5 px-3 py-3 shadow-lg md:hidden"
      >
        <Link to="/create">
          <RiEdit2Line className="text-2xl" />
        </Link>
      </Button>
    </div>
  );
}
