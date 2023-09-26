import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Robot from '../components/Robot';

test('User can ask questions and receive answers', () => {
  render(<Robot />);

  const askInput = screen.getByPlaceholderText('ask me anything u want');
  const askButton = screen.getByText('ask');

  fireEvent.change(askInput, { target: { value: 'how are you doing today?' } });
  fireEvent.click(askButton);
});
