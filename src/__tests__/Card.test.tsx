import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import BeerAPI, { BeerDetails, apiURL } from '../api/BeerAPI';
import Card from '../components/Card';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import * as reactRouterDom from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { appRoutes } from '../AppRouter';

const noopFunc: (param?: unknown) => void = () => {};

const item: BeerDetails = {
  id: 2,
  name: 'Trashy Blonde',
  tagline: `You Know You Shouldn't`,
  description:
    'A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives, pasteurization or strings attached. All wrapped up with the customary BrewDog bite and imaginative twist.',
  image_url: 'https://images.punkapi.com/v2/2.png',
  first_brewed: '04/2008',
};

const server = setupServer(
  rest.get(apiURL, (req, res, ctx) => {
    return res(ctx.json([item]));
  }),
  rest.get(`${apiURL}/2`, (req, res, ctx) => {
    return res(ctx.json([item]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Tests for Item Card', () => {
  it('Renders relevant card data', () => {
    render(<Card {...item} onClick={noopFunc} />);

    expect(screen.getByText('Trashy Blonde')).toBeInTheDocument();
    expect(
      screen.getByText(
        'A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives, pasteurization or strings attached. All wrapped up with the customary BrewDog bite and imaginative twist.'
      )
    ).toBeInTheDocument();

    const img: HTMLImageElement = document.querySelector(
      'img'
    ) as HTMLImageElement;

    expect(img.src).toContain('https://images.punkapi.com/v2/2.png');
  });

  it('Click on the card opens its details', async () => {
    const testRouter = createMemoryRouter(appRoutes, {
      initialEntries: ['/'],
    });

    const useSearchParamsMock: typeof reactRouterDom.useSearchParams = () => {
      return [
        new URLSearchParams([['page', '1']]),
        noopFunc as reactRouterDom.SetURLSearchParams,
      ];
    };

    vi.spyOn(reactRouterDom, 'useSearchParams').mockImplementation(
      useSearchParamsMock
    );

    render(<RouterProvider router={testRouter} />);

    await screen.findByRole('article');
    expect(screen.getByRole('article')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('article'));

    await screen.findByRole('heading', { level: 2 });
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Trashy Blonde'
    );
  });

  it('Click on the card initiates an API call', async () => {
    const testRouter = createMemoryRouter(appRoutes, {
      initialEntries: ['/'],
    });

    const useSearchParamsMock: typeof reactRouterDom.useSearchParams = () => {
      return [
        new URLSearchParams([['page', '1']]),
        noopFunc as reactRouterDom.SetURLSearchParams,
      ];
    };

    vi.spyOn(reactRouterDom, 'useSearchParams').mockImplementation(
      useSearchParamsMock
    );

    const spyOnAPICall = vi
      .spyOn(BeerAPI, 'fetchItem')
      .mockImplementation(async () => item);

    render(<RouterProvider router={testRouter} />);

    await screen.findByRole('article');
    expect(screen.getByRole('article')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('article'));

    expect(spyOnAPICall).toBeCalled();
  });
});
