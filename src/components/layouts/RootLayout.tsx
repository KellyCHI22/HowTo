import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
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

import { posts, Post } from '~/dummyData';

type SearchResult = {
  query: string;
  results: Post[] | undefined | null;
};

export type ContextType = {
  handleToggleLoginModal: () => void;
  handleToggleSignupModal: () => void;
  searchResults: SearchResult;
  isSearching: boolean;
  handleSearch: (query: string) => void;
};

export default function RootLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const [showSidebar, setShowSidebar] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult>({
    query: '',
    results: [],
  });

  const handleToggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };
  const handleToggleLoginModal = () => {
    setShowLoginModal((prev) => !prev);
  };
  const handleToggleSignupModal = () => {
    setShowSignupModal((prev) => !prev);
  };

  const handleSearch = (query: string) => {
    if (query === '') return;
    setIsSearching(true);
    const newSearchResults = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.map((tag) => tag.toLowerCase()).includes(query.toLowerCase())
    );
    setSearchResults({ query: query, results: newSearchResults });
  };

  useEffect(() => {
    if (showLoginModal || showSignupModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showLoginModal, showSignupModal]);

  useEffect(() => {
    setSearchQuery('');
    setSearchResults({
      query: '',
      results: [],
    });
    setIsSearching(false);
  }, [pathname]);

  return (
    <>
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

              <div className="flex items-center">
                <Logo className="h-16 w-16" />
                <h1 className="font-slabo text-2xl text-teal-500">HowTo...</h1>
              </div>

              <Link to="/search" className="md:w-2/5">
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
      <div className="mt-[4.5rem]">
        <Outlet
          context={{
            handleToggleLoginModal,
            handleToggleSignupModal,
            isSearching,
            searchResults,
            handleSearch,
          }}
        />
      </div>
      <MobileSidebar
        toggleSidebar={handleToggleSidebar}
        showSidebar={showSidebar}
      />
      {(showLoginModal || showSignupModal) && (
        <div className="absolute inset-0 left-0 top-0 z-20 bg-black opacity-50" />
      )}

      {showLoginModal && (
        <div
          className="absolute inset-0 left-0 top-0 z-30 grid place-items-center"
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
          className="absolute inset-0 left-0 top-0 z-30 grid place-items-center"
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
