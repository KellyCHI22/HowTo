import { RiChat1Line, RiHeartLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export default function HowToItem() {
  return (
    <Link
      to="/howtos/123"
      className={clsx(
        'flex h-32 gap-2 rounded-xl bg-white p-2 shadow-basic hover:bg-gray-50 hover:shadow-teal',
        'md:h-fit md:gap-3 md:p-3'
      )}
    >
      <img
        src="https://picsum.photos/id/200/500/300"
        alt="post-cover"
        className="aspect-square h-full rounded-md object-cover md:h-44"
      />
      <div className="flex flex-grow flex-col justify-between p-1">
        <div className="flex items-center justify-between text-xs text-gray-400 md:text-base">
          <div className="flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
              alt="author-avatar"
              className="aspect-square h-5 w-5 rounded-full object-cover md:h-8 md:w-8"
            />
            <span>Betty Liang</span>
          </div>
          <span>3 hours ago</span>
        </div>
        <h3 className="font-bold md:text-xl">
          How to turn your cat into a DJ?
        </h3>
        <p className="hidden py-1 text-gray-400 xl:block">
          Are you tired of your cat just lazing around all day? Learn how to
          turn your cat into a DJ with turntables, a collar, and some training.
          Upload videos to social media and become internet famous!
        </p>
        <div className="flex justify-between">
          <div className="mt-1 flex gap-1 text-xs text-teal-500 md:text-sm">
            <span className="rounded-full border border-teal-500 px-1 md:px-2">
              cat
            </span>
            <span className="rounded-full border border-teal-500 px-1 md:px-2">
              funny
            </span>
            <span className="rounded-full border border-teal-500 px-1 md:px-2">
              music
            </span>
          </div>
          <div className="hidden items-center justify-end gap-3 text-base text-gray-400 xl:flex">
            <div className="flex items-center gap-1">
              <RiChat1Line />5
            </div>
            <div className="flex items-center gap-1">
              <RiHeartLine />6
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 text-xs text-gray-400 xl:hidden">
          <div className="flex items-center gap-1">
            <RiChat1Line />5
          </div>
          <div className="flex items-center gap-1">
            <RiHeartLine />6
          </div>
        </div>
      </div>
    </Link>
  );
}
