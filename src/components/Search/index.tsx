import { useEffect, useRef, useState } from 'react';
import LocalStorageAPI from '../../api/LocalStorageAPI';

export type SearchHandlerFunc = (search: string) => void;

export interface SearchProps {
  searchHandler: SearchHandlerFunc;
}

export interface SearchState {
  search: string;
}

const Search = (props: SearchProps) => {
  const { searchHandler } = props;
  const [searchQuery, setSearchQuery] = useState<string>(
    LocalStorageAPI.getSearchString()
  );

  const handlerRef = useRef<SearchHandlerFunc>(searchHandler);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    handlerRef.current(searchQuery);
  }, [searchQuery]);

  const searchOnClick = (): void => {
    const search: string = inputRef.current?.value.trim() ?? '';
    setSearchQuery(search);
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
