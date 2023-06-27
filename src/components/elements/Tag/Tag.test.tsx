import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Tag from './Tag';

describe('Tag rendering', () => {
  it('should render Tag normally', () => {
    render(<Tag label="animal" />);
    const tagElement = screen.getByRole('button');
    expect(tagElement).toBeInTheDocument();
  });

  it('should render label normally', () => {
    render(<Tag label="example" />);
    const tagElement = screen.getByText('example');
    expect(tagElement).toBeInTheDocument();
  });
});

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Tag behavior', () => {
  it('useNavigate hook is called correctly when user clicks the Tag', () => {
    render(<Tag label="animal" />);
    const tagElement = screen.getByRole('button');
    fireEvent.click(tagElement);
    expect(mockedNavigate).toBeCalledWith('/search/animal');
  });
});
