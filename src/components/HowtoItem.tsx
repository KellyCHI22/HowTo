import { RiChat1Line, RiHeartLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export default function HowToItem() {
  return (
    <Link
      to="/howtos/123"
      className="flex h-32 gap-2 rounded-xl bg-white p-2 shadow-basic hover:bg-slate-50  hover:shadow-teal"
    >
      <img
        src="https://picsum.photos/id/200/500/300"
        alt="post-cover"
        className="aspect-square h-full rounded-md object-cover"
      />
      <div className="flex flex-col justify-between">
        <div className="flex items-center justify-between text-xxs text-slate-400">
          <div className="flex items-center gap-1">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
              alt="author-avatar"
              className="aspect-square h-5 w-5 rounded-full object-cover"
            />
            <span>Betty Liang</span>
          </div>
          <span>3 hours ago</span>
        </div>
        <h3 className="font-bold">How to turn your cat into DJ?</h3>
        <div className="mt-1 flex gap-1 text-xxs text-teal-500">
          <span className="rounded-full border border-teal-500 px-1">cat</span>
          <span className="rounded-full border border-teal-500 px-1">
            funny
          </span>
          <span className="rounded-full border border-teal-500 px-1">
            music
          </span>
        </div>
        <div className="flex items-center justify-end gap-2 text-xs text-slate-400">
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
