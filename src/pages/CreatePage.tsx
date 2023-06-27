import { ChangeEvent, useRef, useState } from 'react';
import { Button, Input, Textarea } from '~/components/elements';
import TagInput from '~/components/TagInput';
import { useAutosizeTextArea } from '~/hooks';
import {
  RiArrowLeftLine,
  RiImageAddLine,
  RiDragDropLine,
  RiArrowGoBackLine,
  RiCheckLine,
  RiCloseFill,
} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import StepList, { Step } from '~/components/StepList';
import { useAddPostMutation } from '~/store';
import { serverTimestamp } from 'firebase/firestore/lite';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, storage } from '~/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function CreatePage() {
  const navigate = useNavigate();
  const [currentUser] = useAuthState(auth);
  const [errorMessage, setErrorMessage] = useState('');

  // title and intro
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const introRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(introRef.current, intro, 5);

  // image
  const defaultImage =
    'https://firebasestorage.googleapis.com/v0/b/howto-creative.appspot.com/o/logo_wbg.png?alt=media&token=9afe0ad1-011c-45a0-a983-14b002ee9668';
  const [image, setImage] = useState<null | File>(null);
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImage = e.target.files[0];
      const previewURL = URL.createObjectURL(e.target.files[0]);
      setImage(selectedImage);
      setImagePreview(previewURL);
    }
  };
  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(defaultImage);
  };

  // tags
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [tagError, setTagError] = useState('');
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };
  const removeTag = (indexToRemove: number) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const handleKeyboardAddTag = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
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

  const handleButtonAddTag = () => {
    if (tagInput.length > 20) {
      return setTagError('Tags cannot be longer than 20 characters');
    } else if (tags.length >= 5) {
      return setTagError('Cannot add more than 5 tags');
    } else if (tagInput !== '') {
      setTags([...tags, tagInput]);
      setTagInput('');
      setTagError('');
    }
  };

  // steps
  const [steps, setSteps] = useState<Step[]>([]);
  const handleStepsUpdate = (steps: Step[]) => setSteps(steps);

  // * submit
  const [addPost, results] = useAddPostMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    if (title.trim().length === 0) {
      return setErrorMessage('Title should not be blank');
    } else if (title.length > 50) {
      return setErrorMessage('Title cannot be more than 50 characters');
    } else if (intro.trim().length === 0) {
      return setErrorMessage('Introduction should not be blank');
    } else if (intro.length > 200) {
      return setErrorMessage('Introduction cannot be more than 200 characters');
    } else if (tags.length < 1) {
      return setErrorMessage('Please add at least one tag');
    } else if (steps.length < 1) {
      return setErrorMessage('Please add at least one step');
    } else if (steps.some((step) => step.description.trim().length === 0)) {
      return setErrorMessage('One or more steps are still empty');
    } else {
      setErrorMessage('');
    }

    if (currentUser) {
      setIsSubmitting(true);
      if (image !== null) {
        try {
          const imageRef = ref(
            storage,
            `posts-image/${image.name + crypto.randomUUID()}`
          );
          const snapshot = await uploadBytes(imageRef, image);
          const url = await getDownloadURL(snapshot.ref);
          const success = await addPost({
            createdAt: serverTimestamp(),
            title: title,
            introduction: intro,
            tags: tags,
            authorId: currentUser?.uid,
            image: url,
            commentsCount: 0,
            likesCount: 0,
            steps: steps,
          });
          if (success) {
            setIsSubmitting(false);
            return navigate('/howtos');
          }
        } catch {
          setIsSubmitting(false);
          return setErrorMessage('Something went wrong, please try again');
        }
      }
      try {
        const success = await addPost({
          createdAt: serverTimestamp(),
          title: title,
          introduction: intro,
          tags: tags,
          authorId: currentUser?.uid,
          image: defaultImage,
          commentsCount: 0,
          likesCount: 0,
          steps: steps,
        });
        if (success) return navigate('/howtos');
      } catch {
        return setErrorMessage('Something went wrong, please try again');
      }
    }
  };

  return (
    <div className="my-5 md:my-12">
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
        <h2 className="my-5 text-center text-2xl font-extrabold text-teal-500 md:text-3xl">
          Create How To...
        </h2>
        <div className="relative my-3 xl:hidden">
          <img
            src={imagePreview}
            alt="post-image"
            className="aspect-video w-full rounded-xl object-cover"
          />
          <div className="absolute inset-0 rounded-xl bg-black opacity-50"></div>
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex gap-2">
              <button className="cursor-pointer text-white hover:text-teal-500">
                <label htmlFor="image-input" className="cursor-pointer">
                  <RiImageAddLine className="text-2xl" />
                </label>
                <input
                  className="hidden"
                  name="image"
                  id="image-input"
                  placeholder="none"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </button>
              <button
                className="cursor-pointer text-white hover:text-teal-500"
                onClick={handleRemoveImage}
              >
                <RiCloseFill className="text-3xl" />
              </button>
            </div>
          </div>
        </div>

        <div className="xl:flex xl:gap-5">
          <div className="xl:flex-1">
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
              label="Introduction"
              value={intro}
              limit={200}
              rows={5}
              placeholder="Turn your cat into a DJ! Train them to respond to sounds, attach a collar with sensors..."
              onChange={(e) => setIntro(e.target.value)}
            />
          </div>
          <div className="relative my-3 hidden aspect-square w-[250px] xl:block">
            <img
              src={imagePreview}
              alt="post-image"
              className="h-full rounded-xl object-cover"
            />
            <div className="absolute inset-0 rounded-xl bg-black opacity-50"></div>
            <div className="absolute inset-0 grid place-items-center">
              <div className="flex gap-2">
                <button className="cursor-pointer text-white hover:text-teal-500">
                  <label htmlFor="image-input" className="cursor-pointer">
                    <RiImageAddLine className="text-2xl" />
                  </label>
                  <input
                    className="hidden"
                    name="image"
                    id="image-input"
                    placeholder="none"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </button>
                <button
                  className="cursor-pointer text-white hover:text-teal-500"
                  onClick={handleRemoveImage}
                >
                  <RiCloseFill className="text-3xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <TagInput
          id="tags"
          label="Tags"
          tags={tags}
          value={tagInput}
          error={tagError}
          placeholder="Press enter to add tags..."
          onButtonAddTag={handleButtonAddTag}
          onKeyboardAddTag={handleKeyboardAddTag}
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
        <StepList steps={steps} handleStepsUpdate={handleStepsUpdate} />

        {/* confirm part */}
        <p className="my-5 text-center text-red-500">{errorMessage}</p>
        <div className="flex justify-end gap-2">
          <Button
            loading={false}
            secondary
            rounded
            onClick={() => {
              const response = confirm(
                'Are you sure to leave the page? (all the input will be gone)'
              );
              if (response) {
                navigate(-1);
              }
            }}
          >
            <RiArrowGoBackLine className="text-2xl" />
          </Button>
          <Button
            loading={results.isLoading || isSubmitting}
            primary
            basic
            onClick={handleSubmit}
            className="font-bold"
          >
            <RiCheckLine className="text-2xl" />
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
