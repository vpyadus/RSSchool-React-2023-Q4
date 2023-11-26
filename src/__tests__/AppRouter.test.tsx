import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Test Routing', () => {
  it('Renders 404 Page if route is invalid', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '404 - Not Found'
    );
  });
});
