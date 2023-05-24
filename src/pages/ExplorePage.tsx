import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiEdit2Line } from 'react-icons/ri';

import Button from '~/components/elements/Button';
import SortOption from '~/components/SortOptions';
import PaginatedPosts from '~/components/PaginatedPosts';

import { posts } from '../dummyData';

export default function ExplorePage() {
  const [renderedPosts, setRenderedPosts] = useState(posts);
  const [sortOption, setSortOption] = useState('default');
  const handleSortOptionSelect = (option: string) => {
    setSortOption(option);
    if (option === 'latest') {
      const sortedPosts = [...posts].sort((a, b) => b.createdAt - a.createdAt);
      setRenderedPosts(sortedPosts);
    } else if (option === 'oldest') {
      const sortedPosts = [...posts].sort((a, b) => a.createdAt - b.createdAt);
      setRenderedPosts(sortedPosts);
    } else if (option === 'popularity') {
      const sortedPosts = [...posts].sort(
        (a, b) =>
          b.commentsCount + b.likesCount - a.commentsCount - a.likesCount
      );
      setRenderedPosts(sortedPosts);
    } else {
      setRenderedPosts(posts);
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
        <PaginatedPosts posts={renderedPosts} postsPerPage={4} />
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
