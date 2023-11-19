import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Card from '../components/Card';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { appRoutes } from '../AppRouter';
import { testItem } from '../setupTests';

describe('Tests for Item Card', () => {
  it('Renders relevant card data', () => {
    render(<Card {...testItem} onClick={() => {}} />);

    expect(screen.getByText(testItem.name)).toBeInTheDocument();
    expect(screen.getByText(testItem.description)).toBeInTheDocument();

    const img: HTMLImageElement = screen.getByRole('img', {
      name: testItem.name,
    }) as HTMLImageElement;

    expect(img.src).toContain(testItem.image_url);
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
    expect(detailsName).toHaveTextContent(testItem.name);
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
