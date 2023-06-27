import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import LoginModal from './LoginModal';

// rendering and behavior
// it.todo('should render login modal')
// it.todo('should login user and call toggleLoginModal which should close the login modal')
// it.todo('should NOT login user and NOT call toggleLoginModal if the user data is wrong')
// it.todo('should show login error message when email is blank')
// it.todo('should show login error message when password is blank')

const mockToggleLoginModal = vi.fn();
const mockToggleSignupModal = vi.fn();

it('should render login modal', () => {
  render(
    <LoginModal
      toggleLoginModal={mockToggleLoginModal}
      toggleSignupModal={mockToggleSignupModal}
    />
  );
  const h2Element = screen.getByText('Welcome back');
  expect(h2Element).toBeInTheDocument();
});

it('should login user and call toggleLoginModal which should close the login modal', async () => {
  const user = {
    email: 'cool123@example.com',
    password: 'cool123',
  };
  render(
    <LoginModal
      toggleLoginModal={mockToggleLoginModal}
      toggleSignupModal={mockToggleSignupModal}
    />
  );

  await userEvent.type(screen.getByLabelText('Email'), user.email);
  await userEvent.type(screen.getByLabelText('Password'), user.password);
  await userEvent.click(screen.getByRole('button', { name: 'Log in' }));

  await waitFor(() => expect(mockToggleLoginModal).toHaveBeenCalled());
});

it('should NOT login user and NOT call toggleLoginModal if the user data is wrong', async () => {
  const user = {
    email: 'cool456@example.com',
    password: 'cool456',
  };
  render(
    <LoginModal
      toggleLoginModal={mockToggleLoginModal}
      toggleSignupModal={mockToggleSignupModal}
    />
  );

  await userEvent.type(screen.getByLabelText('Email'), user.email);
  await userEvent.type(screen.getByLabelText('Password'), user.password);
  await userEvent.click(screen.getByRole('button', { name: 'Log in' }));

  await waitFor(() => expect(mockToggleLoginModal).not.toHaveBeenCalled);
});

it('should show login error message when email is blank', async () => {
  const userWithoutEmail = {
    email: '  ',
    password: 'cool123',
  };
  render(
    <LoginModal
      toggleLoginModal={mockToggleLoginModal}
      toggleSignupModal={mockToggleSignupModal}
    />
  );
  await userEvent.type(screen.getByLabelText('Email'), userWithoutEmail.email);
  await userEvent.type(
    screen.getByLabelText('Password'),
    userWithoutEmail.password
  );
  await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
  expect(await screen.findByText('Email cannot be blank')).toBeVisible();
});

it('should show login error message when password is blank', async () => {
  const userWithoutPassword = {
    email: 'cool123@example.com',
    password: '  ',
  };
  render(
    <LoginModal
      toggleLoginModal={mockToggleLoginModal}
      toggleSignupModal={mockToggleSignupModal}
    />
  );

  await userEvent.type(
    screen.getByLabelText('Email'),
    userWithoutPassword.email
  );
  await userEvent.type(
    screen.getByLabelText('Password'),
    userWithoutPassword.password
  );
  await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
  expect(await screen.findByText('Password cannot be blank')).toBeVisible();
});
