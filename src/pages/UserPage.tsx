import { useParams } from 'react-router-dom';
import HowToItem from '~/components/HowtoItem';
import Button from '~/components/elements/Button';
import {
  RiUserAddLine,
  RiEdit2Line,
  RiHeartLine,
  RiChat1Line,
  RiGroupLine,
  RiCheckLine,
  RiArrowGoBackLine,
  RiImageAddLine,
} from 'react-icons/ri';
import Textarea from '~/components/elements/Textarea';
import { useRef, useState } from 'react';
import useAutosizeTextArea from '~/hooks/useAutosizeTextArea';

export default function UserPage() {
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const handleEditMode = () => setIsEditMode((prev) => !prev);
  return (
    <div className="my-5 md:my-12">
      {isEditMode ? (
        <EditProfile handleEditMode={handleEditMode} />
      ) : (
        <UserProfile handleEditMode={handleEditMode} />
      )}
      <div className="mb-5">
        <h3 className="text-center font-slabo text-2xl text-teal-500 ">
          Betty Liang's How To...
        </h3>
      </div>
      <div className="space-y-3">
        <HowToItem />
        <HowToItem />
        <HowToItem />
        <HowToItem />
        <HowToItem />
      </div>
    </div>
  );
}

type Props = {
  handleEditMode: React.MouseEventHandler<HTMLButtonElement>;
};

function UserProfile({ handleEditMode }: Props) {
  return (
    <div className="mb-5 flex overflow-hidden rounded-xl bg-white shadow-basic xl:h-[300px]">
      <div className="flex-1">
        <img
          src="https://picsum.photos/id/999/800/500"
          alt=""
          className="aspect-video w-full object-cover xl:hidden"
        />
        <div className="relative p-5">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
            alt=""
            className="aspect-square h-14 w-14 rounded-full object-cover"
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
          <p className="mt-2 font-bold xl:text-lg">Betty Liang</p>
          <p className="text-sm text-gray-400">Member since January 2023</p>
          <p className="mb-5 mt-3 xl:mb-3">
            Traveling the world one destination at a time. Passionate about
            experiencing new cultures and making unforgettable memories.
          </p>
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
        <img
          src="https://picsum.photos/id/999/800/500"
          alt=""
          className="h-full object-cover "
        />
      </div>
    </div>
  );
}

function EditProfile({ handleEditMode }: Props) {
  const [bio, setBio] = useState(
    'Traveling the world one destination at a time. Passionate about   experiencing new cultures and making unforgettable memories.'
  );
  const bioRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(bioRef.current, bio, 5);
  return (
    <div className="mb-5 flex overflow-hidden rounded-xl bg-white shadow-basic xl:h-[300px]">
      <div className="flex-1">
        <div className="relative xl:hidden">
          <div className="absolute inset-0 rounded-xl bg-black opacity-50" />
          <img
            src="https://picsum.photos/id/999/800/500"
            alt=""
            className="aspect-video w-full object-cover"
          />
          <div className="absolute inset-0 grid place-items-center">
            <button className="text-white hover:text-teal-500">
              <RiImageAddLine className="text-2xl " />
            </button>
          </div>
        </div>
        <div className="relative p-5">
          <div className="relative mb-2 w-fit">
            <div className="absolute inset-0 rounded-full bg-black opacity-50" />
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
              alt=""
              className="aspect-square h-14 w-14 rounded-full object-cover"
            />
            <div className="absolute inset-0 grid place-items-center">
              <button className="text-white hover:text-teal-500">
                <RiImageAddLine className="text-xl " />
              </button>
            </div>
          </div>
          <div className="absolute right-5 top-5 flex gap-2">
            <Button loading={false} secondary rounded onClick={handleEditMode}>
              <RiArrowGoBackLine className="text-2xl" />
            </Button>
            <Button loading={false} primary basic className="">
              <RiCheckLine className="text-2xl" />
              Save
            </Button>
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
        <div className="absolute inset-0 rounded-xl bg-black opacity-50" />
        <img
          src="https://picsum.photos/id/999/800/500"
          alt=""
          className="h-full object-cover"
        />
        <div className="absolute inset-0 grid place-items-center">
          <button className="text-white hover:text-teal-500">
            <RiImageAddLine className="text-2xl " />
          </button>
        </div>
      </div>
    </div>
  );
}
