import { BeerDetails, useFetchDataQuery } from '../../api/BeerAPI';
import Pagination from '../Pagination';
import ItemList from '../ItemList';
import Spinner from '../Spinner';
import { useSelector } from 'react-redux';
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

  const { data = [] as BeerDetails[], isLoading } = useFetchDataQuery({
    page,
    per_page: perPage,
    beer_name: searchQuery,
  });

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
          isLastPage={data.length === 0 || data.length < perPage}
        />
      )}
      {!isLoading && <ItemList {...{ items: data, onItemSelect }} />}
    </>
  );
};

export default MainPage;
