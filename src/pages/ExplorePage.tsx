import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiEdit2Line } from 'react-icons/ri';

import Button from '~/components/elements/Button';
import SortOption from '~/components/SortOptions';
import PaginatedPosts from '~/components/PaginatedPosts';

import { auth } from '~/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useFetchPostsQuery } from '~/store';
import { Post } from '~/store/apis/postsApi';
import Spinner from '~/components/elements/Spinner';

export default function ExplorePage() {
  const [currentUser] = useAuthState(auth);
  const { data, error, isFetching } = useFetchPostsQuery();
  const [renderedPosts, setRenderedPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (data) {
      setRenderedPosts(data);
    }
  }, [data]);

  const handleSortOptionSelect = (option: string) => {
    if (data !== undefined) {
      if (option === 'latest') {
        const sortedPosts = [...data].sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
        setRenderedPosts(sortedPosts);
      } else if (option === 'oldest') {
        const sortedPosts = [...data].sort(
          (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
        );
        setRenderedPosts(sortedPosts);
      } else if (option === 'popularity') {
        const sortedPosts = [...data].sort(
          (a, b) =>
            b.commentsCount + b.likesCount - a.commentsCount - a.likesCount
        );
        setRenderedPosts(sortedPosts);
      } else {
        setRenderedPosts(renderedPosts);
      }
    }
  };
  return (
    <div className="my-5 md:my-12">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="ml-2 font-slabo text-2xl text-teal-500 md:text-3xl">
          Explore
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
        {isFetching && (
          <div className="grid h-96 w-full place-items-center rounded-lg bg-white">
            <Spinner />
          </div>
        )}
        {(error as ReactNode) && 'Error fetching posts'}
        {renderedPosts !== undefined && (
          <PaginatedPosts posts={renderedPosts} postsPerPage={4} />
        )}
      </div>

      {currentUser && (
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
      )}
    </div>
  );
}
