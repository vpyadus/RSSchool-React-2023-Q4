import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Search from '../components/Search';
import LocalStorageAPI from '../api/LocalStorageAPI';
import { SearchContextProvider } from '../Context/SearchContext';

describe('Tests for Search', () => {
  const testSearchValue = 'TEST';

  it('Click on the Search button saves search value into Local Storage', () => {
    render(<Search afterSearchHandler={() => {}} />);

    const input: HTMLInputElement = screen.getByRole('textbox');
    input.value = testSearchValue;

    fireEvent.click(screen.getByRole('button'));

    const searchQueryFromLS = LocalStorageAPI.getSearchString();
    expect(searchQueryFromLS).toBe(testSearchValue);
  });

  it('Retrieves value from Local Storage on initial rendering', async () => {
    LocalStorageAPI.saveSearchString(testSearchValue);

    render(
      <SearchContextProvider>
        <Search afterSearchHandler={() => {}} />
      </SearchContextProvider>
    );

    const input: HTMLInputElement = await screen.findByRole('textbox');
    expect(input.value).toBe(testSearchValue);
  });
});
