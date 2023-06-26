import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import Input from './Input';
import { useState } from 'react';

// rendering
// it.todo('should render password input correctly');
// it.todo('should render length limit if the limit prop is provided.');
// it.todo('the character limit indicator displays the correct character count.');
// it.todo('both label and the input field should show focus style when focused');

// behavior
// it.todo('should change input value when user types');
// it.todo('the character indicator changes according to user text input')

const mockFn = vi.fn(() => 'mocked change event');
const WrappedInput = () => {
  const [input, setInput] = useState('');
  return (
    <Input
      type="text"
      id="text"
      label="text"
      value={input}
      limit={50}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

describe('Input rendering', () => {
  it('should render password input correctly', () => {
    render(
      <Input
        type="password"
        id="id"
        label="password"
        value=""
        onChange={mockFn}
      />
    );
    const inputElement = screen.getByLabelText('password');
    expect(inputElement).toHaveAttribute('type', 'password');
  });

  it('should render length limit if the limit prop is provided.', () => {
    const limit = 50;
    render(
      <Input
        type="text"
        id="name"
        label="name"
        value=""
        limit={limit}
        onChange={mockFn}
      />
    );
    const limitElement = screen.getByText(`0 / ${limit}`);
    expect(limitElement).toBeInTheDocument();
  });

  it('the character indicator displays the correct character count.', () => {
    const textInput = 'hello world';
    render(
      <Input
        type="text"
        id="name"
        label="name"
        value={textInput}
        limit={50}
        onChange={mockFn}
      />
    );
    const limitElement = screen.getByText(`${textInput.length} / 50`);
    expect(limitElement).toBeInTheDocument();
  });

  it('both label and the input field should show focus style when focused', () => {
    render(
      <Input
        type="password"
        id="id"
        label="password"
        value=""
        onChange={mockFn}
      />
    );
    const inputElement = screen.getByLabelText('password');
    const outerContainer = screen.getByTestId('Input outer container');
    const innerContainer = screen.getByTestId('Input inner container');
    inputElement.focus();
    expect(outerContainer).toHaveClass('focus-within:text-teal-500');
    expect(innerContainer).toHaveClass(
      'focus-within:ring-2',
      'focus-within:ring-teal-400'
    );
  });
});

describe('Input behavior', () => {
  it('should change input value when user types', () => {
    render(<WrappedInput />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test@mail.com' } });

    expect(inputElement).toHaveValue('test@mail.com');
  });

  it('the character limit indicator changes according to user text input', () => {
    const textInputAfterTyping = 'hello world';
    render(<WrappedInput />);
    const inputElement = screen.getByRole('textbox');
    const initialLimitElement = screen.getByText(`0 / 50`);
    expect(initialLimitElement).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { value: textInputAfterTyping } });
    const limitElementAfterTyping = screen.getByText(
      `${textInputAfterTyping.length} / 50`
    );
    expect(limitElementAfterTyping).toBeInTheDocument();
  });
});
