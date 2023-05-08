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
          'rounded-full border border-teal-500 bg-white px-2 py-1 text-teal-500'
        )}
      >
        {label}
      </span>
    );
  }
);

export default Tag;
