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
  limit?: number;
  disabled?: boolean;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { id, label, value, limit, disabled, placeholder, onChange, ...rest },
    ref
  ) => {
    return (
      <div
        className={clsx(
          rest.className,
          'text-slate-600 focus-within:text-teal-500 my-2',
          { 'pointer-events-none opacity-80': disabled }
        )}
      >
        <label htmlFor={id} className="block font-bold mb-1 ">
          {label}
        </label>
        <div className="flex items-center border border-slate-500 focus-within:ring-teal-400 focus-within:ring-2 focus-within:border-transparent">
          <textarea
            {...rest}
            id={id}
            value={value}
            rows={1}
            ref={ref}
            placeholder={placeholder}
            onChange={onChange}
            className={clsx(
              rest.className,
              'w-full border-none placeholder-slate-400 focus:outline-none focus:ring-0 text-black resize-none',
              {
                '': disabled,
              }
            )}
          />
        </div>
        {limit ? (
          <div className="flex justify-end text-xs text-slate-400 mt-1">
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
