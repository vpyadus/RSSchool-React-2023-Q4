import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BeerDetails } from '../api/BeerAPI';
import Card from '../components/Card';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { appRoutes } from '../AppRouter';
import { items } from './mocks';

const noopFunc: (param?: unknown) => void = () => {};

const item: BeerDetails = items[0];

describe('Tests for Item Card', () => {
  it('Renders relevant card data', () => {
    render(<Card {...item} onClick={noopFunc} />);

    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeInTheDocument();

    const img: HTMLImageElement = screen.getByRole('img', {
      name: item.name,
    }) as HTMLImageElement;

    expect(img.src).toContain(item.image_url);
  });

  it('Click on the card opens its details', async () => {
    const testRouter = createMemoryRouter(appRoutes, {
      initialEntries: ['/?page=1'],
    });

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
      initialEntries: ['/?page=1'],
    });

    const spyOnAPICall = vi.spyOn(global, 'fetch');

    render(<RouterProvider router={testRouter} />);

    const card: HTMLElement = await screen.findByRole('article');
    expect(card).toBeInTheDocument();

    fireEvent.click(card);

    expect(spyOnAPICall).toBeCalled();
  });
});
