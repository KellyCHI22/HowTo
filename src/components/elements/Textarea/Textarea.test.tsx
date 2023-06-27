import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Textarea from './Textarea';
import { useState } from 'react';

// rendering
// it.todo('should render label, placeholder correctly');
// it.todo('should render correct default rows according to prop');
// it.todo('should render length limit if the limit prop is provided');
// it.todo('the character indicator displays the correct character count');
// it.todo('both label and the textarea field should show focus style when focused');

// behavior
// it.todo('should change input value when user types');
// it.todo('the character limit indicator should change according to user text input')

const mockFn = vi.fn(() => 'mocked change event');
const WrappedTextarea = () => {
  const [input, setInput] = useState('');
  return (
    <Textarea
      id="text"
      label="text"
      value={input}
      rows={3}
      limit={200}
      placeholder="Please type something"
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

describe('Textarea rendering', () => {
  it('should render label, placeholder correctly', () => {
    render(<WrappedTextarea />);
    const textareaElementByText = screen.getByLabelText('text');
    const textareaElementByPlaceholder = screen.getByPlaceholderText(
      'Please type something'
    );
    expect(textareaElementByText).toBeInTheDocument();
    expect(textareaElementByPlaceholder).toBeInTheDocument();
  });

  it('should render correct default rows according to prop', () => {
    render(<WrappedTextarea />);
    const textareaElement = screen.getByLabelText('text');
    expect(textareaElement).toHaveAttribute('rows', '3');
  });

  it('should render length limit if the limit prop is provided', () => {
    render(<WrappedTextarea />);
    const limitElement = screen.getByText(`0 / 200`);
    expect(limitElement).toBeInTheDocument();
  });

  it('the character indicator displays the correct character count', () => {
    const textInput = 'hello world';
    render(
      <Textarea
        id="text"
        label="text"
        value={textInput}
        rows={3}
        limit={200}
        placeholder="Please type something"
        onChange={mockFn}
      />
    );
    const limitElement = screen.getByText(`${textInput.length} / 200`);
    expect(limitElement).toBeInTheDocument();
  });

  it('both label and the textarea field should show focus style when focused', () => {
    render(<WrappedTextarea />);
    const textareaElement = screen.getByLabelText('text');
    const outerContainer = screen.getByTestId('Textarea outer container');
    const innerContainer = screen.getByTestId('Textarea inner container');
    textareaElement.focus();
    expect(outerContainer).toHaveClass('focus-within:text-teal-500');
    expect(innerContainer).toHaveClass(
      'focus-within:ring-2',
      'focus-within:ring-teal-400'
    );
  });
});

describe('Textarea behavior', () => {
  it('should change input value when user types', () => {
    render(<WrappedTextarea />);
    const textareaElement = screen.getByRole('textbox');
    fireEvent.change(textareaElement, {
      target: { value: 'This is some text' },
    });

    expect(textareaElement).toHaveValue('This is some text');
  });

  it('the character limit indicator should change according to user text input', () => {
    const textInputAfterTyping = 'hello world';
    render(<WrappedTextarea />);
    const textareaElement = screen.getByRole('textbox');
    const initialLimitElement = screen.getByText(`0 / 200`);
    expect(initialLimitElement).toBeInTheDocument();

    fireEvent.change(textareaElement, {
      target: { value: textInputAfterTyping },
    });
    const limitElementAfterTyping = screen.getByText(
      `${textInputAfterTyping.length} / 200`
    );
    expect(limitElementAfterTyping).toBeInTheDocument();
  });
});
