import { useState, useRef, ChangeEvent, useLayoutEffect } from 'react';
import {
  RiArrowLeftLine,
  RiImageAddLine,
  RiDragDropLine,
  RiArrowGoBackLine,
  RiCheckLine,
  RiDeleteBin6Line,
  RiCloseFill,
} from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import StepList, { Step } from '~/components/StepList';
import Button from '~/components/elements/Button';
import Input from '~/components/elements/Input';
import Spinner from '~/components/elements/Spinner';
import TagInput from '~/components/elements/TagInput';
import Textarea from '~/components/elements/Textarea';
import useAutosizeTextArea from '~/hooks/useAutosizeTextArea';
import { useFetchPostsQuery, useUpdatePostMutation } from '~/store';
import { Post } from '~/store/apis/postsApi';
import getImageUrl from '~/utils/getImageUrl';

export default function EditHowToPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  // * title and intro
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const introRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(introRef.current, intro, 5);

  // * image
  const [image, setImage] = useState<null | File>(null);
  const [imagePreview, setImagePreview] = useState('');
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
    setImagePreview(post?.image);
  };

  // * tags
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

  // * steps
  const [steps, setSteps] = useState<Step[]>([]);
  const handleStepsUpdate = (steps: Step[]) => setSteps(steps);

  // * load post data
  const {
    data: postsData,
    error: errorPostsData,
    isLoading: isLoadingPostsData,
  } = useFetchPostsQuery();

  const post = postsData?.find((post) => post.id === id) as Post;

  useLayoutEffect(() => {
    if (postsData) {
      setTitle(post?.title);
      setIntro(post?.introduction);
      setImagePreview(post?.image);
      setTags(post?.tags);
      setSteps(post?.steps);
    }
  }, [postsData, post]);

  // * submit
  const [updatePost, results] = useUpdatePostMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    if (post) {
      if (title.trim().length === 0) {
        return setErrorMessage('Title should not be blank');
      } else if (title.length > 50) {
        return setErrorMessage('Title cannot be more than 50 characters');
      } else if (intro.trim().length === 0) {
        return setErrorMessage('Introduction should not be blank');
      } else if (intro.length > 200) {
        return setErrorMessage(
          'Introduction cannot be more than 200 characters'
        );
      } else if (tags.length < 1) {
        return setErrorMessage('Please add at least one tag');
      } else if (steps.length < 1) {
        return setErrorMessage('Please add at least one step');
      } else if (steps.some((step) => step.description.trim().length === 0)) {
        return setErrorMessage('One or more steps are still empty');
      } else {
        setErrorMessage('');
      }

      try {
        setIsSubmitting(true);
        const url = await getImageUrl(image, 'posts-image');
        const success = await updatePost([
          post.id,
          {
            title: title,
            introduction: intro,
            tags: tags,
            image: url ? url : post.image,
            steps: steps,
          },
        ]);
        if (success) {
          setIsSubmitting(false);
          return navigate('/howtos');
        }
      } catch {
        setIsSubmitting(false);
        return setErrorMessage('Something went wrong, please try again');
      }
    }
  };

  if (isLoadingPostsData || errorPostsData) {
    return (
      <div className="my-5 grid h-96 w-full place-items-center rounded-lg bg-white md:my-12">
        <Spinner />
      </div>
    );
  }

  if (errorPostsData) {
    console.log(errorPostsData);
  }

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
          Edit How To...
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
              label="Intro"
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
        <div className="relative mt-10 flex justify-end gap-2">
          <Button loading={false} danger rounded className="absolute left-0">
            <RiDeleteBin6Line className="text-2xl" />
          </Button>
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
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
