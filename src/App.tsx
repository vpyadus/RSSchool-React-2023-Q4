import { Component, ReactNode } from 'react';
import Card, { CardProps } from './components/Card';
import Search from './components/Search';
import BeerAPI from './api/BeerAPI';

export interface AppState {
  isLoading: boolean;
  items: Array<CardProps>;
}

class App extends Component {
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

  async searchHandler(search: string): Promise<void> {
    this.setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    this.runSearch(search);
  }

  render(): ReactNode {
    return (
      <>
        <Search
          searchHandler={(search: string) => this.searchHandler(search)}
        />
        {this.state.isLoading && <div>Loading, please wait...</div>}
        {!this.state.isLoading && (
          <div
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
          >
            {this.state.items.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </div>
        )}
      </>
    );
  }
}

export default App;
