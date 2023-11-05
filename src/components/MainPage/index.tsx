import { BeerDetails } from '../../api/BeerAPI';
import Pagination from '../Pagination';
import ItemList from '../ItemList';
import { useSearchParams } from 'react-router-dom';
import upsertSearchParam from '../../utils/upsertSearchParam';

export interface MainPageProps {
  items: Array<BeerDetails>;
  currentPage: number;
  perPage: number;
  setPerPage: (value: number) => void;
}

const MainPage = (props: MainPageProps) => {
  const { items, currentPage, perPage, setPerPage } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const pageChangeHandler = (newPage: number): void => {
    const updatedParams = upsertSearchParam(
      searchParams,
      'page',
      String(newPage)
    );
    setSearchParams(updatedParams);
  };

  const selectItemHandler = (itemId: number): void => {
    const updatedParams = upsertSearchParam(
      searchParams,
      'details',
      String(itemId)
    );
    setSearchParams(updatedParams);
  };

  return (
    <>
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
      {items.length ? (
        <ItemList {...{ items, selectItemHandler }} />
      ) : (
        <div>Nothing found</div>
      )}
    </>
  );
};

export default MainPage;
