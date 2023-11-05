import { useEffect, useState } from 'react';
import Search, { SearchHandlerFunc } from './components/Search';
import ShowErrorButton from './components/ShowErrorButton';
import { Outlet, useSearchParams } from 'react-router-dom';
import MainPage from './components/MainPage';
import upsertSearchParam from './utils/upsertSearchParam';
import removeSearchParam from './utils/removeSearchParam';
import BeerAPI, { BeerDetails, SearchParams } from './api/BeerAPI';
import Spinner from './components/Spinner';

export interface OutletContextParams {
  currentItemId: string;
  hideItemDetails: () => void;
}

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<Array<BeerDetails>>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [perPage, setPerPage] = useState<number>(10);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page'));
  const currentItemId = searchParams.get('details');

  const getData = async (params: SearchParams): Promise<void> => {
    const data = await BeerAPI.fetchData(params);
    setIsLoading(false);
    setItems(data);
  };

  useEffect(() => {
    setIsLoading(true);
    getData({ page: currentPage, per_page: perPage, beer_name: searchQuery });
  }, [currentPage, perPage, searchQuery]);

  const searchHandler: SearchHandlerFunc = (search) => {
    setSearchQuery(search);
    const updatedParams = upsertSearchParam(searchParams, 'page', '1');
    setSearchParams(updatedParams);
  };

  const hideItemDetails = (): void => {
    const updatedParams = removeSearchParam(searchParams, 'details');
    setSearchParams(updatedParams);
  };

  return (
    <>
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
          <MainPage {...{ items, currentPage, perPage, setPerPage }} />
        )}
      </main>
      {!!currentItemId && (
        <Outlet
          context={{ currentItemId, hideItemDetails } as OutletContextParams}
        />
      )}
    </>
  );
};

export default App;
