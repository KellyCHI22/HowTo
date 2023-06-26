import { ComponentPropsWithoutRef, forwardRef } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

interface TagProps extends ComponentPropsWithoutRef<'button'> {
  label: string;
}

const Tag = forwardRef<HTMLButtonElement, TagProps>(
  ({ label, ...rest }, ref) => {
    const navigate = useNavigate();
    return (
      <button
        {...rest}
        ref={ref}
        className={clsx(
          rest.className,
          'rounded-full border border-teal-500 bg-white px-2 py-1 text-teal-500'
        )}
        onClick={() => navigate(`/search/${label}`)}
      >
        {label}
      </button>
    );
  }
);

export default Tag;
