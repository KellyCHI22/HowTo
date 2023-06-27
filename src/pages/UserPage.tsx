import { ChangeEvent, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import HowToItem from '~/components/HowtoItem';
import { useFetchPostsQuery, useFetchUsersQuery } from '~/store';
import { auth } from '~/firebase';
import { User, useUpdateUserMutation } from '~/store/apis/usersApi';
import { useAutosizeTextArea } from '~/hooks';
import { Button, Spinner, Textarea } from '~/components/elements';
import {
  RiEdit2Line,
  RiHeartLine,
  RiChat1Line,
  RiGroupLine,
  RiCheckLine,
  RiArrowGoBackLine,
  RiImageAddLine,
  RiCloseFill,
  RiUserAddLine,
  RiUserFollowLine,
} from 'react-icons/ri';
import { Post } from '~/store/apis/postsApi';
import { getImageUrl } from '~/utils';
import clsx from 'clsx';

export default function UserPage() {
  const { id } = useParams();
  const [currentUser] = useAuthState(auth);
  const {
    data: postsData,
    error: errorPostsData,
    isLoading: isLoadingPostsData,
  } = useFetchPostsQuery();
  const {
    data: usersData,
    error: errorUsersData,
    isLoading: isLoadingUsersData,
  } = useFetchUsersQuery();

  const user = usersData?.find((user) => user.uid === id);
  const userPosts = postsData?.filter((post) => post.authorId === id);
  const currentUserData = usersData?.find(
    (user) => user.uid === currentUser?.uid
  );

  const [isEditMode, setIsEditMode] = useState(false);
  const handleEditMode = () => setIsEditMode((prev) => !prev);

  const isLoading = isLoadingPostsData || isLoadingUsersData;
  const isError = errorPostsData || errorUsersData;

  if (isError) {
    console.log(errorPostsData || errorUsersData);
  }

  return (
    <>
      {isLoading ? (
        <div className="my-5 grid h-96 w-full place-items-center rounded-lg bg-white md:my-12">
          <Spinner />
        </div>
      ) : (
        <div className="my-5 md:my-12">
          {isEditMode ? (
            <EditProfile handleEditMode={handleEditMode} user={user} />
          ) : (
            <UserProfile
              handleEditMode={handleEditMode}
              user={user}
              userPosts={userPosts}
              currentUserData={currentUserData}
            />
          )}
          <div className="mb-5">
            <h3 className="text-center font-slabo text-2xl text-teal-500 ">
              {user?.name}'s How To...
            </h3>
          </div>
          <div className="space-y-3">
            {userPosts?.map((post) => (
              <HowToItem key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

type UserProfileProps = {
  handleEditMode: () => void;
  user: User | undefined;
  userPosts: Post[] | undefined;
  currentUserData: User | undefined;
};

function UserProfile({
  handleEditMode,
  user,
  userPosts,
  currentUserData,
}: UserProfileProps) {
  const [currentUser] = useAuthState(auth);

  let joinedTime;
  if (user) {
    joinedTime = new Date(user?.createdAt).toLocaleString('en-us', {
      month: 'long',
      year: 'numeric',
    });
  }

  const totalLikes = userPosts?.reduce(
    (acc, current) => acc + current.likesCount,
    0
  );

  const totalComments = userPosts?.reduce(
    (acc, current) => acc + current.commentsCount,
    0
  );

  // * follow / unfollow user
  const isFollowing = user?.followers.includes(currentUserData?.uid as string);
  const [updateUser, updateUserResults] = useUpdateUserMutation();
  const handleFollow = async () => {
    if (user && currentUserData) {
      if (isFollowing) {
        try {
          const updatedFollowers = user.followers.filter(
            (follower) => follower !== currentUserData.uid
          );
          const updatedFollowing = currentUserData.following.filter(
            (following) => following !== user.uid
          );
          await updateUser([
            user,
            {
              followers: updatedFollowers,
            },
          ]);
          const success = await updateUser([
            currentUserData,
            {
              following: updatedFollowing,
            },
          ]);
          if (success) return;
        } catch {
          return alert('Something went wrong, please try again');
        }
      } else {
        try {
          await updateUser([
            user,
            {
              followers: [...user.followers, currentUserData.uid],
            },
          ]);
          const success = await updateUser([
            currentUserData,
            {
              following: [...currentUserData.following, user.uid],
            },
          ]);
          if (success) return;
        } catch {
          return alert('Something went wrong, please try again');
        }
      }
    }
  };

  return (
    <div className="mb-5 flex overflow-hidden rounded-xl bg-white shadow-basic">
      <div className="flex-1 xl:min-h-[350px]">
        <img
          src={user?.cover_image}
          alt="user-cover-image"
          className="aspect-video w-full object-cover xl:hidden"
        />
        <div className="relative h-full p-5 xl:flex xl:flex-col xl:justify-between">
          <div>
            <img
              src={user?.avatar}
              alt="user-avatar"
              className="aspect-square h-20 w-20 rounded-full object-cover"
            />
            {currentUserData?.uid === user?.uid ? (
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
            ) : (
              <Button
                loading={updateUserResults.isLoading}
                outline={!isFollowing}
                primary={isFollowing}
                basic
                className={clsx('absolute right-5 top-5', {
                  hidden: !currentUser,
                })}
                onClick={handleFollow}
              >
                {isFollowing ? (
                  <>
                    <RiUserFollowLine className="text-2xl" />
                    Following
                  </>
                ) : (
                  <>
                    <RiUserAddLine className="text-2xl" />
                    Follow
                  </>
                )}
              </Button>
            )}

            <p className="mt-2 font-bold xl:text-lg">{user?.name}</p>
            <p className="text-sm text-gray-400">Member since {joinedTime}</p>
            <p className="mb-5 mt-3 xl:mb-3">{user?.bio}</p>
          </div>

          <div className="flex w-full justify-between text-gray-400 xl:grid xl:grid-cols-4 ">
            <div className="flex items-center gap-2 xl:flex-col xl:items-start xl:gap-0">
              <RiEdit2Line className="text-xl xl:hidden" />
              <span className="font-bold text-teal-500 xl:text-lg">
                {userPosts?.length}
              </span>
              <span className="hidden xl:block">How Tos</span>
            </div>
            <div className="flex items-center gap-2 xl:flex-col xl:items-start xl:gap-0">
              <RiHeartLine className="text-xl xl:hidden" />
              <span className="font-bold text-teal-500 xl:text-lg">
                {totalLikes}
              </span>
              <span className="hidden xl:block">Likes</span>
            </div>
            <div className="flex items-center gap-2 xl:flex-col xl:items-start xl:gap-0">
              <RiChat1Line className="text-xl xl:hidden" />
              <span className="font-bold text-teal-500 xl:text-lg">
                {totalComments}
              </span>
              <span className="hidden xl:block">Comments</span>
            </div>
            <div className="flex items-center gap-2 xl:flex-col xl:items-start xl:gap-0">
              <RiGroupLine className="text-xl xl:hidden" />
              <span className="font-bold text-teal-500 xl:text-lg">
                {user?.followers.length}
              </span>
              <span className="hidden xl:block">Followers</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden max-h-[350px] w-[350px]  flex-shrink-0 xl:block">
        <img src={user?.cover_image} alt="" className="h-full object-cover" />
      </div>
    </div>
  );
}

type EditProfileProps = {
  handleEditMode: () => void;
  user: User | undefined;
};

function EditProfile({ handleEditMode, user }: EditProfileProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [bio, setBio] = useState(user?.bio);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(bioRef.current, bio as string, 6);

  // avatar & cover
  const [avatar, setAvatar] = useState<null | File>(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar);
  const [cover, setCover] = useState<null | File>(null);
  const [coverPreview, setCoverPreview] = useState(user?.cover_image);
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
    setAvatarPreview(user?.avatar);
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
    setCoverPreview(user?.cover_image);
  };

  // * submit
  const [updateUser, updateUserResults] = useUpdateUserMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    if (user) {
      if (bio?.trim().length === 0) {
        return setErrorMessage('Bio should not be blank');
      } else if (bio && bio?.length > 200) {
        return setErrorMessage('Bio cannot be more than 200 characters');
      } else {
        setErrorMessage('');
      }

      try {
        setIsSubmitting(true);
        const avatarUrl = await getImageUrl(avatar, 'user-image');
        const coverUrl = await getImageUrl(cover, 'user-image');
        const success = await updateUser([
          user,
          {
            bio: bio,
            avatar: avatarUrl ? avatarUrl : user?.avatar,
            cover_image: coverUrl ? coverUrl : user.cover_image,
          },
        ]);
        if (success) {
          setIsSubmitting(false);
          return handleEditMode();
        }
      } catch {
        setIsSubmitting(false);
        return setErrorMessage('Something went wrong, please try again');
      }
    }
  };

  return (
    <div className="mb-5 flex overflow-hidden rounded-xl bg-white shadow-basic xl:min-h-[350px]">
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
                loading={updateUserResults.isLoading || isSubmitting}
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
            value={bio as string}
            limit={200}
            rows={6}
            placeholder="Say something about yourself..."
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
      </div>
      <div className="relative hidden max-h-[350px] w-[350px] flex-shrink-0 xl:block">
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
