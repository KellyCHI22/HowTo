import {
  ComponentPropsWithoutRef,
  ChangeEventHandler,
  KeyboardEventHandler,
  forwardRef,
  MouseEventHandler,
} from 'react';
import clsx from 'clsx';
import { RiCloseCircleFill, RiAddFill } from 'react-icons/ri';
import Button from './Button';

interface TagInputProps extends ComponentPropsWithoutRef<'input'> {
  id: string;
  label: string;
  tags: string[];
  value: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onButtonAddTag?: MouseEventHandler<HTMLButtonElement>;
  onKeyboardAddTag?: KeyboardEventHandler<HTMLInputElement>;
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
      onButtonAddTag,
      onKeyboardAddTag,
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
        <div className="relative flex flex-wrap items-center border border-slate-400 p-1 focus-within:border-transparent focus-within:ring-2 focus-within:ring-teal-400">
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
            onKeyUp={(e) => onKeyboardAddTag?.(e)}
            className={clsx(
              rest.className,
              'my-1 w-[23ch] border-none text-black placeholder-slate-400 focus:outline-none focus:ring-0'
            )}
          />
          <Button
            loading={false}
            outline
            rounded
            onClick={onButtonAddTag}
            className="absolute bottom-2 right-2"
          >
            <RiAddFill className="text-2xl" />
          </Button>
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
