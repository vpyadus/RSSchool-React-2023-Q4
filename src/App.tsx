import { useState } from 'react';
import Search, { SearchHandlerFunc } from './components/Search';
import ShowErrorButton from './components/ShowErrorButton';
import { Outlet, useSearchParams } from 'react-router-dom';
import MainPage from './components/MainPage';
import upsertSearchParam from './utils/upsertSearchParam';
import removeSearchParam from './utils/removeSearchParam';

export interface OutletContextParams {
  currentItemId: string;
  hideItemDetails: () => void;
}

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page'));
  const currentItemId = searchParams.get('details');

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
        <MainPage {...{ searchQuery, currentPage }} />
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
