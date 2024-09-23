import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from '../components/HomePage';

describe('HomePage', () => {
  beforeEach(() => {
    render(<HomePage />);
  });

  it('renders the welcome message', () => {
    const welcomeMessage = screen.getByText(/welcome to my app/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('renders the services description', () => {
    const servicesDescription = screen.getByText(/we offer a range of high-quality services/i);
    expect(servicesDescription).toBeInTheDocument();
  });

  it('renders service cards', () => {
    const services = [
      'Home Services',
      'Beauty Services',
      'Painting Services',
      'Event Bookings',
    ];

    services.forEach(service => {
      const serviceTitle = screen.getByText(service);
      expect(serviceTitle).toBeInTheDocument();
    });
  });

  it('changes images automatically', async () => {
    // Initially, the first image should be visible
    const firstImage = screen.getByAltText(/image 1/i);
    expect(firstImage).toHaveStyle('opacity: 1');

    // Wait for the second image to appear after the interval (3 seconds)
    await waitFor(() => {
      const secondImage = screen.getByAltText(/image 2/i);
      expect(secondImage).toHaveStyle('opacity: 1');
      expect(firstImage).toHaveStyle('opacity: 0'); // The first image should fade out
    }, { timeout: 4000 }); // Adjust timeout to allow for image transition
  });
});
