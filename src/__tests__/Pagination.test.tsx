import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Pagination, { PaginationProps } from '../components/Pagination';

const noopFunc: (param?: unknown) => void = () => {};

describe('Tests for Pagination', () => {
  it('Page change updates URL query parameters', () => {
    let mockQueryParam = `?page=5`;
    const testPaginationProps: PaginationProps = {
      page: 5,
      perPage: 10,
      onPageChange: (newPage: number) => {
        mockQueryParam = `?page=${newPage}`;
      },
      onPerPageChange: noopFunc,
      isLastPage: false,
    };

    render(<Pagination {...testPaginationProps} />);

    const buttons: Array<HTMLButtonElement> = screen.getAllByRole('button');

    fireEvent.click(buttons[buttons.length - 1]);
    expect(mockQueryParam).toBe('?page=6');

    fireEvent.click(buttons[buttons.length - 2]);
    expect(mockQueryParam).toBe('?page=4');
  });
});
