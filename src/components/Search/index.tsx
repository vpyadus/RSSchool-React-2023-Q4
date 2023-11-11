import { useContext, useEffect, useRef } from 'react';
import LocalStorageAPI from '../../api/LocalStorageAPI';
import { SearchContext } from '../../Context/SearchContext';

export type SearchHandlerFunc = (searchQuery: string) => void;

export interface SearchProps {
  afterSearchHandler: SearchHandlerFunc;
}

const Search = (props: SearchProps) => {
  const { afterSearchHandler } = props;
  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  const searchHandler = (search: string): void => {
    setSearchQuery(search);
    afterSearchHandler(search);
  };

  const handlerRef = useRef<SearchHandlerFunc>(searchHandler);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    handlerRef.current(LocalStorageAPI.getSearchString());
  }, []);

  const searchOnClick = (): void => {
    const search: string = inputRef.current?.value.trim() ?? '';
    setSearchQuery(search);
    afterSearchHandler(search);
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
