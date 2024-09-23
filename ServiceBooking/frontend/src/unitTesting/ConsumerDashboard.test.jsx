import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ConsumerDashboard from '../components/ConsumerDashboard';

// Mock axios
jest.mock('axios');

// Mocking the Redux hooks
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn((selector) => {
    if (selector === (state) => state.categories.categories) {
      return []; // Return an empty array or mock data as needed
    }
    return null;
  }),
}));

describe('ConsumerDashboard', () => {
  const categoriesData = [
    { _id: '1', name: 'Cleaning', description: 'Cleaning services' },
    { _id: '2', name: 'Electrician', description: 'Electrical services' },
    { _id: '3', name: 'Painting', description: 'Painting services' },
  ];

  beforeEach(() => {
    // Mock the response for fetching categories
    axios.get.mockResolvedValueOnce({ data: categoriesData });
  });

  it('fetches and displays categories', async () => {
    render(<ConsumerDashboard />);

    // Wait for categories to load
    await waitFor(() => expect(screen.getByText(/categories/i)).toBeInTheDocument());

    categoriesData.forEach(category => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
      expect(screen.getByText(category.description)).toBeInTheDocument();
    });
  });

  it('filters categories based on search query', async () => {
    render(<ConsumerDashboard />);

    await waitFor(() => expect(screen.getByText(/categories/i)).toBeInTheDocument());

    // Search for a specific category
    const searchInput = screen.getByLabelText(/search categories/i);
    fireEvent.change(searchInput, { target: { value: 'cleaning' } });

    expect(screen.getByText(/cleaning/i)).toBeInTheDocument();
    expect(screen.queryByText(/electrician/i)).not.toBeInTheDocument();
  });

  it('opens and closes the modal when a category is clicked', async () => {
    render(<ConsumerDashboard />);

    await waitFor(() => expect(screen.getByText(/categories/i)).toBeInTheDocument());

    // Click on a category to open the modal
    const cleaningCard = screen.getByText(/cleaning/i).closest('div'); // Get the card element
    fireEvent.click(cleaningCard);

    expect(screen.getByText(/services in cleaning/i)).toBeInTheDocument();

    // Close the modal
    fireEvent.click(screen.getByText(/close/i)); // Adjust to your modal close button text
    await waitFor(() => expect(screen.queryByText(/services in cleaning/i)).not.toBeInTheDocument());
  });
});
