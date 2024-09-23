// cart.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from './Cart';

// Mock data for testing
const bookingDetailsMock = {
  provider: 'John Doe',
  consumer: 'Jane Smith',
  category: 'Cleaning',
  service: 'Deep Cleaning',
  startDate: '2024-09-25T00:00:00Z',
  endDate: '2024-09-26T00:00:00Z',
};

describe('Cart Component', () => {
  it('renders booking details correctly', () => {
    render(<Cart bookingDetails={bookingDetailsMock} />);

    expect(screen.getByText('Provider')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Consumer')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Cleaning')).toBeInTheDocument();
    expect(screen.getByText('Service')).toBeInTheDocument();
    expect(screen.getByText('Deep Cleaning')).toBeInTheDocument();
    expect(screen.getByText('Start Date')).toBeInTheDocument();
    expect(screen.getByText('09/25/2024')).toBeInTheDocument();
    expect(screen.getByText('End Date')).toBeInTheDocument();
    expect(screen.getByText('09/26/2024')).toBeInTheDocument();
  });

  it('displays "No booking details available" when no booking details are provided', () => {
    render(<Cart bookingDetails={null} />);

    expect(screen.getByText('No booking details available.')).toBeInTheDocument();
  });

  it('toggles Cash on Delivery selection', () => {
    render(<Cart bookingDetails={bookingDetailsMock} />);

    const codCard = screen.getByText('Cash on Delivery');
    expect(screen.getByText('Not Selected')).toBeInTheDocument();

    fireEvent.click(codCard);

    expect(screen.getByText('Selected')).toBeInTheDocument();
  });

  it('disables the payment button when Cash on Delivery is not selected', () => {
    render(<Cart bookingDetails={bookingDetailsMock} />);

    const paymentButton = screen.getByText('Payment');
    expect(paymentButton).toBeDisabled();

    const codCard = screen.getByText('Cash on Delivery');
    fireEvent.click(codCard);

    expect(paymentButton).not.toBeDisabled();
  });

  it('shows a snackbar when payment is made', () => {
    render(<Cart bookingDetails={bookingDetailsMock} />);

    const codCard = screen.getByText('Cash on Delivery');
    fireEvent.click(codCard);

    const paymentButton = screen.getByText('Payment');
    fireEvent.click(paymentButton);

    expect(screen.getByText('Service Booked')).toBeInTheDocument();
  });

  it('closes the snackbar when the close icon is clicked', () => {
    render(<Cart bookingDetails={bookingDetailsMock} />);

    const codCard = screen.getByText('Cash on Delivery');
    fireEvent.click(codCard);

    const paymentButton = screen.getByText('Payment');
    fireEvent.click(paymentButton);

    const closeIcon = screen.getByLabelText('close');
    fireEvent.click(closeIcon);

    expect(screen.queryByText('Service Booked')).not.toBeInTheDocument();
  });
});
