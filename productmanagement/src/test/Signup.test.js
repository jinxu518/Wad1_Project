import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter

import Signup from '../components/Signup';

test('User registration success', () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('password');
  const repasswordInput = screen.getByPlaceholderText('Re password');
  const submitButton = screen.getByText('Register');

  // Simulate user input
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
  fireEvent.change(repasswordInput, { target: { value: 'Password1!' } });

  // Simulate user clicking the registration button
  fireEvent.click(submitButton);
  })