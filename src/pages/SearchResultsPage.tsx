import { useAuthState } from 'react-firebase-hooks/auth';
import { RiArrowLeftLine, RiEdit2Line } from 'react-icons/ri';
import { useParams, Link, useNavigate } from 'react-router-dom';
import HowToItem from '~/components/HowtoItem';
import { Button, Spinner } from '~/components/elements';
import { auth } from '~/firebase';
import { useFetchPostsQuery } from '~/store';

export default function SearchResultsPage() {
  const { query } = useParams();
  const navigate = useNavigate();
  const [currentUser] = useAuthState(auth);
  const {
    data: postsData,
    error: errorPostsData,
    isLoading: isLoadingPostsData,
  } = useFetchPostsQuery();
  const searchResults = postsData?.filter((post) => {
    if (query) {
      return (
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.map((tag) => tag.toLowerCase()).includes(query.toLowerCase())
      );
    } else {
      return null;
    }
  });

  if (errorPostsData) {
    console.log(errorPostsData);
  }

  return (
    <>
      <div className="my-5 md:my-12">
        {isLoadingPostsData || errorPostsData ? (
          <div className="my-5 grid h-96 w-full place-items-center rounded-lg bg-white md:my-12">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex">
                <button
                  className="hidden text-teal-500 md:block"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <RiArrowLeftLine className="text-2xl" />
                </button>
                <h2 className="ml-2 font-slabo text-2xl text-teal-500 md:text-3xl lg:ml-5">
                  Found {searchResults?.length}{' '}
                  {searchResults && searchResults?.length > 1
                    ? 'results'
                    : 'result'}{' '}
                  for "{query}"
                </h2>
              </div>
              <div className="flex gap-3">
                <Link to="/create">
                  <Button
                    loading={false}
                    basic
                    primary
                    className="hidden md:flex"
                  >
                    <RiEdit2Line className="text-2xl" />
                    Create<span className="hidden xl:inline">How To</span>
                  </Button>
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              {searchResults?.map((post) => (
                <HowToItem key={post.id} post={post} />
              ))}
            </div>
          </>
        )}

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
