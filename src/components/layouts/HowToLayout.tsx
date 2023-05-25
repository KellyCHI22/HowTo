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
import { Link, Outlet, useOutletContext } from 'react-router-dom';
import { AppNavLink } from '../MobileSidebar';
import { ContextType } from './RootLayout';

import { Post, currentUser, posts } from '~/dummyData';
import { auth } from '~/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function HowToLayout() {
  const context = useOutletContext<ContextType>();
  return (
    <>
      <div className="container flex items-start md:space-x-5">
        <aside className="hidden space-y-5 md:my-12 md:block">
          <AsideNavLinks />
          <AsideTopUsers />
          <AsideLatestHowTo />
        </aside>
        <main className="flex-1">
          <Outlet context={context} />
        </main>
      </div>
    </>
  );
}

function AsideNavLinks() {
  const [currentUser, loadingCurrentUser, errorCurrentUser] =
    useAuthState(auth);
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
  const latestHowTos = posts
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 3);
  return (
    <div className="w-64 rounded-xl bg-white shadow-basic">
      <h3 className="border-b border-b-gray-200 px-5 py-3 text-lg font-bold text-teal-500">
        Latest How To
      </h3>
      <div className="py-3">
        {latestHowTos.map((howto) => (
          <LatestHowToItem howto={howto} key={howto.id} />
        ))}
      </div>
    </div>
  );
}

function LatestHowToItem({ howto }: { howto: Post }) {
  return (
    <Link to={`/howtos/${howto.id}`} className="block px-3">
      <div className="rounded-lg p-2 hover:bg-gray-100">
        <h4 className="mb-1 font-bold">{howto.title}</h4>
        <div className="flex items-center justify-start gap-3 text-gray-400">
          <div className="flex items-center gap-1">
            <RiChat1Line />
            {howto.commentsCount}
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
  return (
    <div className="w-64 rounded-xl bg-white shadow-basic">
      <h3 className="border-b border-b-gray-200 px-5 py-3 text-lg font-bold text-teal-500">
        Top Users
      </h3>
      <div>
        <AsideTopUserItem />
        <AsideTopUserItem />
        <AsideTopUserItem />
      </div>
    </div>
  );
}

function AsideTopUserItem() {
  return (
    <div className="flex items-center gap-2 px-5 py-3">
      <img
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
        alt=""
        className="aspect-square h-9 w-9 rounded-full object-cover"
      />
      <div>
        <p className="font-bold">Betty Liang</p>
      </div>
    </div>
  );
}
