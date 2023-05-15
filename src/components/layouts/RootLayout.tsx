import { Link, Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Button from '../elements/Button';
import MobileSidebar from '../MobileSidebar';
import {
  RiMenuFill,
  RiSearchLine,
  RiArrowRightLine,
  RiCloseFill,
} from 'react-icons/ri';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { useState } from 'react';
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';

export default function RootLayout() {
  const { pathname } = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const handleToggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };
  const handleToggleLoginModal = () => {
    setShowLoginModal((prev) => !prev);
  };
  const handleToggleSignupModal = () => {
    setShowSignupModal((prev) => !prev);
  };

  return (
    <>
      {!pathname.includes('search') && (
        <>
          <nav
            className={clsx('h-[4.5rem] bg-white px-4 py-1 shadow-basic', '')}
          >
            <div className="container mx-auto flex items-center justify-between">
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
                  <div className="flex items-center rounded-full bg-gray-200 px-2 focus-within:ring-2 focus-within:ring-teal-400">
                    <button className="text-teal-500">
                      <RiSearchLine className="text-2xl" />
                    </button>
                    <input
                      type="text"
                      className="w-full cursor-pointer border-none bg-gray-200 outline-none placeholder:text-gray-400"
                      placeholder="search keywords, tags..."
                    />
                    <button className="text-gray-400">
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
            </div>
          </nav>
        </>
      )}

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
