import { RiCloseFill, RiSearchLine } from 'react-icons/ri';
import Tag from '~/components/elements/Tag';
import { ReactComponent as SearchIllustration } from '~/assets/illustration_search.svg';
import { Link, useNavigate } from 'react-router-dom';

export default function SearchPage() {
  const navigate = useNavigate();
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
      <nav className="flex h-[4.5rem] items-center justify-between gap-2 px-4 py-1 shadow-basic">
        <div className="flex w-full items-center rounded-full bg-gray-200 px-2 focus-within:ring-2 focus-within:ring-teal-400">
          <button className="text-teal-500">
            <RiSearchLine className="text-2xl" />
          </button>

          <input
            type="text"
            className="flex-1 border-none bg-transparent placeholder-slate-400 focus:outline-none focus:ring-0"
            placeholder="search keywords, tags..."
            autoFocus
          />
          <button
            className="text-slate-400"
            onClick={() => {
              navigate(-1);
            }}
          >
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
      </div>
    </>
  );
}
