import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /window planner/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/first day of your last period/i)).toBeInTheDocument();
});
