import {
  ComponentPropsWithoutRef,
  ChangeEventHandler,
  forwardRef,
} from 'react';
import clsx from 'clsx';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  type: 'text' | 'password';
  id: string;
  label: string;
  value: string;
  limit?: number;
  icon?: JSX.Element;
  disabled?: boolean;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, label, value, limit, icon, disabled, placeholder, onChange, ...rest },
    ref
  ) => {
    return (
      <div
        className={clsx(
          rest.className,
          'my-2 text-gray-500 focus-within:text-teal-500',
          { 'pointer-events-none opacity-80': disabled }
        )}
      >
        <label htmlFor={id} className="mb-1 block font-bold ">
          {label}
        </label>
        <div className="flex items-center border border-slate-400 focus-within:border-transparent focus-within:ring-2 focus-within:ring-teal-400">
          {icon ? (
            <div className="pl-3 text-xl text-gray-400">{icon}</div>
          ) : null}
          <input
            {...rest}
            id={id}
            value={value}
            ref={ref}
            placeholder={placeholder}
            onChange={onChange}
            className={clsx(
              rest.className,
              'w-full border-none py-3 text-black placeholder-slate-400 focus:outline-none focus:ring-0',
              {
                '': disabled,
              }
            )}
          />
        </div>
        {limit ? (
          <div className="mt-1 flex justify-end text-xs text-gray-400">
            <span>
              {value.length} / {limit}
            </span>
          </div>
        ) : null}
      </div>
    );
  }
);

export default Input;
