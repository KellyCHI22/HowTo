import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';
import Button from '../elements/Button';
import MobileSidebar from '../MobileSidebar';
import {
  RiMenuFill,
  RiSearchLine,
  RiArrowRightLine,
  RiCloseFill,
  RiArrowLeftLine,
} from 'react-icons/ri';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { useEffect, useState } from 'react';
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';

export default function RootLayout() {
  const { pathname } = useLocation();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [showSidebar, setShowSidebar] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const navigate = useNavigate();
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

  useEffect(() => {
    if (showLoginModal || showSignupModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showLoginModal, showSignupModal]);

  return (
    <>
      <nav className={clsx('h-[4.5rem] bg-white  shadow-basic', '')}>
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
                <button className="text-teal-500">
                  <RiSearchLine className="text-2xl" />
                </button>

                <input
                  type="text"
                  id="searchQuery"
                  value={searchQuery}
                  placeholder="search keywords, tags..."
                  className="flex-1 border-none bg-transparent placeholder-slate-400 focus:outline-none focus:ring-0"
                  autoFocus
                  onChange={(e) => setSearchQuery(e.target.value)}
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

              <div className="flex items-center">
                <Logo className="h-16 w-16" />
                <h1 className="font-slabo text-2xl text-teal-500">HowTo...</h1>
              </div>

              <Link to="/search" className="md:w-2/5">
                <RiSearchLine className="text-2xl md:hidden" />
                <div className="hidden md:block">
                  <div className="flex w-full items-center rounded-full bg-gray-200 px-2 focus-within:ring-2 focus-within:ring-teal-400">
                    <button className="text-teal-500">
                      <RiSearchLine className="text-2xl" />
                    </button>

                    <input
                      type="text"
                      id="searchQuery"
                      value={searchQuery}
                      placeholder="search keywords, tags..."
                      className="flex-1 border-none bg-transparent placeholder-slate-400 focus:outline-none focus:ring-0"
                      autoFocus
                      onChange={(e) => setSearchQuery(e.target.value)}
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
              <div className="hidden md:flex md:gap-2">
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
              </div>
            </>
          )}
        </div>
      </nav>

      <Outlet context={{ handleToggleLoginModal, handleToggleSignupModal }} />
      <MobileSidebar
        toggleSidebar={handleToggleSidebar}
        showSidebar={showSidebar}
      />
      {(showLoginModal || showSignupModal) && (
        <div className="absolute inset-0 left-0 top-0 bg-black opacity-50" />
      )}

      {showLoginModal && (
        <div
          className="absolute inset-0 left-0 top-0 grid place-items-center"
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
          className="absolute inset-0 left-0 top-0 grid place-items-center"
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
