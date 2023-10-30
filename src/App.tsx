import { Component, ReactNode } from 'react';
import { ItemProps } from './components/Card';
import Search from './components/Search';
import BeerAPI from './api/BeerAPI';
import Spinner from './components/Spinner';
import ShowErrorButton from './components/ShowErrorButton';
import ItemList from './components/ItemList';

interface Props {
  children?: ReactNode;
}

export interface AppState {
  isLoading: boolean;
  items: Array<ItemProps>;
}

class App extends Component<Props, AppState> {
  state: AppState = {
    isLoading: true,
    items: [],
  };

  constructor(props = {}) {
    super(props);
    this.runSearch = this.runSearch.bind(this);
  }

  async runSearch(search: string): Promise<void> {
    const data = await BeerAPI.fetchData({ beer_name: search });
    this.setState({ items: data, isLoading: false });
  }

  searchHandler(search: string): void {
    this.setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    this.runSearch(search);
  }

  render(): ReactNode {
    return (
      <>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Search
            searchHandler={(search: string) => this.searchHandler(search)}
          />
          <ShowErrorButton />
        </div>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <ItemList items={this.state.items} />
        )}
      </>
    );
  }
}

export default App;
