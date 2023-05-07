import { ComponentPropsWithoutRef, forwardRef } from 'react';
import clsx from 'clsx';

interface TagProps extends ComponentPropsWithoutRef<'span'> {
  label: string;
}

const Tag = forwardRef<HTMLButtonElement, TagProps>(
  ({ label, ...rest }, ref) => {
    return (
      <span
        {...rest}
        ref={ref}
        className={clsx(
          rest.className,
          'px-2 py-1 rounded-full bg-white border border-teal-500 text-teal-500'
        )}
      >
        {label}
      </span>
    );
  }
);

export default Tag;
