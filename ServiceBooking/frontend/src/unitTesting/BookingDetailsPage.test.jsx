// BookingDetailsPage.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import BookingDetailsPage from '../components/BookingDetailsPage';
import { BrowserRouter } from 'react-router-dom';

// Mock axios
jest.mock('axios');

const bookingData = {
  service: { name: 'Cleaning Service' },
  provider: { username: 'John Doe' },
  category: { name: 'Home Cleaning' },
  rating: 4,
  feedback: 'Excellent service!',
};

const mockParams = { id: '123' };

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => mockParams,
}));

describe('BookingDetailsPage', () => {
  it('renders the loading state initially', () => {
    render(
      <BrowserRouter>
        <BookingDetailsPage />
      </BrowserRouter>
    );

    const loadingText = screen.getByText(/loading/i);
    expect(loadingText).toBeInTheDocument();
  });

  it('fetches and displays booking details', async () => {
    axios.get.mockResolvedValueOnce({ data: bookingData });

    render(
      <BrowserRouter>
        <BookingDetailsPage />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText(/booking details/i)).toBeInTheDocument());

    expect(screen.getByText(/service: cleaning service/i)).toBeInTheDocument();
    expect(screen.getByText(/provider: john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/category: home cleaning/i)).toBeInTheDocument();
    expect(screen.getByText(/rating: 4/i)).toBeInTheDocument();
    expect(screen.getByText(/feedback: excellent service/i)).toBeInTheDocument();
  });

  it('displays "Not rated yet" if no rating is available', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        ...bookingData,
        rating: null,
        feedback: null,
      },
    });

    render(
      <BrowserRouter>
        <BookingDetailsPage />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText(/booking details/i)).toBeInTheDocument());

    expect(screen.getByText(/rating: not rated yet/i)).toBeInTheDocument();
    expect(screen.getByText(/feedback: no feedback yet/i)).toBeInTheDocument();
  });

  it('opens and closes the rating form correctly', async () => {
    axios.get.mockResolvedValueOnce({ data: bookingData });

    render(
      <BrowserRouter>
        <BookingDetailsPage />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText(/booking details/i)).toBeInTheDocument());

    const rateButton = screen.getByRole('button', { name: /rate service/i });
    fireEvent.click(rateButton);

    expect(screen.getByText(/rate service/i)).toBeInTheDocument();

    // Simulate closing the rating form
    fireEvent.click(screen.getByText(/close/i)); // Adjust this based on your actual close action
    await waitFor(() => expect(screen.queryByText(/rate service/i)).not.toBeInTheDocument());
  });
});
