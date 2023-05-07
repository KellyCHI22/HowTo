import { Link, Outlet } from 'react-router-dom';
import Button from '../elements/Button';
import Spinner from '../elements/Spinner';
import {
  RiArrowRightLine,
  RiThumbUpFill,
  RiHeartLine,
  RiArrowGoBackLine,
  RiMailFill,
  RiLock2Fill,
  RiAccountCircleFill,
} from 'react-icons/ri';
import Input from '../elements/Input';
import { IconType } from 'react-icons';
import { useState } from 'react';

export default function RootLayout() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

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
      <div className="w-72">
        <Input
          type="text"
          label="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<RiMailFill />}
          placeholder="JohnDoe@example.com"
          disabled
        />
        <Input
          type="password"
          label="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // icon={<RiLock2Fill />}
          placeholder="Minimum 6 characters"
        />
        <Input
          type="text"
          label="Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={<RiAccountCircleFill />}
          placeholder="John Doe"
          limit={25}
        />
      </div>
      {/* <Outlet /> */}
    </>
  );
}
