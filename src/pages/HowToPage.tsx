import { useState, useRef } from 'react';
import {
  RiArrowLeftLine,
  RiChat1Line,
  RiEdit2Line,
  RiHeartLine,
  RiBookmark2Line,
  RiSendPlaneFill,
  RiMoreLine,
  RiDeleteBin6Line,
  RiArrowGoBackLine,
  RiCheckLine,
} from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import Button from '~/components/elements/Button';
import Tag from '~/components/elements/Tag';
import Textarea from '~/components/elements/Textarea';
import useAutosizeTextArea from '~/hooks/useAutosizeTextArea';

export default function HowToPage() {
  const { id } = useParams();
  const [showOption, setShowOption] = useState(false);
  const handleShowOption = () => setShowOption((prev) => !prev);

  return (
    <div className="m-5">
      <div className="mb-5 space-y-3 rounded-xl bg-white p-5 shadow-basic">
        <div className="flex justify-between text-teal-500">
          <button>
            <Link to="/howtos">
              <RiArrowLeftLine className="text-2xl" />
            </Link>
          </button>

          <button className="relative" onClick={handleShowOption}>
            <RiMoreLine className="text-2xl" />
            {showOption && (
              <div className="absolute -left-16 top-6 rounded-lg bg-white p-1 text-left text-sm shadow-2xl shadow-gray-400">
                <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1 hover:bg-gray-50">
                  <RiEdit2Line className="text-xl" />
                  Edit
                </button>
                <button className="flex items-center gap-2 rounded-lg px-2 py-1 text-red-400 hover:bg-gray-50">
                  <RiDeleteBin6Line className="text-xl" />
                  Delete
                </button>
              </div>
            )}
          </button>
        </div>
        <img
          src="https://picsum.photos/id/200/500/300"
          alt=""
          className="w-full rounded-xl object-cover"
        />
        <div className="flex items-center justify-between text-sm ">
          <div className="flex items-center gap-2">
            <Link to={`/users/${id}`}>
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
                alt="author-avatar"
                className="aspect-square h-8 w-8 rounded-full object-cover"
              />
            </Link>
            <span>Betty Liang</span>
          </div>
          <span className="text-slate-400">3 hours ago</span>
        </div>
        <h2 className="text-2xl font-extrabold text-teal-500">
          How To Turn Your Cat into a DJ?
        </h2>
        <div className="flex flex-wrap items-center gap-2 text-sm leading-3">
          <Tag label="cat" />
          <Tag label="music" />
          <Tag label="funny" />
        </div>
        <p className="text-sm italic text-slate-600">
          Turn your cat into a DJ! Train them to respond to sounds, attach a
          collar with sensors to trigger turntables & mixer, watch them mix
          beats & become internet famous.
        </p>
        <div className="space-y-3 pt-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-teal-500 text-teal-500">
              1
            </span>
            <p>Buy a set of DJ turntables and a mixer.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-teal-500 text-teal-500">
              2
            </span>
            <p>Train your cat to respond to certain sounds or commands.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-teal-500 text-teal-500">
              3
            </span>
            <p>
              Attach a special collar with sensors that can trigger the
              turntables and mixer.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-teal-500 text-teal-500">
              4
            </span>
            <p>Play music and watch your cat scratch and mix the beats. </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-teal-500 text-teal-500">
              5
            </span>
            <p>Upload the videos to social media and become internet famous.</p>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center justify-end gap-3 text-slate-400">
              <div className="flex items-center gap-1">
                <RiChat1Line />5
              </div>
              <div className="flex items-center gap-1">
                <RiHeartLine />6
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button loading={false} outline rounded>
              <RiHeartLine className="text-2xl" />
            </Button>
            <Button loading={false} outline rounded>
              <RiBookmark2Line className="text-2xl" />
            </Button>
          </div>
        </div>
      </div>
      {/* comments */}
      <div className="space-y-3">
        <CommentItem />
        <CommentItem />
      </div>

      {/* comment input */}
      <CommentInput />
    </div>
  );
}

function CommentItem() {
  const [showOption, setShowOption] = useState(false);
  const handleShowOption = () => setShowOption((prev) => !prev);
  const [isEditMode, setIsEditMode] = useState(false);
  const handleEditMode = () => setIsEditMode((prev) => !prev);
  const [commentEditInput, setCommentEditInput] = useState('');
  const commentEditRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(commentEditRef.current, commentEditInput, 3);

  return (
    <>
      {isEditMode ? (
        <div className="relative mt-3 flex gap-3 rounded-xl bg-white p-5 text-sm shadow-basic">
          <Link to="#" className="flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
              alt="author-avatar"
              className="aspect-square h-8 w-8 rounded-full object-cover"
            />
          </Link>
          <div className="flex flex-1 flex-col">
            <Textarea
              id="commentInput"
              value={commentEditInput}
              ref={commentEditRef}
              rows={3}
              placeholder="Edit your comment..."
              className="text-sm"
              onChange={(e) => setCommentEditInput(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button
                loading={false}
                danger
                rounded
                className="absolute left-4"
              >
                <RiDeleteBin6Line className="text-xl" />
              </Button>
              <Button
                loading={false}
                secondary
                rounded
                onClick={handleEditMode}
              >
                <RiArrowGoBackLine className="text-xl" />
              </Button>
              <Button loading={false} primary basic className="">
                <RiCheckLine className="text-xl" />
                Save
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-3 rounded-xl bg-white p-5 text-sm shadow-basic">
          <Link to="#" className="flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
              alt="author-avatar"
              className="aspect-square h-8 w-8 rounded-full object-cover"
            />
          </Link>
          <div>
            <div className="relative space-x-2 text-slate-400">
              <span className="font-bold text-slate-900">Betty Liang</span>
              <span>3 hours ago</span>

              <button
                className="absolute right-0 top-0 text-teal-500"
                onClick={handleShowOption}
              >
                <RiMoreLine className="text-2xl" />
                {showOption && (
                  <div className="absolute -left-16 top-6 rounded-lg bg-white p-1 text-left shadow-2xl shadow-gray-400">
                    <button
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-1 hover:bg-gray-50"
                      onClick={handleEditMode}
                    >
                      <RiEdit2Line className="text-xl" />
                      Edit
                    </button>
                    <button className="flex items-center gap-2 rounded-lg px-2 py-1 text-red-400 hover:bg-gray-50">
                      <RiDeleteBin6Line className="text-xl" />
                      Delete
                    </button>
                  </div>
                )}
              </button>
            </div>
            <p className="mt-3 text-slate-900">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expl
              laboriosam veritatis nulla expedita placeat vel distinctio.
            </p>
          </div>
        </div>
      )}

      {/* edit mode */}
    </>
  );
}

function CommentInput() {
  const [commentInput, setCommentInput] = useState('');
  const commentRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(commentRef.current, commentInput, 3);

  return (
    <div className="mt-3 flex gap-3 rounded-xl bg-white p-5 text-sm shadow-basic">
      <Link to="#" className="flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
          alt="author-avatar"
          className="aspect-square h-8 w-8 rounded-full object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col">
        <Textarea
          id="commentInput"
          value={commentInput}
          ref={commentRef}
          rows={3}
          placeholder="Add a comment..."
          className="text-sm"
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <Button loading={false} primary basic className="self-end">
          <RiSendPlaneFill />
          Send
        </Button>
      </div>
    </div>
  );
}
