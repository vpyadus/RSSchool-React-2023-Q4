import { useEffect, useRef, useState } from 'react';
import { ItemProps } from './components/Card';
import Search, { SearchHandlerFunc } from './components/Search';
import BeerAPI, { SearchParams } from './api/BeerAPI';
import Spinner from './components/Spinner';
import ShowErrorButton from './components/ShowErrorButton';
import ItemList from './components/ItemList';
import ErrorBoundary from './components/ErrorBoundary';
import Pagination from './components/Pagination';
import { useSearchParams } from 'react-router-dom';

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<Array<ItemProps>>([]);

  const [searchQuery, setSearchQuery] = useState<string>('');

  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  const [searchParams, setSearchParams] = useSearchParams();
  const setSearchParamsRef = useRef(setSearchParams);

  useEffect(() => {
    setSearchParamsRef.current({ ...searchParams, page: String(page) });
  }, [searchParams, page]);

  const getData = async (params: SearchParams): Promise<void> => {
    const data = await BeerAPI.fetchData(params);
    setIsLoading(false);
    setItems(data);
  };

  useEffect(() => {
    setIsLoading(true);
    getData({ page, per_page: perPage, beer_name: searchQuery });
  }, [page, perPage, searchQuery]);

  const searchHandler: SearchHandlerFunc = (search) => {
    setSearchQuery(search);
    setPage(1);
  };

  return (
    <ErrorBoundary>
      <header
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '10px',
        }}
      >
        <Search {...{ searchQuery, searchHandler }} />
        <ShowErrorButton />
      </header>
      <main
        style={{
          padding: '10px',
        }}
      >
        {isLoading && <Spinner />}
        {!isLoading && (
          <Pagination
            {...{ page, perPage, setPage, setPerPage }}
            isLastPage={items.length === 0}
          />
        )}
        {!isLoading &&
          (items.length ? <ItemList items={items} /> : 'Nothing found')}
      </main>
    </ErrorBoundary>
  );
};

export default App;
