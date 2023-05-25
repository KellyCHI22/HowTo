import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
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
import { addDoc, collection } from 'firebase/firestore';
import { User } from '~/dummyData';

const FIREBASE_ERRORS = {
  'Firebase: Error (auth/email-already-in-use).':
    'A user with that email already exists',
  'Firebase: Error (auth/user-not-found).': 'Invalid email or password',
  'Firebase: Error (auth/wrong-password).': 'Invalid email or password',
  'Firebase: Error (auth/invalid-email).': 'Invalid email or password',
  'Firebase: Password should be at least 6 characters (auth/weak-password).':
    'Password should be at least 6 characters ',
};
const defaultImage =
  'https://firebasestorage.googleapis.com/v0/b/howto-creative.appspot.com/o/logo_wbg.png?alt=media&token=9afe0ad1-011c-45a0-a983-14b002ee9668';

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
  const [signupError, setSignupError] = useState('');

  const [
    createUserWithEmailAndPassword,
    createdUserCred,
    loadingCreateUser,
    errorCreateUser,
  ] = useCreateUserWithEmailAndPassword(auth);

  const handleSignup = async () => {
    setSignupError('');
    if (name.trim().length === 0) {
      return setSignupError('Name cannot be blank');
    } else if (name.trim().length > 50) {
      return setSignupError('Name cannot be more than 50 characters long');
    } else if (email.trim().length === 0) {
      return setSignupError('Email cannot be blank');
    } else if (password.trim().length === 0) {
      return setSignupError('Password cannot be blank');
    } else if (confirmPassword !== password) {
      return setSignupError('Please confirm your password again');
    }

    try {
      const success = await createUserWithEmailAndPassword(email, password);
      if (success) {
        alert('Account created, you are logged in');
      } else {
        console.log(errorCreateUser?.message);
      }
    } catch (err) {
      return console.log(err);
    }
  };

  const createUserDocument = async (user: User) => {
    await addDoc(collection(db, 'users'), JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (createdUserCred) {
      console.log('useEffect runs');
      createUserDocument({
        uid: createdUserCred.user.uid,
        createdAt: createdUserCred.user.metadata.creationTime as string,
        name: name,
        email: createdUserCred.user.email as string,
        bio: 'I am happy to join the HowTo community!',
        avatar: defaultImage,
        cover_image: defaultImage,
        followers: [],
        following: [],
        likedPosts: [],
        bookmarkedPosts: [],
      });
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setSignupError('');
      toggleSignupModal();
    }
  }, [createdUserCred]);

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

        <p className="my-3 text-center text-red-500">
          {/* if there's signupError show signupError, if there's firebase error show firebase error instead */}
          {signupError
            ? signupError
            : errorCreateUser &&
              `${
                FIREBASE_ERRORS[
                  errorCreateUser.message as keyof typeof FIREBASE_ERRORS
                ]
              }`}
        </p>
        <Button
          loading={loadingCreateUser}
          full
          primary
          className="font-bold"
          onClick={handleSignup}
        >
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
