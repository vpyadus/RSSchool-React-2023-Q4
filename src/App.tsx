import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreState } from './store/store';
import Search, { SearchHandlerFunc } from './components/Search';
import ShowErrorButton from './components/ShowErrorButton';
import { Outlet, useSearchParams } from 'react-router-dom';
import MainPage from './components/MainPage';
import upsertSearchParam from './utils/upsertSearchParam';
import removeSearchParam from './utils/removeSearchParam';
import { setItemsPerPage } from './features/itemsPerPageSlice/itemsPerPageSlice';

export interface OutletContextParams {
  itemId: string;
  hideItemDetails: () => void;
}

const App = () => {
  const perPage: number = useSelector(
    (state: StoreState) => state.perPage.perPage
  );
  const dispatch: AppDispatch = useDispatch();
  const setPerPage = (newPerPage: number) =>
    dispatch(setItemsPerPage(newPerPage));

  const [searchParams, setSearchParams] = useSearchParams();

  const currentItemId = searchParams.get('details') ?? '';
  const currentPageNum = searchParams.get('page') ?? '1';

  const [page, setPage] = useState<number>(Number(currentPageNum));
  const [selectedItemId, setSelectedItemId] = useState<number>(
    Number(currentItemId)
  );

  const afterSearchHandler: SearchHandlerFunc = (): void => {
    const updatedParams: URLSearchParams = upsertSearchParam(
      searchParams,
      'page',
      '1'
    );
    setSearchParams(updatedParams);
    setPage(1);
  };

  const pageChangeHandler = (newPage: number): void => {
    const updatedParams: URLSearchParams = upsertSearchParam(
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
        <Search afterSearchHandler={afterSearchHandler} />
        <ShowErrorButton />
      </header>
      <main
        style={{
          padding: '10px',
        }}
      >
        <MainPage
          {...{
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
