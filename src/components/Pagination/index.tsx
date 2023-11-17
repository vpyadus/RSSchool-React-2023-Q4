import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreState } from '../../store/store';
import { setItemsPerPage } from '../../features/itemsPerPageSlice/itemsPerPageSlice';
import { useSearchParams } from 'react-router-dom';
import upsertSearchParam from '../../utils/upsertSearchParam';

export interface PaginationProps {
  isLastPage: boolean;
}

const Pagination = (props: PaginationProps) => {
  const { isLastPage } = props;

  // the URL query is the source of truth for a page number
  const [searchParams, setSearchParams] = useSearchParams();
  const page: number = Number(searchParams.get('page')) ?? 1;

  const pageChangeHandler = (newPage: number): void => {
    const updatedParams: URLSearchParams = upsertSearchParam(
      searchParams,
      'page',
      String(newPage)
    );
    setSearchParams(updatedParams);
  };

  // the store is the source of truth for the number of items per page
  const perPage: number = useSelector(
    (state: StoreState) => state.perPage.perPage
  );
  const dispatch: AppDispatch = useDispatch();

  const handlePerPageChange: (e: ChangeEvent<HTMLSelectElement>) => void = (
    e
  ) => {
    dispatch(setItemsPerPage(e.target.value));
    pageChangeHandler(1);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        padding: '10px',
      }}
    >
      <div style={{ display: 'flex', gap: '10px' }}>
        <label>Per page:</label>
        <select defaultValue={String(perPage)} onChange={handlePerPageChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexGrow: '2',
        }}
      >
        <button
          disabled={page === 1}
          onClick={() => pageChangeHandler(page - 1)}
        >
          Prev Page
        </button>
        <button
          disabled={isLastPage}
          onClick={() => pageChangeHandler(page + 1)}
        >
          Next Page
        </button>
      </div>
      <div>Page #{page}</div>
    </div>
  );
};

export default Pagination;
