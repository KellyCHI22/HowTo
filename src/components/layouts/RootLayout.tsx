import { Link, Outlet } from 'react-router-dom';
import Button from '../elements/Button';
import MobileSidebar from '../MobileSidebar';
import { RiMenuFill, RiSearchLine, RiArrowRightLine } from 'react-icons/ri';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { useState } from 'react';

export default function RootLayout() {
  const [showSidebar, setShowSidebar] = useState(false);
  const handleToggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };
  // textarea
  // const [intro, setIntro] = useState('');
  // const introRef = useRef<HTMLTextAreaElement>(null);
  // useAutosizeTextArea(introRef.current, intro, 5);

  // tag
  // const [tags, setTags] = useState<string[]>(['apple', 'banana', 'orange']);
  // const [newTag, setNewTag] = useState('');
  // const [tagError, setTagError] = useState('');
  // const removeTag = (indexToRemove: number) => {
  //   setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  // };
  // const addTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === 'Enter') {
  //     if (newTag.length > 20) {
  //       return setTagError('Tags cannot be longer than 20 characters');
  //     } else if (tags.length >= 5) {
  //       return setTagError('Cannot add more than 5 tags');
  //     } else if (newTag !== '') {
  //       setTags([...tags, newTag]);
  //       setNewTag('');
  //       setTagError('');
  //     }
  //   }
  // };

  return (
    <>
      <nav className="flex items-center justify-between gap-2 bg-white px-4 py-1 shadow-basic">
        <button onClick={handleToggleSidebar}>
          <RiMenuFill className="text-2xl" />
        </button>

        <div className="flex items-center">
          <Logo className="h-16 w-16" />
          <h1 className="font-slabo text-2xl text-teal-500">HowTo...</h1>
        </div>

        <Link to="/search">
          <RiSearchLine className="text-2xl" />
        </Link>
      </nav>
      <Outlet />
      <MobileSidebar
        toggleSidebar={handleToggleSidebar}
        showSidebar={showSidebar}
      />
    </>
  );
}
