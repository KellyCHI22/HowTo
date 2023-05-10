import { Link } from 'react-router-dom';
import { RiArrowDownSFill, RiEdit2Line } from 'react-icons/ri';
import Button from '~/components/elements/Button';
import HowToItem from '~/components/HowtoItem';

export default function ExplorePage() {
  return (
    <div className="m-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="ml-2 font-slabo text-2xl text-teal-500">Explore</h2>
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
        className="fixed bottom-8 right-5 px-3 py-3 shadow-lg"
      >
        <Link to="/create">
          <RiEdit2Line className="text-2xl" />
        </Link>
      </Button>
    </div>
  );
}
