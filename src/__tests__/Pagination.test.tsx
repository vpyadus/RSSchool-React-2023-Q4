import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '../components/Pagination';
import {
  RouteObject,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('Tests for Pagination', () => {
  it('Page change updates URL query parameters', () => {
    const testRoutes: Array<RouteObject> = [
      {
        path: '/',
        element: (
          <Provider store={store}>
            <Pagination isLastPage={false} />
          </Provider>
        ),
      },
    ];
    const testRouter = createMemoryRouter(testRoutes, {
      initialEntries: ['/?page=5'],
    });

    render(<RouterProvider router={testRouter} />);

    const buttons: Array<HTMLButtonElement> = screen.getAllByRole('button');

    fireEvent.click(buttons[buttons.length - 1]); // Forward Button
    const urlParamsForward = new URLSearchParams(
      testRouter.state.location.search
    );
    expect(urlParamsForward.get('page')).toBe('6');

    fireEvent.click(buttons[buttons.length - 2]); // Back Button
    const urlParamsBack = new URLSearchParams(testRouter.state.location.search);
    expect(urlParamsBack.get('page')).toBe('5');
  });
});
