import { useState } from 'react';
import clsx from 'clsx';
import Input from './elements/Input';
import {
  RiCloseFill,
  RiAccountCircleFill,
  RiLock2Fill,
  RiMailFill,
} from 'react-icons/ri';
import Button from './elements/Button';
import { ReactComponent as IdeaIllustration } from '~/assets/illustration_idea.svg';

type SignupModalProps = {
  toggleSignupModal: () => void;
  toggleLoginModal: () => void;
};

export default function LoginModal({
  toggleSignupModal,
  toggleLoginModal,
}: SignupModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div
      className={clsx(
        'absolute left-0 top-0 flex min-h-screen w-screen flex-col justify-center bg-white p-5',
        'md:relative md:grid md:min-h-fit md:w-[700px] md:grid-cols-5 md:overflow-hidden md:rounded-xl md:p-0'
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="md:col-span-3 md:mx-auto md:w-5/6 md:p-5">
        <button
          type="button"
          className="absolute left-5 top-5 text-teal-500"
          onClick={toggleSignupModal}
        >
          <RiCloseFill className="text-3xl" />
        </button>
        <div className="text-center text-teal-500">
          <IdeaIllustration className="m-auto md:hidden" />
        </div>
        <h2 className="mb-3 mt-10 text-center font-slabo text-4xl text-teal-500">
          Get started
        </h2>
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
        <div className="space-y-3">
          <Input
            type="text"
            label="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<RiMailFill />}
            placeholder="JohnDoe@example.com"
          />
          <Input
            type="password"
            label="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<RiLock2Fill />}
            placeholder="Minimum 6 characters"
          />
          <Input
            type="password"
            label="Confirm Password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={<RiLock2Fill />}
            placeholder="Confirm your password"
          />
        </div>

        <p className="my-3 text-center text-red-500">{'Wrong email format'}</p>
        <Button loading={false} full primary className="font-bold">
          Sign up
        </Button>
        <p className="mb-10 mt-3 text-center text-gray-400">
          Already have an account?
          <button
            onClick={() => {
              toggleSignupModal();
              toggleLoginModal();
            }}
          >
            <span className="ml-2 font-bold text-teal-500">Log in</span>
          </button>
        </p>
      </div>
      <div className="hidden overflow-hidden bg-teal-500 text-white md:col-span-2 md:block">
        <IdeaIllustration className="absolute -right-12 top-28 h-[450px] w-[400px]" />
      </div>
    </div>
  );
}
