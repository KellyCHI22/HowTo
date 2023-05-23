import { useParams } from 'react-router-dom';
import HowToItem from '~/components/HowtoItem';
import Button from '~/components/elements/Button';
import {
  RiEdit2Line,
  RiHeartLine,
  RiChat1Line,
  RiGroupLine,
  RiCheckLine,
  RiArrowGoBackLine,
  RiImageAddLine,
  RiCloseFill,
} from 'react-icons/ri';
import Textarea from '~/components/elements/Textarea';
import { ChangeEvent, useRef, useState } from 'react';
import useAutosizeTextArea from '~/hooks/useAutosizeTextArea';
import { User, posts, users } from '~/dummyData';

export default function UserPage() {
  const { id } = useParams();
  const user = users.find((user) => user.id === id) as User;
  const userPosts = posts.filter((post) => post.authorId === id);

  const [isEditMode, setIsEditMode] = useState(false);
  const handleEditMode = () => setIsEditMode((prev) => !prev);

  return (
    <div className="my-5 md:my-12">
      {isEditMode ? (
        <EditProfile handleEditMode={handleEditMode} user={user} />
      ) : (
        <UserProfile handleEditMode={handleEditMode} user={user} />
      )}
      <div className="mb-5">
        <h3 className="text-center font-slabo text-2xl text-teal-500 ">
          {user?.name}'s How To...
        </h3>
      </div>
      <div className="space-y-3">
        {userPosts.map((post) => (
          <HowToItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

type Props = {
  handleEditMode: React.MouseEventHandler<HTMLButtonElement>;
  user: User;
};

function UserProfile({ handleEditMode, user }: Props) {
  return (
    <div className="mb-5 flex overflow-hidden rounded-xl bg-white shadow-basic xl:min-h-[325px]">
      <div className="flex-1">
        <img
          src={user.cover_image}
          alt="user-cover-image"
          className="aspect-video w-full object-cover xl:hidden"
        />
        <div className="relative h-full p-5 xl:flex xl:flex-col xl:justify-between">
          <div>
            <img
              src={user.avatar}
              alt=""
              className="aspect-square h-20 w-20 rounded-full object-cover"
            />
            <Button
              loading={false}
              outline
              basic
              className="absolute right-5 top-5"
              onClick={handleEditMode}
            >
              <RiEdit2Line className="text-2xl" />
              Edit
            </Button>
            <p className="mt-2 font-bold xl:text-lg">{user.name}</p>
            <p className="text-sm text-gray-400">Member since January 2023</p>
            <p className="mb-5 mt-3 xl:mb-3">{user.bio}</p>
          </div>

          <div className="flex w-full justify-between text-gray-400 xl:grid xl:grid-cols-4 ">
            <div className="flex items-center gap-2 xl:flex-col xl:items-start xl:gap-0">
              <RiEdit2Line className="text-xl xl:hidden" />
              <span className="font-bold text-teal-500 xl:text-lg">25</span>
              <span className="hidden xl:block">How Tos</span>
            </div>
            <div className="flex items-center gap-2 xl:flex-col xl:items-start xl:gap-0">
              <RiHeartLine className="text-xl xl:hidden" />
              <span className="font-bold text-teal-500 xl:text-lg">50</span>
              <span className="hidden xl:block">Likes</span>
            </div>
            <div className="flex items-center gap-2 xl:flex-col xl:items-start xl:gap-0">
              <RiChat1Line className="text-xl xl:hidden" />
              <span className="font-bold text-teal-500 xl:text-lg">31</span>
              <span className="hidden xl:block">Comments</span>
            </div>
            <div className="flex items-center gap-2 xl:flex-col xl:items-start xl:gap-0">
              <RiGroupLine className="text-xl xl:hidden" />
              <span className="font-bold text-teal-500 xl:text-lg">5</span>
              <span className="hidden xl:block">Followers</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden w-[350px] flex-shrink-0 xl:block">
        <img src={user.cover_image} alt="" className="h-full object-cover " />
      </div>
    </div>
  );
}

function EditProfile({ handleEditMode, user }: Props) {
  const [errorMessage, setErrorMessage] = useState('');
  const [bio, setBio] = useState(user.bio);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(bioRef.current, bio, 5);

  // avatar & cover
  // ! need to compress, upload to db, get the url and then save to user data
  const defaultImage =
    'https://firebasestorage.googleapis.com/v0/b/howto-creative.appspot.com/o/logo_wbg.png?alt=media&token=9afe0ad1-011c-45a0-a983-14b002ee9668';
  const [avatar, setAvatar] = useState<null | File>(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const [cover, setCover] = useState<null | File>(null);
  const [coverPreview, setCoverPreview] = useState(user.cover_image);
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImage = e.target.files[0];
      const previewURL = URL.createObjectURL(e.target.files[0]);
      setAvatar(selectedImage);
      setAvatarPreview(previewURL);
    }
  };
  const handleRemoveAvatar = () => {
    setAvatar(null);
    setAvatarPreview(user.avatar);
  };
  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImage = e.target.files[0];
      const previewURL = URL.createObjectURL(e.target.files[0]);
      setCover(selectedImage);
      setCoverPreview(previewURL);
    }
  };
  const handleRemoveCover = () => {
    setCover(null);
    setCoverPreview(user.cover_image);
  };

  // submit
  const handleSubmit = () => {
    console.log({ bio, avatar, cover });
    if (bio.trim().length === 0) {
      setErrorMessage('Bio should not be blank');
    } else if (bio.length > 200) {
      setErrorMessage('Bio cannot be more than 200 characters');
    } else {
      setErrorMessage('');
    }
  };

  return (
    <div className="mb-5 flex overflow-hidden rounded-xl bg-white shadow-basic xl:min-h-[325px]">
      <div className="flex-1">
        <div className="relative xl:hidden">
          <div className="absolute inset-0 bg-black opacity-50" />
          <img
            src={coverPreview}
            alt="user-cover-image"
            className="aspect-video w-full object-cover"
          />
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex gap-2">
              <button className="cursor-pointer text-white hover:text-teal-500">
                <label htmlFor="cover-input" className="cursor-pointer">
                  <RiImageAddLine className="text-2xl" />
                </label>
                <input
                  className="hidden"
                  name="cover"
                  id="cover-input"
                  placeholder="none"
                  type="file"
                  accept="image/*"
                  onChange={handleCoverChange}
                />
              </button>
              <button
                className="cursor-pointer text-white hover:text-teal-500"
                onClick={handleRemoveCover}
              >
                <RiCloseFill className="text-3xl" />
              </button>
            </div>
          </div>
        </div>
        <div className="relative p-5">
          <div className="relative mb-2 w-fit">
            <div className="absolute inset-0 rounded-full bg-black opacity-50" />
            <img
              src={avatarPreview}
              alt="user-avatar"
              className="aspect-square h-20 w-20 rounded-full object-cover"
            />
            <div className="absolute inset-0 grid place-items-center">
              <div className="flex gap-1">
                <button className="text-white hover:text-teal-500">
                  <label htmlFor="avatar-input" className="cursor-pointer">
                    <RiImageAddLine className="text-xl " />
                  </label>
                  <input
                    className="hidden"
                    name="avatar"
                    id="avatar-input"
                    placeholder="none"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </button>
                <button
                  className="cursor-pointer text-white hover:text-teal-500"
                  onClick={handleRemoveAvatar}
                >
                  <RiCloseFill className="text-2xl" />
                </button>
              </div>
            </div>
          </div>
          <div className="absolute right-5 top-5">
            <div className="flex justify-end gap-2">
              <Button
                loading={false}
                secondary
                rounded
                onClick={handleEditMode}
              >
                <RiArrowGoBackLine className="text-2xl" />
              </Button>
              <Button
                loading={false}
                primary
                basic
                className="font-bold"
                onClick={handleSubmit}
              >
                <RiCheckLine className="text-2xl" />
                Save
              </Button>
            </div>
            <p className="mt-2 max-w-[20ch] text-right text-sm text-red-500 md:max-w-fit">
              {errorMessage}
            </p>
          </div>
          <Textarea
            id="bio"
            label="Bio"
            ref={bioRef}
            value={bio}
            limit={200}
            rows={5}
            placeholder="Say something about yourself..."
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
      </div>
      <div className="relative hidden w-[350px] flex-shrink-0 xl:block">
        <div className="absolute inset-0 bg-black opacity-50" />
        <img
          src={coverPreview}
          alt="user-cover-image"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex gap-2">
            <button className="cursor-pointer text-white hover:text-teal-500">
              <label htmlFor="cover-input" className="cursor-pointer">
                <RiImageAddLine className="text-2xl" />
              </label>
              <input
                className="hidden"
                name="cover"
                id="cover-input"
                placeholder="none"
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
              />
            </button>
            <button
              className="cursor-pointer text-white hover:text-teal-500"
              onClick={handleRemoveCover}
            >
              <RiCloseFill className="text-3xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
