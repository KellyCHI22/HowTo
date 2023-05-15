import { useState } from 'react';
import clsx from 'clsx';
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
    <>
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
            onClick={toggleLoginModal}
          >
            <RiCloseFill className="text-3xl" />
          </button>
          <div className="text-center text-teal-500">
            <WorkingIllustration className="m-auto md:hidden" />
          </div>
          <h2 className="mb-3 mt-16 text-center font-slabo text-4xl text-teal-500">
            Welcome back
          </h2>
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
          </div>

          <p className="my-3 text-center text-red-500">
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
        <div className="hidden overflow-hidden bg-teal-500 text-white md:col-span-2 md:block">
          <WorkingIllustration className="mt-32 h-[320px] w-[330px]" />
        </div>
      </div>
    </>
  );
}
