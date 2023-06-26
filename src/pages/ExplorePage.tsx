import { ReactNode, useLayoutEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { RiEdit2Line } from 'react-icons/ri';

import { Button } from '~/components/elements';
import SortOption from '~/components/SortOptions';
import PaginatedPosts from '~/components/PaginatedPosts';
import { useFetchPostsQuery } from '~/store';
import { Post } from '~/store/apis/postsApi';
import { ContextType } from '~/components/layouts/RootLayout';
import { SkeletonHowtoItem } from '~/components/HowtoItem';
import getSortedPosts from '~/utils/getSortedPosts';

export default function ExplorePage() {
  const {
    currentExplorePage,
    handleCurrentExplorePageChange,
    exploreSortOption,
    handleExploreSortOptionSelect,
  } = useOutletContext<ContextType>();
  const { data, error, isLoading } = useFetchPostsQuery();
  const [renderedPosts, setRenderedPosts] = useState<Post[]>([]);

  useLayoutEffect(() => {
    if (data) {
      const sortedPosts = getSortedPosts(exploreSortOption, data);
      setRenderedPosts(sortedPosts);
    }
  }, [data, exploreSortOption]);

  return (
    <div className="my-5 md:my-12">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="ml-2 font-slabo text-2xl text-teal-500 md:text-3xl">
          Explore
        </h2>
        <div className="flex md:gap-3">
          <SortOption
            sortOption={exploreSortOption}
            onSortOptionSelect={handleExploreSortOptionSelect}
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
        {(error as ReactNode) && 'Error fetching posts'}
        {renderedPosts !== undefined && (
          <PaginatedPosts
            posts={renderedPosts}
            postsPerPage={4}
            currentPage={currentExplorePage}
            handleCurrentPageChange={handleCurrentExplorePageChange}
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
