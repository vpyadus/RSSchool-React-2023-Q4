import { useState } from 'react';
import Search, { SearchHandlerFunc } from './components/Search';
import ShowErrorButton from './components/ShowErrorButton';
import ErrorBoundary from './components/ErrorBoundary';
import { useSearchParams } from 'react-router-dom';
import MainPage from './components/MainPage';

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page'));

  const searchHandler: SearchHandlerFunc = (search) => {
    setSearchQuery(search);
    setSearchParams({ ...searchParams, page: '1' });
  };

  const pageChangeHandler = (newPage: number): void => {
    setSearchParams({ ...searchParams, page: String(newPage) });
  };

  return (
    <ErrorBoundary>
      <header
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '10px',
        }}
      >
        <Search {...{ searchQuery, searchHandler }} />
        <ShowErrorButton />
      </header>
      <main
        style={{
          padding: '10px',
        }}
      >
        <MainPage {...{ searchQuery, currentPage, pageChangeHandler }} />
      </main>
    </ErrorBoundary>
  );
};

export default App;
