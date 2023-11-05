import { useEffect, useRef } from 'react';
import LocalStorageAPI from '../../api/LocalStorageAPI';

export type SearchHandlerFunc = (searchQuery: string) => void;

export interface SearchProps {
  searchQuery: string;
  searchHandler: SearchHandlerFunc;
}

const Search = (props: SearchProps) => {
  const { searchQuery, searchHandler } = props;

  const handlerRef = useRef<SearchHandlerFunc>(searchHandler);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    handlerRef.current(LocalStorageAPI.getSearchString());
  }, []);

  const searchOnClick = (): void => {
    const search: string = inputRef.current?.value.trim() ?? '';
    searchHandler(search);
    LocalStorageAPI.saveSearchString(search);
  };

  return (
    <div>
      <input
        type="text"
        style={{ margin: '5px', padding: '5px' }}
        defaultValue={searchQuery}
        ref={inputRef}
      />
      <button style={{ margin: '5px', padding: '5px' }} onClick={searchOnClick}>
        Search
      </button>
    </div>
  );
};

export default Search;
