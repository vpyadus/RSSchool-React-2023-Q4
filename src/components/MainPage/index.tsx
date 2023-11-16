import BeerAPI, { BeerDetails, SearchParams } from '../../api/BeerAPI';
import Pagination from '../Pagination';
import ItemList from '../ItemList';
import { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner';
import { ItemsContext } from '../../Context/ItemsContext';
import { StoreState } from '../../store/store';

export interface MainPageProps {
  page: number;
  setPage: (newPage: number) => void;
  perPage: number;
  setPerPage: (value: number) => void;
  onItemSelect: (itemId: number) => void;
}

const MainPage = (props: MainPageProps) => {
  const { page, setPage, perPage, setPerPage, onItemSelect } = props;

  const searchQuery: string = useSelector(
    (state: StoreState) => state.search.searchQuery
  );

  const { items, setItems } = useContext(ItemsContext);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setItemsRef = useRef<(items: Array<BeerDetails>) => void>(setItems);

  useEffect(() => {
    const getData = async (params: SearchParams): Promise<void> => {
      const data: Array<BeerDetails> = await BeerAPI.fetchData(params);
      setIsLoading(false);
      setItemsRef.current(data);
    };
    setIsLoading(true);
    getData({ page, per_page: perPage, beer_name: searchQuery });
  }, [page, perPage, searchQuery]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <Pagination
          page={page}
          perPage={perPage}
          onPageChange={setPage}
          onPerPageChange={(newPerPage) => {
            setPerPage(newPerPage);
            setPage(1);
          }}
          isLastPage={items.length === 0 || items.length < perPage}
        />
      )}
      {!isLoading && <ItemList {...{ items, onItemSelect }} />}
    </>
  );
};

export default MainPage;
