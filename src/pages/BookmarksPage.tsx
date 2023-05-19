import { RiArrowDownSFill, RiEdit2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import HowToItem from '~/components/HowtoItem';
import Button from '~/components/elements/Button';

import { posts, currentUser } from '../dummyData';

export default function BookmarksPage() {
  const bookmarkedPosts = posts.filter((post) => {
    return currentUser.bookmarkedPosts.includes(post.id);
  });
  return (
    <div className="my-5 md:my-12">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="ml-2 font-slabo text-2xl text-teal-500 md:text-3xl">
          Bookmarks
        </h2>
        <div className="flex gap-3">
          <button className="flex items-center rounded-full border border-teal-500 px-3 py-2 text-teal-500">
            sort by
            <RiArrowDownSFill className="text-2xl" />
          </button>
          <Link to="/create">
            <Button loading={false} basic primary className="hidden md:flex">
              <RiEdit2Line className="text-2xl" />
              Create How To
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {bookmarkedPosts.map((post) => (
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
