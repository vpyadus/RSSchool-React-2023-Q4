import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ItemList from '../components/ItemList';
import { items } from './mocks';
import { BeerDetails } from '../api/BeerAPI';

const noopFunc: (param?: unknown) => void = () => {};

describe('Tests for Item List', () => {
  it('Renders list of 10 items', () => {
    render(
      <ItemList
        items={items.filter((_, index) => index < 10)}
        onItemSelect={noopFunc}
      />
    );
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(10);
  });

  it('Shows Nothing found message if no cards are present', () => {
    render(
      <ItemList items={[] as Array<BeerDetails>} onItemSelect={noopFunc} />
    );
    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });
});
