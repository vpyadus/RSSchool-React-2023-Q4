import { useState } from 'react';
import { ItemProps } from './components/Card';
import Search, { SearchHandlerFunc } from './components/Search';
import BeerAPI from './api/BeerAPI';
import Spinner from './components/Spinner';
import ShowErrorButton from './components/ShowErrorButton';
import ItemList from './components/ItemList';

export interface AppState {
  isLoading: boolean;
  items: Array<ItemProps>;
}

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<Array<ItemProps>>([]);

  const runSearch = async (searchQuery: string): Promise<void> => {
    const data = await BeerAPI.fetchData({ beer_name: searchQuery });
    setIsLoading(false);
    setItems(data);
  };

  const searchHandler: SearchHandlerFunc = (search) => {
    setIsLoading(true);
    runSearch(search);
  };

  return (
    <>
      <header
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '10px',
        }}
      >
        <Search searchHandler={searchHandler} />
        <ShowErrorButton />
      </header>
      <main
        style={{
          padding: '10px',
        }}
      >
        {isLoading && <Spinner />}
        {!isLoading &&
          (items.length ? <ItemList items={items} /> : 'Nothing found')}
      </main>
    </>
  );
};

export default App;
