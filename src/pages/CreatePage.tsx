import { useRef, useState } from 'react';
import Input from '~/components/elements/Input';
import TagInput from '~/components/elements/TagInput';
import Textarea from '~/components/elements/Textarea';
import useAutosizeTextArea from '~/hooks/useAutosizeTextArea';
import {
  RiArrowLeftLine,
  RiImageAddLine,
  RiDragDropLine,
  RiArrowGoBackLine,
  RiCheckLine,
} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import StepList from '~/components/StepList';
import Button from '~/components/elements/Button';

export default function CreatePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const introRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(introRef.current, intro, 5);
  const [tags, setTags] = useState<string[]>(['apple', 'banana', 'orange']);
  const [tagInput, setTagInput] = useState('');
  const [tagError, setTagError] = useState('');
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };
  const removeTag = (indexToRemove: number) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (tagInput.length > 20) {
        return setTagError('Tags cannot be longer than 20 characters');
      } else if (tags.length >= 5) {
        return setTagError('Cannot add more than 5 tags');
      } else if (tagInput !== '') {
        setTags([...tags, tagInput]);
        setTagInput('');
        setTagError('');
      }
    }
  };

  return (
    <div className="m-5">
      {/* content part */}
      <div className="mb-5 rounded-xl bg-white p-5 shadow-basic">
        <button
          className="absolute mr-1 text-gray-400"
          onClick={() => {
            navigate(-1);
          }}
        >
          <RiArrowLeftLine className="text-2xl" />
        </button>
        <h2 className="my-5 text-center text-2xl font-extrabold text-teal-500">
          Create How To...
        </h2>
        <div className="relative my-3">
          <img
            src="https://picsum.photos/id/200/500/300"
            alt=""
            className="w-full rounded-xl object-cover"
          />
          <div className="absolute inset-0 rounded-xl bg-black opacity-50"></div>
          <div className="absolute inset-0 grid place-items-center">
            <button className="text-white hover:text-teal-500">
              <RiImageAddLine className="text-2xl " />
            </button>
          </div>
        </div>

        <Input
          type="text"
          id="title"
          label="Title"
          value={title}
          limit={50}
          placeholder="How to turn your cat into a DJ..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          id="intro"
          ref={introRef}
          label="Intro"
          value={intro}
          limit={200}
          rows={5}
          placeholder="Turn your cat into a DJ! Train them to respond to sounds, attach a collar with sensors..."
          onChange={(e) => setIntro(e.target.value)}
        />
        <TagInput
          id="tags"
          label="Tags"
          tags={tags}
          value={tagInput}
          error={tagError}
          placeholder="Press enter to add tags..."
          onAddTag={addTag}
          onRemoveTag={removeTag}
          onChange={handleTagInputChange}
        />
      </div>

      {/* steps part */}
      <div className="mb-5 rounded-xl bg-white p-5 shadow-basic">
        <h3 className="my-2 text-center text-2xl font-extrabold text-teal-500">
          Write down the steps...
        </h3>
        <p className="mb-5 text-center text-gray-400">
          <RiDragDropLine className="inline text-xl" /> Drag and drop to
          re-order!
        </p>
        <StepList />

        {/* confirm part */}
        <div className="mt-10 flex justify-end gap-2">
          <Button loading={false} secondary rounded>
            <RiArrowGoBackLine className="text-2xl" />
          </Button>
          <Button loading={false} primary basic className="">
            <RiCheckLine className="text-2xl" />
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
