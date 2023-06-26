import { render, screen } from '@testing-library/react';

import Button from './Button';
import { RiArrowGoBackLine } from 'react-icons/ri';

// rendering
// it.todo('should render the children');
// it.todo('should render a button with props of basic and primary');
// it.todo('should render a button with props of outline and rounded');
// it.todo('should render a button with props of outline and danger');
// it.todo('should be disabled when loading is true');
// it.todo('should render a loader when loading is true');

describe('Button rendering', () => {
  it('should render the children', () => {
    render(
      <Button loading={false} primary basic>
        button
      </Button>
    );
    const buttonElement = screen.getByRole('button', { name: /button/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('should render a button with props of basic and primary', () => {
    render(
      <Button loading={false} primary basic>
        button
      </Button>
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled;
  });

  it('should render a button with props of outline and rounded', () => {
    render(
      <Button loading={false} outline rounded>
        <RiArrowGoBackLine />
      </Button>
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass(
      'border-teal-500',
      'rounded-full',
      'px-2'
    );
  });

  it('should render a button with props of outline and danger', () => {
    render(
      <Button loading={false} outline danger>
        Delete account
      </Button>
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('border-red-400', 'bg-white');
  });

  it('should be disabled when loading is true', () => {
    render(
      <Button loading={true} primary basic>
        button
      </Button>
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });

  it('should render a loader when loading is true', () => {
    render(
      <Button loading={true} primary basic>
        button
      </Button>
    );
    const loaderElement = screen.getByTestId('loader-element');
    expect(loaderElement).toBeInTheDocument();
  });
});
