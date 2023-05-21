import {
  ComponentPropsWithoutRef,
  ChangeEventHandler,
  KeyboardEventHandler,
  forwardRef,
} from 'react';
import clsx from 'clsx';
import { RiCloseCircleFill } from 'react-icons/ri';

interface TagInputProps extends ComponentPropsWithoutRef<'input'> {
  id: string;
  label: string;
  tags: string[];
  value: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onAddTag?: KeyboardEventHandler<HTMLInputElement>;
  onRemoveTag?: (index: number) => void;
}

const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      id,
      label,
      tags,
      value,
      error,
      disabled,
      placeholder,
      onChange,
      onAddTag,
      onRemoveTag,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        {...rest}
        ref={ref}
        className={clsx(
          rest.className,
          'my-2 text-gray-500 focus-within:text-teal-500',
          { 'pointer-events-none opacity-80': disabled }
        )}
      >
        <label htmlFor={id} className="mb-1 block font-bold ">
          {label}
        </label>
        <div className="flex flex-wrap border border-slate-500 p-1 focus-within:border-transparent focus-within:ring-2 focus-within:ring-teal-400">
          <ul className="flex flex-wrap">
            {tags?.map((tag, index) => (
              <li
                key={index}
                className="m-1 flex items-center gap-1 rounded-full bg-teal-500 p-2 pl-3 text-white"
              >
                <span className="tag-title">{tag}</span>
                <button onClick={() => onRemoveTag?.(index)}>
                  <RiCloseCircleFill className="text-2xl hover:text-gray-50" />
                </button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            id={id}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e)}
            onKeyUp={(e) => onAddTag?.(e)}
            className={clsx(
              rest.className,
              'w-[24ch] border-none text-black placeholder-slate-400 focus:outline-none focus:ring-0'
            )}
          />
        </div>
        <div className="mt-1 flex justify-between text-xs text-gray-400 md:text-sm">
          <span className="text-red-500">{error}</span>
          <span>{tags.length} / 5</span>
        </div>
      </div>
    );
  }
);

export default TagInput;
