import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Button } from '../elements/';
import MobileSidebar from '../MobileSidebar';
import {
  RiMenuFill,
  RiSearchLine,
  RiArrowRightLine,
  RiCloseFill,
  RiArrowLeftLine,
  RiLogoutBoxRLine,
} from 'react-icons/ri';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import { ScrollToTop } from '~/utils';
import { auth } from '~/firebase';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { useFetchUsersQuery } from '~/store';

export type ContextType = {
  handleToggleLoginModal: () => void;
  handleToggleSignupModal: () => void;
  currentExplorePage: number;
  handleCurrentExplorePageChange: (page: number) => void;
  exploreSortOption: string;
  handleExploreSortOptionSelect: (option: string) => void;
  currentBookmarksPage: number;
  handleCurrentBookmarksPageChange: (page: number) => void;
  bookmarksSortOption: string;
  handleBookmarksSortOptionSelect: (option: string) => void;
};

export default function RootLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const [currentUser] = useAuthState(auth);
  const [signOut, loadingSignOut] = useSignOut(auth);

  const [showSidebar, setShowSidebar] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };
  const handleToggleLoginModal = () => {
    setShowLoginModal((prev) => !prev);
  };
  const handleToggleSignupModal = () => {
    setShowSignupModal((prev) => !prev);
  };

  const handleLogOut = async () => {
    const success = await signOut();
    if (success) {
      alert('You are signed out');
    }
  };

  const handleSearch = (query: string) => {
    if (query === '') return;
    navigate(`/search/${query}`);
  };

  // forbid scrolling on desktop when login or signup modal is shown
  useEffect(() => {
    if (isMobile) return;
    if (showLoginModal || showSignupModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showLoginModal, showSignupModal]);

  useEffect(() => {
    if (!pathname.includes('search')) {
      setSearchQuery('');
    }
  }, [pathname]);

  return (
    <>
      <ScrollToTop />
      <nav className="fixed top-0 z-10 h-[4.5rem] w-full bg-white shadow-basic">
        <div className="container flex h-full items-center justify-between">
          {pathname.includes('search') && isMobile ? (
            <>
              <button
                className="mr-3 text-gray-400 md:absolute md:-left-9 md:top-2"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <RiArrowLeftLine className="text-2xl" />
              </button>
              <div className="flex w-full items-center rounded-full bg-gray-200 px-2 focus-within:ring-2 focus-within:ring-teal-400">
                <button
                  className="text-teal-500"
                  onClick={() => handleSearch(searchQuery)}
                >
                  <RiSearchLine className="text-2xl" />
                </button>

                <input
                  size={18}
                  type="text"
                  id="searchQuery"
                  value={searchQuery}
                  placeholder="search keywords, tags..."
                  className="flex-1 border-none bg-transparent placeholder-slate-400 focus:outline-none focus:ring-0"
                  autoFocus
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(searchQuery);
                    }
                  }}
                />
                <button
                  className="text-gray-400"
                  onClick={() => setSearchQuery('')}
                >
                  <RiCloseFill className="text-2xl " />
                </button>
              </div>
            </>
          ) : (
            <>
              <button onClick={handleToggleSidebar} className="md:hidden">
                <RiMenuFill className="text-2xl" />
              </button>

              <Link to="/" className="flex items-center">
                <Logo className="h-16 w-16" />
                <h1 className="font-slabo text-2xl text-teal-500">HowTo...</h1>
              </Link>

              <Link
                to={pathname.includes('search') ? '#' : '/search'}
                className="md:w-2/5"
              >
                <RiSearchLine className="text-2xl md:hidden" />
                <div className="hidden md:block">
                  <div className="flex w-full items-center rounded-full bg-gray-200 px-2 focus-within:ring-2 focus-within:ring-teal-400">
                    <button
                      className="text-teal-500"
                      onClick={() => handleSearch(searchQuery)}
                    >
                      <RiSearchLine className="text-2xl" />
                    </button>

                    <input
                      type="text"
                      id="searchQuery"
                      value={searchQuery}
                      placeholder="search keywords, tags..."
                      className="flex-1 border-none bg-transparent placeholder-slate-400 focus:outline-none focus:ring-0"
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          return handleSearch(searchQuery);
                        }
                      }}
                    />
                    <button
                      className="text-gray-400"
                      onClick={() => setSearchQuery('')}
                    >
                      <RiCloseFill className="text-2xl " />
                    </button>
                  </div>
                </div>
              </Link>
              <div className="hidden md:flex md:items-center md:gap-2">
                {currentUser ? (
                  <>
                    <Button
                      loading={loadingSignOut}
                      basic
                      outline
                      onClick={handleLogOut}
                    >
                      <RiLogoutBoxRLine />
                      Log out
                    </Button>
                    <UserAvatar />
                  </>
                ) : (
                  <>
                    <Button
                      loading={false}
                      basic
                      outline
                      onClick={handleToggleLoginModal}
                    >
                      Log in
                    </Button>
                    <Button
                      loading={false}
                      basic
                      primary
                      onClick={handleToggleSignupModal}
                      className="font-bold"
                    >
                      Get started
                      <RiArrowRightLine className="text-xl" />
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
      <div className="mt-[4.5rem]">
        {/* on mobile, if showing signup or login modal, dont render outlet, if not on mobile, render outlet no matter what */}
        {isMobile ? (
          showLoginModal || showSignupModal ? null : (
            <Outlet
              context={{
                handleToggleLoginModal,
                handleToggleSignupModal,
              }}
            />
          )
        ) : (
          <Outlet
            context={{
              handleToggleLoginModal,
              handleToggleSignupModal,
            }}
          />
        )}
      </div>
      <MobileSidebar
        toggleSidebar={handleToggleSidebar}
        showSidebar={showSidebar}
        toggleLoginModal={handleToggleLoginModal}
        toggleSignupModal={handleToggleSignupModal}
      />
      {(showLoginModal || showSignupModal) && (
        <div className="fixed inset-0 left-0 top-0 z-20 bg-black opacity-50" />
      )}

      {showLoginModal && (
        <div
          className="absolute inset-0 left-0 top-0 z-30 grid place-items-center md:fixed"
          onClick={() => setShowLoginModal(false)}
        >
          <LoginModal
            toggleLoginModal={handleToggleLoginModal}
            toggleSignupModal={handleToggleSignupModal}
          />
        </div>
      )}
      {showSignupModal && (
        <div
          className="absolute inset-0 left-0 top-0 z-30 grid place-items-center md:fixed"
          onClick={() => setShowSignupModal(false)}
        >
          <SignupModal
            toggleSignupModal={handleToggleSignupModal}
            toggleLoginModal={handleToggleLoginModal}
          />
        </div>
      )}
    </>
  );
}

function UserAvatar() {
  const [currentUser] = useAuthState(auth);
  const { data, error, isLoading } = useFetchUsersQuery();
  const defaultImage =
    'https://firebasestorage.googleapis.com/v0/b/howto-creative.appspot.com/o/logo_wbg.png?alt=media&token=9afe0ad1-011c-45a0-a983-14b002ee9668';
  const currentUserData = data?.find((user) => user.uid === currentUser?.uid);

  return (
    <Link to={`/users/${currentUser?.uid}`}>
      <img
        src={isLoading || error ? defaultImage : currentUserData?.avatar}
        alt="user-avatar"
        className="h-12 w-12 overflow-hidden rounded-full"
      />
    </Link>
  );
}
