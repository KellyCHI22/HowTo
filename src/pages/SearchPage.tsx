import {
  RiArrowLeftLine,
  RiCloseFill,
  RiEdit2Line,
  RiSearchLine,
} from 'react-icons/ri';
import Tag from '~/components/elements/Tag';
import { ReactComponent as SearchIllustration } from '~/assets/illustration_search.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '~/components/elements/Button';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const tags = [
    'funny',
    'daily life',
    'cat',
    'animal',
    'plant',
    'cooking',
    'space',
    'school',
    'car',
    'traveling',
  ];
  return (
    <>
      <nav className="flex h-[4.5rem] items-center justify-between gap-2 bg-white px-4 py-1 shadow-basic">
        <button
          className="mr-1 text-slate-400"
          onClick={() => {
            navigate(-1);
          }}
        >
          <RiArrowLeftLine className="text-2xl" />
        </button>
        <div className="flex w-full items-center rounded-full bg-gray-200 px-2 focus-within:ring-2 focus-within:ring-teal-400">
          <button className="text-teal-500">
            <RiSearchLine className="text-2xl" />
          </button>

          <input
            type="text"
            id="searchQuery"
            value={searchQuery}
            placeholder="search keywords, tags..."
            className="flex-1 border-none bg-transparent placeholder-slate-400 focus:outline-none focus:ring-0"
            autoFocus
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="text-slate-400" onClick={() => setSearchQuery('')}>
            <RiCloseFill className="text-2xl " />
          </button>
        </div>
      </nav>
      <div className="m-5">
        <div className="mb-3">
          <h2 className="ml-2 font-slabo text-2xl text-teal-500">
            Latest tags
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 rounded-xl bg-white p-4 shadow-basic">
          {tags.map((tag, index) => {
            return <Tag key={index} label={tag} />;
          })}
        </div>
        <div className="mt-24 grid place-items-center">
          <SearchIllustration />
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
    </>
  );
}
