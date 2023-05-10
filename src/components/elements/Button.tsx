import {
  ComponentPropsWithoutRef,
  MouseEventHandler,
  ReactNode,
  forwardRef,
} from 'react';
import clsx from 'clsx';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  loading: boolean;
  children?: ReactNode;
  primary?: boolean;
  outline?: boolean;
  secondary?: boolean;
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
            'rounded-full px-3 py-3': rounded,
            'w-full justify-center py-3': full,
            'border border-teal-500 bg-white text-teal-500 hover:bg-slate-100':
              outline,
            'bg-teal-500 text-white hover:bg-teal-600': primary,
            'border border-slate-400 bg-white text-slate-400 hover:bg-slate-100':
              secondary,
            'pointer-events-none opacity-80': loading,
          }
        )}
      >
        {children}
      </button>
    );
  }
);

export default Button;
