import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { appRoutes } from '../AppRouter';

describe('Test Routing', () => {
  it('Renders 404 Page if route is invalid', () => {
    const invalidPath: string = '/this/route/does/not/exist';
    const testRouter = createMemoryRouter(appRoutes, {
      initialEntries: [invalidPath],
    });
    render(<RouterProvider router={testRouter} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '404 - Not Found'
    );
  });
});
