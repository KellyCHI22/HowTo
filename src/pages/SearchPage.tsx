import { RiEdit2Line } from 'react-icons/ri';
import Tag from '~/components/elements/Tag';
import { ReactComponent as SearchIllustration } from '~/assets/illustration_search.svg';
import { Link, useOutletContext } from 'react-router-dom';
import Button from '~/components/elements/Button';
import { ContextType } from '~/components/layouts/RootLayout';
import { auth } from '~/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function SearchPage() {
  const [currentUser] = useAuthState(auth);
  const { handleSearch } = useOutletContext<ContextType>();

  const tags = [
    'funny',
    'daily life',
    'cat',
    'animal',
    'plant',
    'space',
    'car',
  ];
  return (
    <>
      <div className="my-5 md:my-12">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="ml-2 font-slabo text-2xl text-teal-500 md:text-3xl">
            Latest tags
          </h2>
          <div className="flex gap-3">
            <Link to="/create">
              <Button loading={false} basic primary className="hidden md:flex">
                <RiEdit2Line className="text-2xl" />
                Create<span className="hidden xl:inline">How To</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 rounded-xl bg-white p-4 shadow-basic">
          {tags.map((tag, index) => {
            return (
              <button
                key={index}
                onClick={() => handleSearch(tag)}
                className="my-1"
              >
                <Tag label={tag} />
              </button>
            );
          })}
        </div>
        <div className="mt-24 grid place-items-center">
          <SearchIllustration />
        </div>

        {currentUser && (
          <Button
            loading={false}
            rounded
            primary
            className="fixed bottom-8 right-5 px-3 py-3 shadow-lg md:hidden"
          >
            <Link to="/create">
              <RiEdit2Line className="text-2xl " />
            </Link>
          </Button>
        )}
      </div>
    </>
  );
}
