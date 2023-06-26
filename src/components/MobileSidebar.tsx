import {
  RiCloseFill,
  RiLightbulbFlashLine,
  RiLightbulbFlashFill,
  RiBookmark2Line,
  RiBookmark2Fill,
  RiAccountCircleLine,
  RiAccountCircleFill,
  RiSettings5Line,
  RiSettings5Fill,
  RiEdit2Line,
  RiLogoutBoxRLine,
  RiArrowRightLine,
} from 'react-icons/ri';
import { Link, NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Button } from './elements';
import { auth } from '~/firebase';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { useFetchUsersQuery } from '~/store/apis/usersApi';

type MobileSidebarProps = {
  showSidebar: boolean;
  toggleSidebar: () => void;
  toggleLoginModal: () => void;
  toggleSignupModal: () => void;
};

export default function MobileSidebar({
  showSidebar,
  toggleSidebar,
  toggleLoginModal,
  toggleSignupModal,
}: MobileSidebarProps) {
  const [currentUser] = useAuthState(auth);
  const [signOut, loadingSignOut, errorSignOut] = useSignOut(auth);
  const handleLogOut = async () => {
    const success = await signOut();
    if (success) {
      alert('You are signed out');
    }
  };

  if (errorSignOut) {
    alert('Something went wrong when signing out, please try again');
  }

  return (
    <>
      {showSidebar && (
        <div
          className="fixed left-0 top-0 z-40 h-screen w-screen bg-black opacity-50"
          onClick={toggleSidebar}
        />
      )}
      <div
        className={clsx(
          'fixed left-0 top-0 z-50 h-screen w-64  overflow-y-auto bg-white p-5 font-bold transition-transform',
          { '-translate-x-full': !showSidebar }
        )}
      >
        <button type="button" className="text-teal-500" onClick={toggleSidebar}>
          <RiCloseFill className="text-3xl" />
        </button>

        <div className=" overflow-y-auto py-4 pt-0">
          <div className="flex flex-col items-center justify-center gap-2 py-5">
            <UserAvatarAndName toggleSidebar={toggleSidebar} />
          </div>
          {currentUser ? (
            <>
              <ul className="space-y-2">
                <li>
                  <AppNavLink
                    to="/howtos"
                    label="Explore"
                    defaultIcon={<RiLightbulbFlashLine />}
                    activeIcon={<RiLightbulbFlashFill />}
                    onClick={toggleSidebar}
                  />
                </li>
                <li>
                  <AppNavLink
                    to="/bookmarks"
                    label="Bookmarks"
                    defaultIcon={<RiBookmark2Line />}
                    activeIcon={<RiBookmark2Fill />}
                    onClick={toggleSidebar}
                  />
                </li>
                <li>
                  <AppNavLink
                    to={`/users/${currentUser?.uid}`}
                    label="Profile"
                    defaultIcon={<RiAccountCircleLine />}
                    activeIcon={<RiAccountCircleFill />}
                    onClick={toggleSidebar}
                  />
                </li>
                <li>
                  <AppNavLink
                    to="/settings"
                    label="Settings"
                    defaultIcon={<RiSettings5Line />}
                    activeIcon={<RiSettings5Fill />}
                    onClick={toggleSidebar}
                  />
                </li>
              </ul>
              <div className="mx-2 my-5">
                <Link to="/create">
                  <Button
                    loading={false}
                    basic
                    full
                    primary
                    className="py-2.5 font-normal"
                    onClick={toggleSidebar}
                  >
                    <RiEdit2Line className="text-2xl" /> Create HowTo
                  </Button>
                </Link>
              </div>
              <div className="absolute bottom-5">
                <button
                  onClick={handleLogOut}
                  className={clsx(
                    'flex items-center rounded-lg p-2 hover:bg-gray-100',
                    { 'pointer-events-none': loadingSignOut }
                  )}
                >
                  <RiLogoutBoxRLine className="text-2xl text-gray-400" />
                  <span className="ml-3 flex-1 whitespace-nowrap">Log out</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mx-2 space-y-3">
                <Button
                  loading={false}
                  basic
                  full
                  outline
                  className="py-2.5 font-normal"
                  onClick={() => {
                    toggleSidebar();
                    toggleLoginModal();
                  }}
                >
                  Log in
                </Button>
                <Button
                  loading={false}
                  basic
                  full
                  primary
                  className="py-2.5 font-bold"
                  onClick={() => {
                    toggleSidebar();
                    toggleSignupModal();
                  }}
                >
                  Get started
                  <RiArrowRightLine className="text-xl" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

type AppNavLinkProps = {
  to: string;
  label: string;
  defaultIcon: JSX.Element;
  activeIcon: JSX.Element;
  onClick?: () => void;
};

export function AppNavLink({
  to,
  label,
  defaultIcon,
  activeIcon,
  onClick,
}: AppNavLinkProps) {
  const { pathname } = useLocation();
  const isActive = pathname.includes(to);

  return (
    <NavLink
      to={to}
      className={clsx('flex items-center rounded-lg p-2 hover:bg-gray-100', {
        'text-teal-500': isActive,
      })}
      onClick={onClick}
    >
      <span
        className={clsx('text-2xl text-slate-400', {
          'text-teal-500': isActive,
        })}
      >
        {isActive ? activeIcon : defaultIcon}
      </span>
      <span className="ml-3 flex-1 whitespace-nowrap">{label}</span>
    </NavLink>
  );
}

function UserAvatarAndName({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [currentUser] = useAuthState(auth);
  const { data, error, isLoading } = useFetchUsersQuery();
  const defaultImage =
    'https://firebasestorage.googleapis.com/v0/b/howto-creative.appspot.com/o/logo_wbg.png?alt=media&token=9afe0ad1-011c-45a0-a983-14b002ee9668';
  const currentUserData = data?.find((user) => user.uid === currentUser?.uid);

  return (
    <>
      <Link to={`/users/${currentUser?.uid}`} onClick={toggleSidebar}>
        <img
          src={
            !currentUser || isLoading || error
              ? defaultImage
              : currentUserData?.avatar
          }
          alt="user-avatar"
          className="h-16 w-16 overflow-hidden rounded-full object-cover"
        />
      </Link>
      <p>
        {!currentUser || isLoading || error
          ? 'Unknown Capybara'
          : currentUserData?.name}
      </p>
    </>
  );
}
