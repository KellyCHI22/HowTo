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
import { useEffect, useRef, useState } from 'react';
import Textarea from '../elements/Textarea';
import useAutosizeTextArea from '~/hooks/useAutosizeTextArea';
import Tag from '../elements/Tag';
import TagInput from '../elements/TagInput';

export default function RootLayout() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [intro, setIntro] = useState('');
  const introRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(introRef.current, intro, 5);

  // tag
  const [tags, setTags] = useState<string[]>(['apple', 'banana', 'orange']);
  const [newTag, setNewTag] = useState('');
  const [tagError, setTagError] = useState('');
  const removeTag = (indexToRemove: number) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (newTag.length > 20) {
        return setTagError('Tags cannot be longer than 20 characters');
      } else if (tags.length >= 5) {
        return setTagError('Cannot add more than 5 tags');
      } else if (newTag !== '') {
        setTags([...tags, newTag]);
        setNewTag('');
        setTagError('');
      }
    }
  };

  return (
    <>
      <nav className="flex items-center gap-2">
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
      </nav>
      <div className="w-48">
        <Button loading={false} full outline rounded>
          Full width
        </Button>
        <Button loading={false} full primary>
          Full width
        </Button>
      </div>
      <div className="grid h-36 w-48 place-items-center">
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
        <Button loading={false} full primary>
          Sign up
        </Button>
        <Textarea
          id="intro"
          value={intro}
          rows={5}
          ref={introRef}
          onChange={(e) => setIntro(e.target.value)}
          limit={200}
          placeholder="Turn your cat into a DJ! Train them to respond sounds, attach a collar with sensors..."
        />
      </div>
      <div className="w-96">
        <div className="flex flex-wrap gap-2">
          <Tag label="hello" />
          <Tag label="strawberry" />
          <Tag label="another" />
          <Tag label="another" />
          <Tag label="another" />
          <Tag label="another" />
          <Tag label="another" />
          <Tag label="another" />
        </div>
        <div className="mx-5">
          <TagInput
            label="Tags"
            id="tags"
            tags={tags}
            value={newTag}
            error={tagError}
            onAddTag={addTag}
            onRemoveTag={removeTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Press enter to add tags"
          />
        </div>
        {tags.toString()}
      </div>

      {/* <Outlet /> */}
    </>
  );
}
