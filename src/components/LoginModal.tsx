import { useState } from 'react';
import Input from './elements/Input';
import { RiCloseFill, RiLock2Fill, RiMailFill } from 'react-icons/ri';
import Button from './elements/Button';
import { ReactComponent as WorkingIllustration } from '~/assets/illustration_working.svg';

type LoginModalProps = {
  toggleLoginModal: () => void;
  toggleSignupModal: () => void;
};

export default function LoginModal({
  toggleLoginModal,
  toggleSignupModal,
}: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="absolute left-0 top-0 flex min-h-screen w-screen flex-col justify-center bg-white p-5">
      <button
        type="button"
        className="absolute left-5 top-5 text-teal-500"
        onClick={toggleLoginModal}
      >
        <RiCloseFill className="text-3xl" />
      </button>
      <div className="text-center">
        <WorkingIllustration className="m-auto" />
      </div>
      <h2 className="mb-3 mt-5 text-center font-slabo text-4xl text-teal-500">
        Welcome back
      </h2>
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

      <p className="mb-3 mt-1 text-center text-red-500">
        {'Wrong email format'}
      </p>
      <Button loading={false} full primary className="font-bold">
        Log in
      </Button>
      <p className="mb-16 mt-3 text-center text-gray-400">
        Don't have an account yet?
        <button
          onClick={() => {
            toggleLoginModal();
            toggleSignupModal();
          }}
        >
          <span className="ml-2 font-bold text-teal-500">Sign up</span>
        </button>
      </p>
    </div>
  );
}
