import { ChangeEvent } from 'react';

export interface PaginationProps {
  page: number;
  perPage: number;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
}

const Pagination = (props: PaginationProps) => {
  const { page, perPage, setPage, setPerPage } = props;
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
            setPerPage(Number(e.target.value));
            setPage(1);
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
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev Page
        </button>
        <button onClick={() => setPage(page + 1)}>Next Page</button>
      </div>
      <div>Page #{page}</div>
    </div>
  );
};

export default Pagination;
