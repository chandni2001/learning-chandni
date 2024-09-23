import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import ProviderList from '../components/ProviderList';
import axios from 'axios';

jest.mock('axios');

describe('ProviderList', () => {
  const serviceId = '12345';

  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          _id: '1',
          username: 'Provider One',
          mobile: '1234567890',
          services: [{ price: 1000 }],
          createdAt: '2023-01-01T00:00:00Z',
          averageRating: 4.5,
        },
        {
          _id: '2',
          username: 'Provider Two',
          mobile: '0987654321',
          services: [{ price: 1500 }],
          createdAt: '2023-02-01T00:00:00Z',
          averageRating: 3.0,
        },
      ],
    });
  });

  it('renders the provider list', async () => {
    render(
      <MemoryRouter initialEntries={[`/providers/${serviceId}`]}>
        <ProviderList />
      </MemoryRouter>
    );

    // Check if loading is happening
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for the providers to be displayed
    await waitFor(() => {
      expect(screen.getByText('Provider One')).toBeInTheDocument();
      expect(screen.getByText('Provider Two')).toBeInTheDocument();
    });
  });

  it('displays provider details correctly', async () => {
    render(
      <MemoryRouter initialEntries={[`/providers/${serviceId}`]}>
        <ProviderList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Provider One')).toBeInTheDocument();
      expect(screen.getByText(/Phone: 1234567890/i)).toBeInTheDocument();
      expect(screen.getByText(/Price: ₹1,000/i)).toBeInTheDocument();
      expect(screen.getByText(/Started from: January 1, 2023/i)).toBeInTheDocument();
    });
  });

  it('navigates to booking page on Book Now click', async () => {
    const navigate = jest.fn();

    render(
      <MemoryRouter initialEntries={[`/providers/${serviceId}`]}>
        <ProviderList />
      </MemoryRouter>
    );

    await waitFor(() => {
      const bookNowButton = screen.getByText('Book Now');
      expect(bookNowButton).toBeInTheDocument();
      
      fireEvent.click(bookNowButton);
      
      // Assuming you have a navigate function in your component that needs to be checked
      expect(navigate).toHaveBeenCalled(); // This will require you to mock navigate in your component
    });
  });
});
