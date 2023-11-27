import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { testItem } from '../setupTests';
import ItemDetails from '../components/ItemDetails';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import Item, { getServerSideProps } from '../../pages/details/[item]';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { createRequest, createResponse } from 'node-mocks-http';

export const gsspCtx = (
  ctx?: Partial<GetServerSidePropsContext>
): GetServerSidePropsContext => ({
  req: createRequest(),
  res: createResponse(),
  params: undefined,
  query: {},
  resolvedUrl: '',
  ...ctx,
});

export function assertHasProps<T>(
  res: GetServerSidePropsResult<T>
): asserts res is { props: T } {
  const hasProps =
    typeof res === 'object' &&
    (res as { props: unknown })['props'] &&
    typeof (res as { props: unknown }).props === 'object';
  if (!hasProps) throw new Error('no props');
}

describe('Tests for Item Details', () => {
  it('Detailed card correctly displays detailed data', async () => {
    render(<ItemDetails item={testItem} hideItemDetails={() => {}} />);

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
    mockRouter.push(`/`);
    mockRouter.push(`/details/${testItem.id}`);
    const res = await getServerSideProps(gsspCtx());
    assertHasProps(res);
    render(<Item {...res.props} />, { wrapper: MemoryRouterProvider });

    const button: HTMLButtonElement = await screen.findByRole('button', {
      name: 'Close',
    });

    fireEvent.click(button);
    expect(mockRouter.pathname).toBe('/');
  });
});
