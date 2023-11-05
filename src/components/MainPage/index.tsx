import { useEffect, useState } from 'react';
import BeerAPI, { BeerDetails, SearchParams } from '../../api/BeerAPI';
import Spinner from '../Spinner';
import Pagination from '../Pagination';
import ItemList from '../ItemList';

export interface MainPageProps {
  searchQuery: string;
  currentPage: number;
  pageChangeHandler: (newPage: number) => void;
}

const MainPage = (props: MainPageProps) => {
  const { searchQuery, currentPage, pageChangeHandler } = props;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<Array<BeerDetails>>([]);

  const [perPage, setPerPage] = useState<number>(10);

  const getData = async (params: SearchParams): Promise<void> => {
    const data = await BeerAPI.fetchData(params);
    setIsLoading(false);
    setItems(data);
  };

  useEffect(() => {
    setIsLoading(true);
    getData({ page: currentPage, per_page: perPage, beer_name: searchQuery });
  }, [currentPage, perPage, searchQuery]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <Pagination
          page={currentPage}
          perPage={perPage}
          onPageChange={pageChangeHandler}
          onPerPageChange={(newPerPage) => {
            setPerPage(newPerPage);
            pageChangeHandler(1);
          }}
          isLastPage={items.length === 0 || items.length < perPage}
        />
      )}
      {!isLoading &&
        (items.length ? <ItemList items={items} /> : 'Nothing found')}
    </>
  );
};

export default MainPage;
