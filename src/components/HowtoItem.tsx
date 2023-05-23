import { RiChat1Line, RiHeartLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import ReactTimeAgo from 'react-time-ago';

import { users, comments, Post } from '../dummyData';

type Props = {
  post: Post;
};

export default function HowToItem({ post }: Props) {
  const {
    id,
    createdAt,
    title,
    introduction,
    tags,
    authorId,
    image,
    likesCount,
  } = post;
  const user = users.find((user) => user.id === authorId);
  const commentsCount = comments.filter(
    (comment) => comment.postId === id
  ).length;

  return (
    <Link
      to={`/howtos/${id}`}
      className={clsx(
        'flex h-32 gap-2 rounded-xl bg-white p-2 shadow-basic hover:bg-gray-50 hover:shadow-teal',
        'md:h-fit md:gap-3 md:p-3'
      )}
    >
      <img
        src={image}
        alt="post-cover"
        className="aspect-square h-full rounded-md object-cover md:h-44"
      />
      <div className="flex flex-grow flex-col justify-between p-1">
        <div className="flex items-center justify-between text-xs text-gray-400 md:text-base">
          <div className="flex items-center gap-2">
            <img
              src={user?.avatar}
              alt="author-avatar"
              className="aspect-square h-5 w-5 rounded-full object-cover md:h-8 md:w-8"
            />
            <span className="truncate">{user?.name}</span>
          </div>
          <span className="flex-shrink-0">
            <ReactTimeAgo date={createdAt} locale="en-US" timeStyle="round" />
          </span>
        </div>
        <h3 className="line-clamp-2 font-bold md:text-xl">{title}</h3>
        <p className="hidden py-1 text-gray-400 xl:line-clamp-2">
          {introduction}
        </p>
        <div className="flex justify-between">
          <div className="mt-1 flex flex-wrap gap-1 text-xs text-teal-500 md:text-sm">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full border border-teal-500 px-1 md:px-2"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="hidden items-center justify-end gap-3 text-base text-gray-400 xl:flex">
            <div className="flex items-center gap-1">
              <RiChat1Line />
              {commentsCount}
            </div>
            <div className="flex items-center gap-1">
              <RiHeartLine />
              {likesCount}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 text-xs text-gray-400 xl:hidden">
          <div className="flex items-center gap-1">
            <RiChat1Line />
            {commentsCount}
          </div>
          <div className="flex items-center gap-1">
            <RiHeartLine />
            {likesCount}
          </div>
        </div>
      </div>
    </Link>
  );
}
