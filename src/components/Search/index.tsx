import { useRef } from 'react';

export type SearchHandlerFunc = (searchQuery: string) => void;

export interface SearchProps {
  searchQuery: string;
  afterSearchHandler: SearchHandlerFunc;
}

const Search = (props: SearchProps) => {
  const { searchQuery, afterSearchHandler } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const searchOnClick = (): void => {
    const search: string = inputRef.current?.value.trim() ?? '';
    afterSearchHandler(search);
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
