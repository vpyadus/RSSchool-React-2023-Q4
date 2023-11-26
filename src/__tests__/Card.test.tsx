import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Card from '../components/Card';
import { testItem } from '../setupTests';
import MainPage, {
  getServerSideProps as getServerSidePropsMainPage,
} from '../../pages/index';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { createRequest, createResponse } from 'node-mocks-http';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

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
    mockRouter.push('/');
    const res = await getServerSidePropsMainPage(gsspCtx());
    assertHasProps(res);
    render(<MainPage {...res.props} />, { wrapper: MemoryRouterProvider });
    const card: HTMLElement = await screen.findByRole('article');
    expect(card).toBeInTheDocument();

    fireEvent.click(card);
    expect(mockRouter.pathname).toBe(`/details/${testItem.id}`);
  });
});
