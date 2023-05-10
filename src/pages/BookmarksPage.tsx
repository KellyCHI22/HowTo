import { RiArrowDownSFill, RiEdit2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import HowToItem from '~/components/HowtoItem';
import Button from '~/components/elements/Button';

export default function BookmarksPage() {
  return (
    <div className="m-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="ml-2 font-slabo text-2xl text-teal-500">Bookmarks</h2>
        <button className="flex items-center rounded-full border border-teal-500 px-3 py-2 text-teal-500">
          sort by
          <RiArrowDownSFill className="text-2xl" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <HowToItem />
        <HowToItem />
        <HowToItem />
        <HowToItem />
        <HowToItem />
      </div>

      <Button
        loading={false}
        rounded
        primary
        className="fixed bottom-8 right-5 shadow-lg"
      >
        <Link to="/create">
          <RiEdit2Line className="text-2xl" />
        </Link>
      </Button>
    </div>
  );
}
