import { ReactNode, useLayoutEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { RiEdit2Line } from 'react-icons/ri';

import { auth } from '~/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Button } from '~/components/elements';
import SortOption from '~/components/SortOptions';
import PaginatedPosts from '~/components/PaginatedPosts';

import { useFetchPostsQuery, useFetchUsersQuery } from '~/store';
import { Post } from '~/store/apis/postsApi';
import { ContextType } from '~/components/layouts/RootLayout';
import { SkeletonHowtoItem } from '~/components/HowtoItem';
import getSortedPosts from '~/utils/getSortedPosts';

export default function BookmarksPage() {
  const {
    currentBookmarksPage,
    handleCurrentBookmarksPageChange,
    bookmarksSortOption,
    handleBookmarksSortOptionSelect,
  } = useOutletContext<ContextType>();

  const {
    data: postsData,
    error: errorPostsData,
    isLoading: isLoadingPostsData,
  } = useFetchPostsQuery();
  const {
    data: usersData,
    error: errorUsersData,
    isLoading: isLoadingUsersData,
  } = useFetchUsersQuery();
  const isLoading = isLoadingPostsData || isLoadingUsersData;
  const isError = errorPostsData || errorUsersData;
  const [currentUser] = useAuthState(auth);

  const [bookmarkedPosts, setBookmarkPosts] = useState<Post[]>([]);

  useLayoutEffect(() => {
    if (postsData && usersData) {
      const user = usersData?.find((user) => user.uid === currentUser?.uid);
      const bookmarkedPosts = postsData?.filter((post) => {
        return user?.bookmarkedPosts.includes(post.id);
      });
      const sortedPosts = getSortedPosts(bookmarksSortOption, bookmarkedPosts);
      setBookmarkPosts(sortedPosts);
    }
  }, [postsData, usersData, bookmarksSortOption]);

  return (
    <div className="my-5 md:my-12">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="ml-2 font-slabo text-2xl text-teal-500 md:text-3xl">
          Bookmarks
        </h2>
        <div className="flex md:gap-3">
          <SortOption
            sortOption={bookmarksSortOption}
            onSortOptionSelect={handleBookmarksSortOptionSelect}
          />
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
          <>
            <SkeletonHowtoItem />
            <SkeletonHowtoItem />
            <SkeletonHowtoItem />
            <SkeletonHowtoItem />
          </>
        )}
        {(isError as ReactNode) && 'error loading bookmarked posts'}
        {bookmarkedPosts !== undefined && (
          <PaginatedPosts
            currentPage={currentBookmarksPage}
            handleCurrentPageChange={handleCurrentBookmarksPageChange}
            posts={bookmarkedPosts}
            postsPerPage={4}
          />
        )}
      </div>
      <Link to="/create">
        <Button
          loading={false}
          rounded
          primary
          className="fixed bottom-8 right-5 px-3 py-3 shadow-lg md:hidden"
        >
          <RiEdit2Line className="text-2xl" />
        </Button>
      </Link>
    </div>
  );
}
