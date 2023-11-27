import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '../components/Pagination';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

describe('Tests for Pagination', () => {
  it('Page change updates URL query parameters', () => {
    mockRouter.push('/?page=5');
    render(<Pagination isLastPage={false} />, {
      wrapper: MemoryRouterProvider,
    });

    const buttons: Array<HTMLButtonElement> = screen.getAllByRole('button');

    fireEvent.click(buttons[buttons.length - 1]); // Forward Button
    expect(mockRouter.query.page).toBe('6');

    fireEvent.click(buttons[buttons.length - 2]); // Back Button
    expect(mockRouter.query.page).toBe('5');
  });
});
