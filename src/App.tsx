import { useState } from 'react';
import Search, { SearchHandlerFunc } from './components/Search';
import ShowErrorButton from './components/ShowErrorButton';
import { Outlet, useSearchParams } from 'react-router-dom';
import MainPage from './components/MainPage';
import upsertSearchParam from './utils/upsertSearchParam';
import removeSearchParam from './utils/removeSearchParam';

export interface OutletContextParams {
  itemId: string;
  hideItemDetails: () => void;
}

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [perPage, setPerPage] = useState<number>(10);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentItemId = searchParams.get('details') ?? '';
  const currentPageNum = searchParams.get('page') ?? '1';

  const [page, setPage] = useState<number>(Number(currentPageNum));
  const [selectedItemId, setSelectedItemId] = useState<number>(
    Number(currentItemId)
  );

  const searchHandler: SearchHandlerFunc = (search): void => {
    setSearchQuery(search);
    const updatedParams = upsertSearchParam(searchParams, 'page', '1');
    setSearchParams(updatedParams);
    setPage(1);
  };

  const pageChangeHandler = (newPage: number): void => {
    const updatedParams = upsertSearchParam(
      searchParams,
      'page',
      String(newPage)
    );
    setSearchParams(updatedParams);
    setPage(newPage);
  };

  const onItemSelect = (itemId: number): void => {
    const updatedParams = upsertSearchParam(
      searchParams,
      'details',
      String(itemId)
    );
    setSearchParams(updatedParams);
    setSelectedItemId(itemId);
  };

  const hideItemDetails = (): void => {
    const updatedParams = removeSearchParam(searchParams, 'details');
    setSearchParams(updatedParams);
    setSelectedItemId(0);
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
        <MainPage
          {...{
            searchQuery,
            page,
            setPage: pageChangeHandler,
            perPage,
            setPerPage,
            onItemSelect,
          }}
        />
      </main>
      {!!selectedItemId && (
        <Outlet
          context={
            {
              itemId: String(selectedItemId),
              hideItemDetails,
            } as OutletContextParams
          }
        />
      )}
    </>
  );
};

export default App;
