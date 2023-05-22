import { RiArrowDownSFill, RiEdit2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import HowToItem from '~/components/HowtoItem';
import Button from '~/components/elements/Button';

import { posts, currentUser } from '../dummyData';
import { useState } from 'react';
import SortOption from '~/components/SortOptions';

export default function BookmarksPage() {
  const bookmarkedPosts = posts.filter((post) => {
    return currentUser.bookmarkedPosts.includes(post.id);
  });
  const [renderedBookmarkedPosts, setRenderedBookmarkedPosts] =
    useState(bookmarkedPosts);
  const [sortOption, setSortOption] = useState('default');
  const handleSortOptionSelect = (option: string) => {
    setSortOption(option);
    if (option === 'latest') {
      const sortedPosts = [...bookmarkedPosts].sort(
        (a, b) => b.createdAt - a.createdAt
      );
      setRenderedBookmarkedPosts(sortedPosts);
    } else if (option === 'oldest') {
      const sortedPosts = [...bookmarkedPosts].sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setRenderedBookmarkedPosts(sortedPosts);
    } else if (option === 'popularity') {
      const sortedPosts = [...bookmarkedPosts].sort(
        (a, b) =>
          b.commentsCount + b.likesCount - a.commentsCount - a.likesCount
      );
      setRenderedBookmarkedPosts(sortedPosts);
    } else {
      setRenderedBookmarkedPosts(bookmarkedPosts);
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
              Create How To
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {renderedBookmarkedPosts.map((post) => (
          <HowToItem key={post.id} post={post} />
        ))}
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
