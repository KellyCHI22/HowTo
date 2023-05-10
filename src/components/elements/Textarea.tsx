import {
  ComponentPropsWithoutRef,
  ChangeEventHandler,
  forwardRef,
} from 'react';
import clsx from 'clsx';

interface TextAreaProps extends ComponentPropsWithoutRef<'textarea'> {
  id: string;
  label?: string;
  value: string;
  rows: number;
  limit?: number;
  disabled?: boolean;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { id, label, value, rows, limit, disabled, placeholder, onChange, ...rest },
    ref
  ) => {
    return (
      <div
        className={clsx(
          rest.className,
          'my-2 text-slate-600 focus-within:text-teal-500',
          { 'pointer-events-none opacity-80': disabled }
        )}
      >
        <label htmlFor={id} className="mb-1 block font-bold ">
          {label}
        </label>
        <div className="flex items-center border border-slate-500 focus-within:border-transparent focus-within:ring-2 focus-within:ring-teal-400">
          <textarea
            {...rest}
            id={id}
            value={value}
            rows={rows}
            ref={ref}
            placeholder={placeholder}
            onChange={onChange}
            className={clsx(
              rest.className,
              'w-full resize-none border-none text-black placeholder-slate-400 focus:outline-none focus:ring-0',
              {
                '': disabled,
              }
            )}
          />
        </div>
        {limit ? (
          <div className="mt-1 flex justify-end text-xs text-slate-400">
            <span>
              {value.length}/{limit}
            </span>
          </div>
        ) : null}
      </div>
    );
  }
);

export default Textarea;