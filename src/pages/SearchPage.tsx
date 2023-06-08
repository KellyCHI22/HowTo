import { RiEdit2Line } from 'react-icons/ri';
import Tag from '~/components/elements/Tag';
import { ReactComponent as SearchIllustration } from '~/assets/illustration_search.svg';
import { Link } from 'react-router-dom';
import Button from '~/components/elements/Button';
import { auth } from '~/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useFetchPostsQuery } from '~/store';
import Spinner from '~/components/elements/Spinner';

export default function SearchPage() {
  const [currentUser] = useAuthState(auth);
  const {
    data: postsData,
    error: errorPostsData,
    isFetching: isFetchingPostsData,
  } = useFetchPostsQuery();
  let renderedTags;

  if (postsData) {
    const sortedPosts = [...postsData].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
    const tags = Array.from(
      new Set(
        sortedPosts
          ?.map((post) => [...post.tags])
          .join()
          .split(',')
      )
    );
    renderedTags = tags.splice(0, 10);
  }

  if (errorPostsData) {
    console.log(errorPostsData);
  }

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

        {isFetchingPostsData || errorPostsData ? (
          <div className="grid h-96 w-full place-items-center">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 rounded-xl bg-white p-4 shadow-basic">
              {renderedTags?.map((tag, index) => {
                return <Tag label={tag} key={index} />;
              })}
            </div>
            <div className="mt-24 grid place-items-center">
              <SearchIllustration />
            </div>
          </>
        )}

        <Link to="/create">
          <Button
            loading={false}
            rounded
            primary
            className="fixed bottom-8 right-5 px-3 py-3 shadow-lg md:hidden"
          >
            <RiEdit2Line className="text-2xl " />
          </Button>
        </Link>
      </div>
    </>
  );
}
