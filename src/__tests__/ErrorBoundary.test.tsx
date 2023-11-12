import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';
import ShowErrorButton from '../components/ShowErrorButton';

describe('Tests for Error Boundary', () => {
  it('Should show the Sorry Error message when the ShowErrorButton is clicked', () => {
    render(
      <ErrorBoundary>
        <ShowErrorButton />
      </ErrorBoundary>
    );
    const button: HTMLButtonElement = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('Sorry.. there was an error')).toBeInTheDocument();
  });
});
