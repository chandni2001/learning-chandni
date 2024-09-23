import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('Navbar', () => {
  const setup = (isLoggedIn = false, onLogout = jest.fn()) => {
    render(
      <MemoryRouter>
        <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      </MemoryRouter>
    );
  };

  it('renders the app title', () => {
    setup();
    const title = screen.getByText(/my app/i);
    expect(title).toBeInTheDocument();
  });

  it('displays register and login buttons when not logged in', () => {
    setup();
    expect(screen.getByText(/register/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('displays cart icon and logout button when logged in', () => {
    setup(true);
    expect(screen.getByRole('button', { name: /shopping cart/i })).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it('navigates to register page on register button click', () => {
    setup();
    fireEvent.click(screen.getByText(/register/i));
    expect(window.location.pathname).toBe('/register-consumer'); // Assumes the correct path is set
  });

  it('navigates to login page on login button click', () => {
    setup();
    fireEvent.click(screen.getByText(/login/i));
    expect(window.location.pathname).toBe('/login'); // Assumes the correct path is set
  });

  it('navigates to cart page on cart button click when logged in', () => {
    setup(true);
    fireEvent.click(screen.getByRole('button', { name: /shopping cart/i }));
    expect(window.location.pathname).toBe('/cart'); // Assumes the correct path is set
  });

  it('calls onLogout function when logout button is clicked', () => {
    const onLogout = jest.fn();
    setup(true, onLogout);
    fireEvent.click(screen.getByText(/logout/i));
    expect(onLogout).toHaveBeenCalled();
  });
});
