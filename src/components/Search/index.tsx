import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreState } from '../../store/store';
import { setSearchQuery } from '../../features/searchSlice/searchSlice';
import LocalStorageAPI from '../../api/LocalStorageAPI';

export type SearchHandlerFunc = (searchQuery: string) => void;

export interface SearchProps {
  afterSearchHandler: SearchHandlerFunc;
}

const Search = (props: SearchProps) => {
  const { afterSearchHandler } = props;
  const searchQuery: string = useSelector(
    (state: StoreState) => state.search.searchQuery
  );
  const dispatch: AppDispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const searchOnClick = (): void => {
    const search: string = inputRef.current?.value.trim() ?? '';
    dispatch(setSearchQuery(search));
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
