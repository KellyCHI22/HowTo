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
          'py-2 flex items-center justify-center gap-2',
          {
            'px-4 rounded-full': basic,
            'px-2 rounded-full': rounded,
            'w-full justify-center': full,
            'bg-white text-teal-500 border border-teal-500 hover:bg-slate-100':
              outline,
            'bg-teal-500 text-white hover:bg-teal-600': primary,
            'bg-white text-slate-400 border border-slate-400 hover:bg-slate-100':
              secondary,
            'opacity-80 pointer-events-none': loading,
          }
        )}
      >
        {children}
      </button>
    );
  }
);

export default Button;
