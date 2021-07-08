import { render, screen } from '@testing-library/react';
import MinSplash from './MinSplash';

test('renders learn react link', () => {
  render(<MinSplash />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
