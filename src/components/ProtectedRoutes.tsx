import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { auth } from '~/firebase';
import { ReactComponent as PresentationIllustration } from '~/assets/illustration_presentation.svg';
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiEyeOffLine,
} from 'react-icons/ri';
import Button from './elements/Button';
import { ContextType } from './layouts/RootLayout';
import Spinner from './elements/Spinner';

export default function ProtectedRoutes() {
  const [currentUser, loadingCurrentUser, errorCurrentUser] =
    useAuthState(auth);

  if (loadingCurrentUser)
    return (
      <div className="my-5 grid h-96 w-full place-items-center rounded-lg bg-white md:my-12">
        <Spinner />
      </div>
    );

  return currentUser ? <Outlet /> : <ShouldLogIn />;
}

function ShouldLogIn() {
  const navigate = useNavigate();
  const { handleToggleLoginModal, handleToggleSignupModal } =
    useOutletContext<ContextType>();

  return (
    <div className="my-5 md:my-12">
      <div className="relative flex flex-col items-center rounded-xl bg-white px-5 py-10 shadow-basic ">
        <button
          className="absolute left-5 top-5 text-gray-400"
          onClick={() => {
            navigate(-1);
          }}
        >
          <RiArrowLeftLine className="text-2xl" />
        </button>
        <div className="text-center text-lg text-teal-500">
          <h2 className="mb-2 font-mulish text-3xl font-bold">Opps!</h2>
          <p>
            <RiEyeOffLine className="mr-3 inline" />
            You need to be logged in to view this page
          </p>
        </div>
        <PresentationIllustration className="my-3 w-[250px] text-teal-500" />
        <div className="flex gap-2">
          <Button
            loading={false}
            basic
            outline
            onClick={handleToggleLoginModal}
          >
            Log in
          </Button>
          <Button
            loading={false}
            basic
            primary
            onClick={handleToggleSignupModal}
            className="font-bold"
          >
            Get started
            <RiArrowRightLine className="text-xl" />
          </Button>
        </div>
      </div>
    </div>
  );
}
