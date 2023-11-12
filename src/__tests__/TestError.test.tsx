import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import TestError from '../components/TestError';

describe('Tests for the Test Error component', () => {
  it('Should throw the test error on initial rendering', () => {
    expect(() => render(<TestError />)).toThrowError('Test Error');
  });
});
