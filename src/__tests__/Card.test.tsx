import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import BeerAPI, { BeerDetails, apiURL } from '../api/BeerAPI';
import Card from '../components/Card';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import * as reactRouterDom from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { appRoutes } from '../AppRouter';
import { items } from './mocks';

const noopFunc: (param?: unknown) => void = () => {};

const item: BeerDetails = items[0];

describe('Tests for Item Card', () => {
  const server = setupServer(
    rest.get(apiURL, (req, res, ctx) => {
      return res(ctx.json([item]));
    }),
    rest.get(`${apiURL}/${item.id}`, (req, res, ctx) => {
      return res(ctx.json([item]));
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const useSearchParamsMock: typeof reactRouterDom.useSearchParams = () => {
    return [
      new URLSearchParams([['page', '1']]),
      noopFunc as reactRouterDom.SetURLSearchParams,
    ];
  };

  it('Renders relevant card data', () => {
    render(<Card {...item} onClick={noopFunc} />);

    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeInTheDocument();

    const img: HTMLImageElement = document.querySelector(
      'img'
    ) as HTMLImageElement;

    expect(img.src).toContain(item.image_url);
  });

  it('Click on the card opens its details', async () => {
    const testRouter = createMemoryRouter(appRoutes, {
      initialEntries: ['/'],
    });

    vi.spyOn(reactRouterDom, 'useSearchParams').mockImplementation(
      useSearchParamsMock
    );

    render(<RouterProvider router={testRouter} />);

    const card: HTMLElement = await screen.findByRole('article');
    expect(card).toBeInTheDocument();

    fireEvent.click(card);

    const detailsName = await screen.findByRole('heading', { level: 2 });
    expect(detailsName).toBeInTheDocument();
    expect(detailsName).toHaveTextContent(item.name);
  });

  it('Click on the card initiates an API call', async () => {
    const testRouter = createMemoryRouter(appRoutes, {
      initialEntries: ['/'],
    });

    vi.spyOn(reactRouterDom, 'useSearchParams').mockImplementation(
      useSearchParamsMock
    );

    const spyOnAPICall = vi
      .spyOn(BeerAPI, 'fetchItem')
      .mockImplementation(async () => item);

    render(<RouterProvider router={testRouter} />);

    const card: HTMLElement = await screen.findByRole('article');
    expect(card).toBeInTheDocument();

    fireEvent.click(card);

    expect(spyOnAPICall).toBeCalled();
  });
});
