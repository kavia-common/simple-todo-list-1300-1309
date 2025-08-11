import { render, screen } from '@testing-library/react';
import App from './App';

test('renders TODO APP title on home route', () => {
  render(<App />);
  // Title is inside the app bar on the Todo Page
  const title = screen.getByText(/TODO APP/i);
  expect(title).toBeInTheDocument();
});
