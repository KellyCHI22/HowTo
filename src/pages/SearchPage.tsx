import { RiEdit2Line } from 'react-icons/ri';
import Tag from '~/components/elements/Tag';
import { ReactComponent as SearchIllustration } from '~/assets/illustration_search.svg';
import { Link, useOutletContext } from 'react-router-dom';
import Button from '~/components/elements/Button';
import HowToItem from '~/components/HowtoItem';
import { ContextType } from '~/components/layouts/RootLayout';

export default function SearchPage() {
  const { isSearching, searchResults, handleSearch } =
    useOutletContext<ContextType>();

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
            {isSearching
              ? `Found ${searchResults?.results?.length} result for "${searchResults.query}"`
              : 'Latest tags'}
          </h2>
          <div className="flex gap-3">
            <Link to="/create">
              <Button loading={false} basic primary className="hidden md:flex">
                <RiEdit2Line className="text-2xl" />
                Create How To
              </Button>
            </Link>
          </div>
        </div>

        {isSearching ? (
          <>
            <div className="space-y-3">
              {searchResults?.results?.map((post) => (
                <HowToItem key={post.id} post={post} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 rounded-xl bg-white p-4 shadow-basic">
              {tags.map((tag, index) => {
                return (
                  <button onClick={() => handleSearch(tag)}>
                    <Tag key={index} label={tag} />
                  </button>
                );
              })}
            </div>
            <div className="mt-24 grid place-items-center">
              <SearchIllustration />
            </div>
          </>
        )}

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
      </div>
    </>
  );
}
