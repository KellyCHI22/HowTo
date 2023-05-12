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

export default function SettingsPage() {
  const [currentTab, setCurrentTab] = useState<'basic' | 'password' | 'other'>(
    'password'
  );
  const handleChangeTab = (id) => setCurrentTab(id);

  return (
    <div className="m-5">
      <h2 className="mb-3 ml-2 font-slabo text-2xl text-teal-500">
        Account Settings
      </h2>
      <div className="mb-5 rounded-xl bg-white p-5 pt-3 shadow-basic">
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
          {currentTab === 'basic' && <BasicSettings />}
          {currentTab === 'password' && <PasswordSettings />}
          {currentTab === 'other' && <OtherSettings />}
        </div>
      </div>
    </div>
  );
}

function Tab({ id, label, currentTab, onChangeTab }) {
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

function BasicSettings() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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
      <div className="mt-16 flex justify-end gap-3">
        <Button loading={false} secondary rounded>
          <RiArrowGoBackLine className="text-2xl" />
        </Button>
        <Button loading={false} primary basic className="">
          <RiCheckLine className="text-2xl" />
          Save
        </Button>
      </div>
    </div>
  );
}

function PasswordSettings() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

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
      <div className="mt-16 flex justify-end gap-3">
        <Button loading={false} secondary rounded>
          <RiArrowGoBackLine className="text-2xl" />
        </Button>
        <Button loading={false} primary basic className="">
          <RiCheckLine className="text-2xl" />
          Save
        </Button>
      </div>
    </div>
  );
}

function OtherSettings() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
      <div className="mt-16 flex justify-end gap-3">
        <Button loading={false} secondary rounded>
          <RiArrowGoBackLine className="text-2xl" />
        </Button>
        <Button loading={false} danger basic className="">
          <RiDeleteBin6Line className="text-2xl" />
          Delete account
        </Button>
      </div>
    </div>
  );
}
