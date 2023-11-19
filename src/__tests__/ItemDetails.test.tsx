import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import {
  Outlet,
  RouteObject,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';
import ItemDetails from '../components/ItemDetails';
import { OutletContextParams } from '../App';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { testItem } from '../setupTests';

describe('Tests for Item Details', () => {
  const TestApp = () => {
    const [shouldShowOutlet, setShouldShowOutlet] = useState<boolean>(true);
    const testOutletContext: OutletContextParams = {
      itemId: String(testItem.id),
      hideItemDetails: () => setShouldShowOutlet(false),
    };
    return <>{shouldShowOutlet && <Outlet context={testOutletContext} />}</>;
  };

  const testRoutes: Array<RouteObject> = [
    {
      path: '/',
      element: (
        <Provider store={store}>
          <TestApp />
        </Provider>
      ),
      children: [
        {
          index: true,
          element: <ItemDetails />,
        },
      ],
    },
  ];
  const testRouter = createMemoryRouter(testRoutes, {
    initialEntries: [`/`],
  });

  it('Spinner is displayed while fetching data', async () => {
    render(<RouterProvider router={testRouter} />);

    const loaderDiv: HTMLElement = document.querySelector(
      '.loader'
    ) as HTMLElement;

    expect(loaderDiv).toBeInTheDocument();

    await screen.findByRole('heading', { level: 2 });

    expect(loaderDiv).not.toBeInTheDocument();
  });

  it('Detailed card correctly displays detailed data', async () => {
    render(<RouterProvider router={testRouter} />);

    const detailsName: HTMLElement = await screen.findByRole('heading', {
      level: 2,
    });

    expect(detailsName).toHaveTextContent(testItem.name);
    expect(screen.getByText(testItem.tagline)).toBeInTheDocument();

    const img: HTMLImageElement = document.querySelector(
      'img'
    ) as HTMLImageElement;

    expect(img.src).toContain(testItem.image_url);

    expect(screen.getByText(testItem.description)).toBeInTheDocument();
    expect(screen.getByText(testItem.first_brewed)).toBeInTheDocument();
  });

  it('Click on the Close button closes the component', async () => {
    render(<RouterProvider router={testRouter} />);

    const button: HTMLButtonElement = await screen.findByRole('button');

    fireEvent.click(button);

    expect(button).not.toBeInTheDocument();
  });
});
