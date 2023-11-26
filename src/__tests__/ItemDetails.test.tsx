import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { testItem } from '../setupTests';
import ItemDetails, { ItemDetailsProps } from '../components/ItemDetails';

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
    const testProps: ItemDetailsProps = {
      item: testItem,
      hideItemDetails: () => {},
    };
    const hideSpy = vi.spyOn(testProps, 'hideItemDetails');
    render(<ItemDetails {...testProps} />);

    const button: HTMLButtonElement = await screen.findByRole('button');

    fireEvent.click(button);

    expect(hideSpy).toBeCalled();
  });
});
