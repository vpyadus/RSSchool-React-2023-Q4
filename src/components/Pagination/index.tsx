import { ChangeEvent } from 'react';
import { NextRouter, useRouter } from 'next/router';
import getUpsertedSearchParams from '../../utils/getUpsertedSearchParams';

export interface PaginationProps {
  isLastPage: boolean;
}

const Pagination = (props: PaginationProps) => {
  const { isLastPage } = props;

  const router: NextRouter = useRouter();
  const page: string =
    typeof router.query.page === 'string' ? router.query.page : '1';
  const perPage: string =
    typeof router.query.per_page === 'string' ? router.query.per_page : '10';

  const pageChangeHandler = (newPage: number): void => {
    const params: string = getUpsertedSearchParams(router.asPath, [
      { page: String(newPage) },
    ]);
    router.push(`/?${params}`);
  };

  const handlePerPageChange: (e: ChangeEvent<HTMLSelectElement>) => void = (
    e
  ) => {
    const params: string = getUpsertedSearchParams(router.asPath, [
      { per_page: e.target.value },
      { page: '1' },
    ]);
    router.push(`/?${params}`);
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
        <select defaultValue={perPage} onChange={handlePerPageChange}>
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
          disabled={page === '1'}
          onClick={() => pageChangeHandler(Number(page) - 1)}
        >
          Prev Page
        </button>
        <button
          disabled={isLastPage}
          onClick={() => pageChangeHandler(Number(page) + 1)}
        >
          Next Page
        </button>
      </div>
      <div>Page #{page}</div>
    </div>
  );
};

export default Pagination;
