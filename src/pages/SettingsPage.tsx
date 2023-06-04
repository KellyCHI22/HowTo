import { useState } from 'react';
import clsx from 'clsx';
import {
  RiAccountCircleFill,
  RiArrowGoBackLine,
  RiCheckLine,
  RiLock2Fill,
  RiMailFill,
  RiDeleteBin6Line,
} from 'react-icons/ri';
import Button from '~/components/elements/Button';
import Input from '~/components/elements/Input';
import { ReactComponent as CreativeIllustration } from '~/assets/illustration_creative.svg';
import {
  useFetchUsersQuery,
  useDeleteUserMutation,
  useDeleteUserPostsMutation,
  useDeleteUserCommentsMutation,
} from '~/store';
import {
  useAuthState,
  useDeleteUser,
  useUpdateEmail,
  useUpdatePassword,
} from 'react-firebase-hooks/auth';
import { auth } from '~/firebase';
import { User, useUpdateUserMutation } from '~/store/apis/usersApi';
import Spinner from '~/components/elements/Spinner';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

type SettingOptionType = 'basic' | 'password' | 'other';

export default function SettingsPage() {
  const [currentTab, setCurrentTab] = useState<SettingOptionType>('basic');
  const handleChangeTab = (id: SettingOptionType) => setCurrentTab(id);
  const [currentUser] = useAuthState(auth);
  const {
    data: usersData,
    error: errorUsersData,
    isFetching: isFetchingUsersData,
  } = useFetchUsersQuery();
  const currentUserData = usersData?.find(
    (user) => user.uid === currentUser?.uid
  );

  return (
    <>
      {isFetchingUsersData ? (
        <div className="my-5 grid h-96 w-full place-items-center rounded-lg bg-white md:my-12">
          <Spinner />
        </div>
      ) : (
        <div className="my-5 md:my-12">
          <h2 className="mb-3 ml-2 font-slabo text-2xl text-teal-500">
            Account Settings
          </h2>

          <div className="mb-5 rounded-xl bg-white p-5 pt-3 shadow-basic ">
            <div className="flex h-full">
              <div className="flex-1">
                <div className="flex justify-around gap-3 font-bold">
                  <Tab
                    label="Basic"
                    id="basic"
                    currentTab={currentTab}
                    onChangeTab={handleChangeTab}
                  />
                  <Tab
                    label="Password"
                    id="password"
                    currentTab={currentTab}
                    onChangeTab={handleChangeTab}
                  />
                  <Tab
                    label="Other"
                    id="other"
                    currentTab={currentTab}
                    onChangeTab={handleChangeTab}
                  />
                </div>
                <div className="mt-10">
                  {currentTab === 'basic' && (
                    <BasicSettings currentUserData={currentUserData as User} />
                  )}
                  {currentTab === 'password' && <PasswordSettings />}
                  {currentTab === 'other' && (
                    <OtherSettings currentUserData={currentUserData as User} />
                  )}
                </div>
              </div>
              <div className="hidden place-items-center p-9 pl-16 xl:grid ">
                <CreativeIllustration />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

type TabProps = {
  id: SettingOptionType;
  label: string;
  currentTab: SettingOptionType;
  onChangeTab: (id: SettingOptionType) => void;
};

function Tab({ id, label, currentTab, onChangeTab }: TabProps) {
  const isActive = currentTab === id;
  return (
    <button
      className={clsx(
        'w-full border-b p-3 text-center text-gray-400 hover:bg-gray-50',
        {
          'mt-[1px] border-b-2 border-teal-500 text-teal-500': isActive,
        }
      )}
      onClick={() => onChangeTab(id)}
    >
      <span>{label}</span>
    </button>
  );
}

function BasicSettings({ currentUserData }: { currentUserData: User }) {
  const [currentUser] = useAuthState(auth);
  const [name, setName] = useState(currentUserData?.name);
  const [email, setEmail] = useState(currentUserData?.email);
  const [errorMessage, setErrorMessage] = useState('');

  // * submit
  const [updateUser, updateUserResults] = useUpdateUserMutation();
  const [updateEmail, updatingEmail, errorUpdateEmail] = useUpdateEmail(auth);
  const handleSubmit = async () => {
    if (currentUser) {
      // * check if name and email are the same as before
      if (name === currentUserData?.name && email === currentUser?.email) {
        return setErrorMessage('There is nothing to be updated');
      }

      // * check if inputs are correct
      if (name?.trim().length === 0) {
        return setErrorMessage('Name should not be blank');
      } else if (name && name?.length > 50) {
        return setErrorMessage('Name cannot be more than 50 characters');
      } else if (email?.trim().length === 0) {
        return setErrorMessage('Email should not be blank');
      } else {
        setErrorMessage('');
      }

      try {
        // * update email if email has changed
        if (email !== currentUser?.email) {
          const currentPassword = prompt(
            'Please type your password to continue'
          );
          if (currentPassword === null)
            return setErrorMessage('Please try again');
          const credential = EmailAuthProvider.credential(
            currentUser.email as string,
            currentPassword
          );
          const reauthenticateResult = await reauthenticateWithCredential(
            currentUser,
            credential
          );
          if (reauthenticateResult) {
            const successUpdateEmail = await updateEmail(email);
            if (successUpdateEmail) {
              alert('Email updated successfully!');
              currentUser?.reload();
            } else {
              return setErrorMessage('Invalid email or email already in use');
            }
          }
        }
        // * update name and email in users collection
        const successUpdateUser = await updateUser([
          currentUserData,
          {
            name: name,
            email: email,
          },
        ]);
        if (successUpdateUser) return;
      } catch {
        return setErrorMessage('Something went wrong, please try again');
      }
    }
  };

  return (
    <div>
      <div>
        <Input
          type="text"
          label="Name"
          id="name"
          value={name}
          limit={50}
          onChange={(e) => setName(e.target.value)}
          icon={<RiAccountCircleFill />}
          placeholder="John Doe"
          className="mb-0"
        />
        <Input
          type="text"
          label="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<RiMailFill />}
          placeholder="JohnDoe@example.com"
        />
      </div>
      <div className="mt-16 flex items-center justify-between">
        <p className="text-red-500">{errorMessage}</p>
        <div className="flex gap-3">
          <Button loading={false} secondary rounded>
            <RiArrowGoBackLine className="text-2xl" />
          </Button>
          <Button
            loading={updateUserResults.isLoading || updatingEmail}
            primary
            basic
            onClick={handleSubmit}
            className="font-bold"
          >
            <RiCheckLine className="text-2xl" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

function PasswordSettings() {
  const [currentUser] = useAuthState(auth);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // * submit
  const [updatePassword, updatingPassword, errorUpdatePassword] =
    useUpdatePassword(auth);
  const handleSubmit = async () => {
    if (currentUser) {
      // * check if inputs are correct
      if (oldPassword.trim().length === 0) {
        return setErrorMessage('Old password should not be blank');
      } else if (newPassword.trim().length === 0) {
        return setErrorMessage('New password cannot be blank');
      } else if (confirmNewPassword?.trim().length === 0) {
        return setErrorMessage('Please confirm your new password');
      } else if (confirmNewPassword !== newPassword) {
        return setErrorMessage('Please confirm your new password again');
      } else {
        setErrorMessage('');
      }

      try {
        // * update password
        const credential = EmailAuthProvider.credential(
          currentUser.email as string,
          oldPassword
        );
        const reauthenticateResult = await reauthenticateWithCredential(
          currentUser,
          credential
        );
        if (reauthenticateResult) {
          const successUpdatePassword = await updatePassword(newPassword);
          if (successUpdatePassword) {
            alert('Password updated successfully!');
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            currentUser?.reload();
          } else {
            return setErrorMessage(
              'Invalid password or password too weak (Password should be at least 6 characters)'
            );
          }
        }
      } catch {
        return setErrorMessage('Invalid password, please try again');
      }
    }
  };

  return (
    <div>
      <div className="space-y-5">
        <Input
          type="password"
          label="Old password"
          id="oldPassword"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          icon={<RiLock2Fill />}
          placeholder=""
        />
        <Input
          type="password"
          label="New password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          icon={<RiLock2Fill />}
          placeholder="Minimum 6 characters"
        />
        <Input
          type="password"
          label="Confirm new password"
          id="confirmNewPassword"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          icon={<RiLock2Fill />}
          placeholder="Minimum 6 characters"
        />
      </div>
      <div className="mt-16 flex items-center justify-between">
        <p className="text-red-500">{errorMessage}</p>
        <div className="flex gap-3">
          <Button loading={false} secondary rounded>
            <RiArrowGoBackLine className="text-2xl" />
          </Button>
          <Button
            loading={updatingPassword}
            primary
            basic
            onClick={handleSubmit}
            className="font-bold"
          >
            <RiCheckLine className="text-2xl" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

function OtherSettings({ currentUserData }: { currentUserData: User }) {
  const navigate = useNavigate();
  const [currentUser] = useAuthState(auth);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // * submit
  const [deleteUser, loadingDeleteUser, errorDeleteUser] = useDeleteUser(auth);
  const [deleteUserData, deleteUserDataResults] = useDeleteUserMutation();
  const [deleteUserPosts, deleteUserPostsResults] =
    useDeleteUserPostsMutation();
  const [deleteUserComments, deleteUserCommentsResults] =
    useDeleteUserCommentsMutation();
  const isLoading =
    loadingDeleteUser ||
    deleteUserDataResults.isLoading ||
    deleteUserPostsResults.isLoading ||
    deleteUserCommentsResults.isLoading;

  const handleSubmit = async () => {
    if (currentUser) {
      // * check if inputs are correct
      if (password.trim().length === 0) {
        return setErrorMessage('Password should not be blank');
      } else if (confirmPassword.trim().length === 0) {
        return setErrorMessage('Please confirm your new password');
      } else if (password !== confirmPassword) {
        return setErrorMessage('Please confirm your password again');
      } else {
        setErrorMessage('');
      }

      try {
        const credential = EmailAuthProvider.credential(
          currentUser.email as string,
          password
        );
        const reauthenticateResult = await reauthenticateWithCredential(
          currentUser,
          credential
        );
        if (reauthenticateResult) {
          await deleteUserData(currentUserData);
          await deleteUserPosts(currentUserData);
          await deleteUserComments(currentUserData);
          const success = await deleteUser();
          if (success) {
            alert('Account deleted successfully!');
            navigate('/howtos');
            return window.location.reload();
          } else {
            return setErrorMessage('Something went wrong, please try again');
          }
        }
      } catch {
        setErrorMessage('Invalid password, please try again');
      }
    }
  };

  return (
    <div>
      <div className="mb-5 space-y-3">
        <h2 className="text-2xl font-extrabold text-red-400">Delete Account</h2>
        <p className="text-sm text-gray-500">
          You can delete your account, but all the created posts will be deleted
          as well.
        </p>
        <p className="font-bold text-red-400">
          Please enter password to confirm.
        </p>
      </div>
      <div className="space-y-5">
        <Input
          type="password"
          label="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<RiLock2Fill />}
          placeholder=""
        />
        <Input
          type="password"
          label="Confirm password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          icon={<RiLock2Fill />}
          placeholder=""
        />
      </div>
      <div className="mt-16 flex items-center justify-between">
        <p className="mr-5 text-red-500">{errorMessage}</p>
        <div className="flex flex-shrink-0 gap-3">
          <Button loading={false} secondary rounded>
            <RiArrowGoBackLine className="text-2xl" />
          </Button>
          <Button loading={isLoading} danger basic onClick={handleSubmit}>
            <RiDeleteBin6Line className="text-2xl" />
            Delete account
          </Button>
        </div>
      </div>
    </div>
  );
}
