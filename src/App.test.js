import { render, screen } from '@testing-library/react';
import App from './App';

test('renders bicycle parts heading', () => {
  render(<App />);
  const heading = screen.getByText(/bicycle parts/i);
  expect(heading).toBeInTheDocument();
});
