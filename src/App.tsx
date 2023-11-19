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
  const [searchParams, setSearchParams] = useSearchParams();

  const itemId = searchParams.get('details') ?? '';

  const afterSearchHandler: SearchHandlerFunc = (): void => {
    const updatedParams: URLSearchParams = upsertSearchParam(
      searchParams,
      'page',
      '1'
    );
    setSearchParams(updatedParams);
  };

  const onItemSelect = (itemId: number): void => {
    const updatedParams = upsertSearchParam(
      searchParams,
      'details',
      String(itemId)
    );
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
        <Search afterSearchHandler={afterSearchHandler} />
        <ShowErrorButton />
      </header>
      <main
        style={{
          padding: '10px',
        }}
      >
        <MainPage onItemSelect={onItemSelect} />
      </main>
      {!!itemId && (
        <Outlet
          context={
            {
              itemId,
              hideItemDetails,
            } as OutletContextParams
          }
        />
      )}
    </>
  );
};

export default App;
