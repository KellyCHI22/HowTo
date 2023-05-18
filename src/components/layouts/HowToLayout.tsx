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
} from 'react-icons/ri';
import { Outlet, useOutletContext } from 'react-router-dom';
import { AppNavLink } from '../MobileSidebar';
import { ContextType } from './RootLayout';

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
  return (
    <div className="w-64 rounded-xl bg-white p-3 shadow-basic">
      <ul className="space-y-2 font-bold">
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
            to="/users/123"
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
  return (
    <div className="w-64 rounded-xl bg-white shadow-basic">
      <h3 className="border-b border-b-gray-200 px-5 py-3 text-lg font-bold text-teal-500">
        Latest How To
      </h3>
      <div>
        <LatestHowToItem />
        <LatestHowToItem />
        <LatestHowToItem />
      </div>
    </div>
  );
}

function LatestHowToItem() {
  return (
    <div className="px-5 py-3">
      <h4 className="mb-1 font-bold">How to turn your cat into a DJ?</h4>
      <div className="flex items-center justify-start gap-3 text-gray-400">
        <div className="flex items-center gap-1">
          <RiChat1Line />5
        </div>
        <div className="flex items-center gap-1">
          <RiHeartLine />6
        </div>
      </div>
    </div>
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
