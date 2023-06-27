import { useEffect, useState } from 'react';
import { Link, Outlet, useOutletContext } from 'react-router-dom';
import {
  RiLightbulbFlashLine,
  RiLightbulbFlashFill,
  RiBookmark2Line,
  RiBookmark2Fill,
  RiAccountCircleLine,
  RiAccountCircleFill,
  RiSettings5Line,
  RiSettings5Fill,
  RiHeartLine,
  RiChat1Line,
  RiLock2Fill,
} from 'react-icons/ri';
import { AppNavLink } from '../MobileSidebar';
import { ContextType } from './RootLayout';
import { auth } from '~/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  useFetchCommentsQuery,
  useFetchPostsQuery,
  useFetchUsersQuery,
} from '~/store';
import { Spinner } from '../elements';
import { Post } from '~/store/apis/postsApi';
import { User } from '~/store/apis/usersApi';
import { getTopUsers } from '~/utils';

export default function HowToLayout() {
  const context = useOutletContext<ContextType>();

  // * explore page currentPage & sortOption
  const [currentExplorePage, setCurrentExplorePage] = useState(0);
  const handleCurrentExplorePageChange = (page: number) =>
    setCurrentExplorePage(page);
  const [exploreSortOption, setExploreSortOption] = useState('latest');
  const handleExploreSortOptionSelect = (option: string) => {
    setExploreSortOption(option);
    setCurrentExplorePage(0);
  };

  // * bookmarks page currentPage & sortOption
  const [currentBookmarksPage, setCurrentBookmarksPage] = useState(0);
  const handleCurrentBookmarksPageChange = (page: number) =>
    setCurrentBookmarksPage(page);
  const [bookmarksSortOption, setBookmarksSortOption] = useState('');
  const handleBookmarksSortOptionSelect = (option: string) => {
    setBookmarksSortOption(option);
    setCurrentBookmarksPage(0);
  };

  return (
    <>
      <div className="container flex items-start md:space-x-5">
        <aside className="hidden space-y-5 md:my-12 md:block">
          <AsideNavLinks />
          <AsideTopUsers />
          <AsideLatestHowTo />
        </aside>
        <main className="flex-1">
          <Outlet
            context={{
              ...context,
              currentExplorePage,
              handleCurrentExplorePageChange,
              exploreSortOption,
              handleExploreSortOptionSelect,
              currentBookmarksPage,
              handleCurrentBookmarksPageChange,
              bookmarksSortOption,
              handleBookmarksSortOptionSelect,
            }}
          />
        </main>
      </div>
    </>
  );
}

function AsideNavLinks() {
  const [currentUser] = useAuthState(auth);
  return (
    <div className="w-64 rounded-xl bg-white p-3 shadow-basic">
      <ul className="relative space-y-2 font-bold">
        {currentUser === null && (
          <>
            <div className="absolute inset-0 top-0 bg-white opacity-90 blur"></div>
            <div className="pointer-events-none absolute inset-0 top-0 grid place-items-center">
              <div className="text-center">
                <RiLock2Fill className="w-full text-4xl text-teal-500" />
                <p>
                  <span className="text-teal-500">Log in</span> to get the full
                  experience of HowTo
                </p>
              </div>
            </div>
          </>
        )}

        <li>
          <AppNavLink
            to="/howtos"
            label="Explore"
            defaultIcon={<RiLightbulbFlashLine />}
            activeIcon={<RiLightbulbFlashFill />}
          />
        </li>
        <li>
          <AppNavLink
            to="/bookmarks"
            label="Bookmarks"
            defaultIcon={<RiBookmark2Line />}
            activeIcon={<RiBookmark2Fill />}
          />
        </li>
        <li>
          <AppNavLink
            to={`/users/${currentUser?.uid}`}
            label="Profile"
            defaultIcon={<RiAccountCircleLine />}
            activeIcon={<RiAccountCircleFill />}
          />
        </li>
        <li>
          <AppNavLink
            to="/settings"
            label="Settings"
            defaultIcon={<RiSettings5Line />}
            activeIcon={<RiSettings5Fill />}
          />
        </li>
      </ul>
    </div>
  );
}

function AsideLatestHowTo() {
  const {
    data: postsData,
    error: errorPostsData,
    isLoading: isLoadingPostsData,
  } = useFetchPostsQuery();

  let latestHowTos;
  if (postsData) {
    latestHowTos = [...postsData]
      ?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 3);
  }

  if (errorPostsData) {
    console.log(errorPostsData);
  }

  return (
    <div className="w-64 rounded-xl bg-white shadow-basic">
      <h3 className="border-b border-b-gray-200 px-5 py-3 text-lg font-bold text-teal-500">
        Latest How To
      </h3>
      {isLoadingPostsData || errorPostsData ? (
        <div className="grid h-72 place-items-center">
          <Spinner />
        </div>
      ) : (
        <div className="py-3">
          {latestHowTos?.map((howto) => (
            <LatestHowToItem howto={howto} key={howto.id} />
          ))}
        </div>
      )}
    </div>
  );
}

function LatestHowToItem({ howto }: { howto: Post }) {
  const {
    data: commentsData,
    error: errorCommentsData,
    isLoading: isLoadingCommentsData,
  } = useFetchCommentsQuery(howto.id as string);

  if (isLoadingCommentsData || errorCommentsData) {
    return <div className="h-[5.75rem] bg-white" />;
  }

  if (errorCommentsData) {
    console.log(errorCommentsData);
  }

  return (
    <Link to={`/howtos/${howto.id}`} className="block px-3">
      <div className="rounded-lg p-2 hover:bg-gray-100">
        <h4 className="mb-1 font-bold">{howto.title}</h4>
        <div className="flex items-center justify-start gap-3 text-gray-400">
          <div className="flex items-center gap-1">
            <RiChat1Line />
            {commentsData?.length}
          </div>
          <div className="flex items-center gap-1">
            <RiHeartLine />
            {howto.likesCount}
          </div>
        </div>
      </div>
    </Link>
  );
}

function AsideTopUsers() {
  const {
    data: postsData,
    error: errorPostsData,
    isLoading: isLoadingPostsData,
  } = useFetchPostsQuery();
  const {
    data: usersData,
    error: errorUsersData,
    isLoading: isLoadingUsersData,
  } = useFetchUsersQuery();

  const isLoading = isLoadingPostsData || isLoadingUsersData;
  const isError = errorPostsData || errorUsersData;
  const [topUsers, setTopUsers] = useState<User[]>([]);
  useEffect(() => {
    if (postsData && usersData) {
      const topThreeUsers = getTopUsers(postsData, usersData, 3);
      setTopUsers(topThreeUsers);
    }
  }, [postsData, usersData]);

  if (isError) {
    console.log(errorPostsData || errorUsersData);
  }

  return (
    <>
      {isLoading || isError ? (
        <div className="grid h-72 place-items-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-64 rounded-xl bg-white shadow-basic">
          <h3 className="border-b border-b-gray-200 px-5 py-3 text-lg font-bold text-teal-500">
            Top Users
          </h3>
          <div className="space-y-1 py-3">
            {topUsers.map((user) => (
              <AsideTopUserItem user={user} key={user.uid} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function AsideTopUserItem({ user }: { user: User }) {
  return (
    <Link to={`/users/${user?.uid}`}>
      <div className="mx-3 flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-gray-100">
        <img
          src={user.avatar}
          alt="user-avatar"
          className="aspect-square h-9 w-9 rounded-full object-cover"
        />
        <div>
          <p className="font-bold">{user.name}</p>
        </div>
      </div>
    </Link>
  );
}
