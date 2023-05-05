import { Link, Outlet } from 'react-router-dom';
import Button from '~/components/elements/Button';
import Spinner from '../elements/Spinner';
import {
  RiArrowRightLine,
  RiThumbUpFill,
  RiHeartLine,
  RiArrowGoBackLine,
} from 'react-icons/ri';

export default function RootLayout() {
  return (
    <>
      <header className="flex gap-2 items-center">
        This is a logo
        <Link to="/search">Search something</Link>
        <Button loading={false} primary basic>
          Get started <RiArrowRightLine className="inline text-2xl" />
        </Button>
        <Button loading={false} outline basic>
          Nice <RiThumbUpFill className="inline text-xl" />
        </Button>
        <Button loading={true} outline rounded>
          <RiHeartLine className="inline text-2xl" />
        </Button>
        <Button loading={false} secondary rounded>
          <RiArrowGoBackLine className="inline text-2xl" />
        </Button>
        <Button loading={false} secondary basic>
          Back <RiArrowGoBackLine className="inline text-2xl" />
        </Button>
        <Button loading={false} primary rounded>
          <RiHeartLine className="inline text-2xl" />
        </Button>
      </header>
      <div className="w-48">
        <Button loading={false} full outline rounded>
          Full width
        </Button>
        <Button loading={false} full primary>
          Full width
        </Button>
      </div>
      <div className="w-48 h-36 grid place-items-center">
        <Spinner />
      </div>
      <Outlet />
    </>
  );
}
