import BeerAPI, { BeerDetails, SearchParams } from '../../api/BeerAPI';
import Pagination from '../Pagination';
import ItemList from '../ItemList';
import { useEffect, useState } from 'react';
import Spinner from '../Spinner';

export interface MainPageProps {
  searchQuery: string;
  page: number;
  setPage: (newPage: number) => void;
  perPage: number;
  setPerPage: (value: number) => void;
  onItemSelect: (itemId: number) => void;
}

const MainPage = (props: MainPageProps) => {
  const { searchQuery, page, setPage, perPage, setPerPage, onItemSelect } =
    props;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<Array<BeerDetails>>([]);

  const getData = async (params: SearchParams): Promise<void> => {
    const data = await BeerAPI.fetchData(params);
    setIsLoading(false);
    setItems(data);
  };

  useEffect(() => {
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
      {!isLoading &&
        (items.length ? (
          <ItemList {...{ items, onItemSelect }} />
        ) : (
          <div>Nothing found</div>
        ))}
    </>
  );
};

export default MainPage;
