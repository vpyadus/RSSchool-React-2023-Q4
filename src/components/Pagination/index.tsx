import { ChangeEvent } from 'react';

export interface PaginationProps {
  page: number;
  perPage: number;
  onPageChange: (newPage: number) => void;
  onPerPageChange: (newPerPage: number) => void;
  isLastPage: boolean;
}

const Pagination = (props: PaginationProps) => {
  const { page, perPage, onPageChange, onPerPageChange, isLastPage } = props;
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
        <select
          defaultValue={String(perPage)}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            onPerPageChange(Number(e.target.value));
          }}
        >
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
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          Prev Page
        </button>
        <button disabled={isLastPage} onClick={() => onPageChange(page + 1)}>
          Next Page
        </button>
      </div>
      <div>Page #{page}</div>
    </div>
  );
};

export default Pagination;
