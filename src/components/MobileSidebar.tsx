import {
  RiCloseFill,
  RiLightbulbFlashLine,
  RiBookmark2Line,
  RiAccountCircleLine,
  RiSettings5Line,
  RiEdit2Line,
  RiLogoutBoxRLine,
} from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import Button from './elements/Button';

type MobileSidebarProps = {
  showSidebar: boolean;
  toggleSidebar: () => void;
};

export default function MobileSidebar({
  showSidebar,
  toggleSidebar,
}: MobileSidebarProps) {
  return (
    <>
      {showSidebar && (
        <div
          className="z-35 fixed left-0 top-0 h-screen w-screen bg-black opacity-50"
          onClick={toggleSidebar}
        />
      )}
      <div
        className={clsx(
          'fixed left-0 top-0 z-40 h-screen w-64  overflow-y-auto bg-white p-5 font-bold transition-transform',
          { '-translate-x-full': !showSidebar }
        )}
      >
        <button type="button" className="text-teal-500" onClick={toggleSidebar}>
          <RiCloseFill className="text-3xl" />
        </button>

        <div className=" overflow-y-auto py-4 pt-0">
          <div className="flex flex-col items-center justify-center gap-2 py-5">
            <img
              src="https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              alt=""
              className="h-16 w-16 overflow-hidden rounded-full"
            />
            <p>Emily Chen</p>
          </div>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/howtos"
                className="flex items-center rounded-lg p-2 hover:bg-gray-100"
                onClick={toggleSidebar}
              >
                <RiLightbulbFlashLine className="text-2xl text-slate-400" />
                <span className="ml-3 flex-1 whitespace-nowrap">Explore</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/bookmarks"
                className="flex items-center rounded-lg p-2 hover:bg-gray-100 "
                onClick={toggleSidebar}
              >
                <RiBookmark2Line className="text-2xl text-slate-400" />
                <span className="ml-3 flex-1 whitespace-nowrap">Bookmarks</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="users/123"
                className="flex items-center rounded-lg p-2 hover:bg-gray-100 "
                onClick={toggleSidebar}
              >
                <RiAccountCircleLine className="text-2xl text-slate-400" />
                <span className="ml-3 flex-1 whitespace-nowrap">Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className="flex items-center rounded-lg p-2 hover:bg-gray-100 "
                onClick={toggleSidebar}
              >
                <RiSettings5Line className="text-2xl text-slate-400" />
                <span className="ml-3 flex-1 whitespace-nowrap">Settings</span>
              </NavLink>
            </li>
          </ul>
          <div className="mx-2 my-5">
            <Button
              loading={false}
              basic
              full
              primary
              className="py-2.5 font-normal"
            >
              <RiEdit2Line className="text-2xl" /> Create HowTo
            </Button>
          </div>
          <div className="absolute bottom-5">
            <NavLink
              to="#"
              className="flex items-center rounded-lg p-2 hover:bg-gray-100 "
            >
              <RiLogoutBoxRLine className="text-2xl text-slate-400" />
              <span className="ml-3 flex-1 whitespace-nowrap">Log out</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
