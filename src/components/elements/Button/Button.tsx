import {
  ComponentPropsWithoutRef,
  MouseEventHandler,
  ReactNode,
  forwardRef,
} from 'react';
import clsx from 'clsx';
import { RiLoader4Fill } from 'react-icons/ri';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  loading: boolean;
  children?: ReactNode;
  primary?: boolean;
  outline?: boolean;
  secondary?: boolean;
  danger?: boolean;
  basic?: boolean;
  rounded?: boolean;
  full?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      primary,
      outline,
      secondary,
      danger,
      basic,
      rounded,
      full,
      loading,
      onClick,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        {...rest}
        disabled={loading}
        onClick={onClick}
        ref={ref}
        className={clsx(
          rest.className,
          'flex items-center justify-center gap-2',
          {
            'rounded-full px-4 py-2': basic,
            'rounded-full px-2 py-2': rounded,
            'w-full justify-center py-3': full,
            'border border-teal-500 bg-white text-teal-500 hover:bg-gray-50':
              outline,
            'bg-teal-500 text-white hover:bg-teal-600': primary,
            'border border-slate-400 bg-white text-gray-400 hover:bg-gray-50':
              secondary,
            'border border-red-400 bg-white text-red-400 hover:bg-gray-50':
              danger,
            'pointer-events-none opacity-80': loading,
          }
        )}
      >
        {loading ? (
          <RiLoader4Fill
            data-testid="loader-element"
            className="animate-spin text-2xl"
          />
        ) : (
          children
        )}
      </button>
    );
  }
);

export default Button;
