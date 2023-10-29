import { Component, ReactNode } from 'react';
import Card, { CardProps } from './components/Card';
import Search from './components/Search';
import BeerAPI from './api/BeerAPI';
import TestError from './components/TestError';

interface Props {
  children?: ReactNode;
}

export interface AppState {
  isLoading: boolean;
  items: Array<CardProps>;
  shouldShowError: boolean;
}

class App extends Component<Props, AppState> {
  state: AppState = {
    isLoading: true,
    items: [],
    shouldShowError: false,
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
        {this.state.shouldShowError && <TestError />}
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
          <button
            onClick={() =>
              this.setState((prevState) => {
                return {
                  ...prevState,
                  shouldShowError: true,
                };
              })
            }
          >
            Test Error Boundary
          </button>
        </div>
        {this.state.isLoading && <div>Loading, please wait...</div>}
        {!this.state.isLoading && (
          <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
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
