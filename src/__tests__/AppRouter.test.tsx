import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Custom404 from '../../pages/404';

describe('Test Routing', () => {
  it('Renders 404 Page if route is invalid', () => {
    render(<Custom404 />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '404 - Not Found'
    );
  });
});
