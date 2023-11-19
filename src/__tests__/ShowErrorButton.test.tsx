import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ShowErrorButton from '../components/ShowErrorButton';

describe('Tests for the Test Error component', () => {
  it('Should throw the test error when the Test Error Boundary button is clicked', () => {
    render(<ShowErrorButton />);

    const button: HTMLButtonElement = screen.getByRole('button');

    expect(() => fireEvent.click(button)).toThrowError('Test Error');
  });
});
