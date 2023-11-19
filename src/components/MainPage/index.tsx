import { BeerDetails, useFetchDataQuery } from '../../api/BeerAPI';
import Pagination from '../Pagination';
import ItemList from '../ItemList';
import Spinner from '../Spinner';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import { useSearchParams } from 'react-router-dom';

export interface MainPageProps {
  onItemSelect: (itemId: number) => void;
}

const MainPage = (props: MainPageProps) => {
  const { onItemSelect } = props;

  const [searchParams] = useSearchParams();
  const page: number = Number(searchParams.get('page')) ?? 1;

  const perPage: number = useSelector(
    (state: StoreState) => state.perPage.perPage
  );

  const searchQuery: string = useSelector(
    (state: StoreState) => state.search.searchQuery
  );

  const isLoadingMainPage: boolean = useSelector(
    (state: StoreState) => state.loadingFlags.isLoadingMainPage
  );

  const { data: items = [] as BeerDetails[] } = useFetchDataQuery({
    page,
    per_page: perPage,
    beer_name: searchQuery,
  });

  return (
    <>
      {isLoadingMainPage && <Spinner />}
      {!isLoadingMainPage && (
        <Pagination isLastPage={items.length === 0 || items.length < perPage} />
      )}
      {!isLoadingMainPage && <ItemList {...{ items, onItemSelect }} />}
    </>
  );
};

export default MainPage;
