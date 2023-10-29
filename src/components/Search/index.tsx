import { FocusEvent, PureComponent, ReactNode } from 'react';
import LocalStorageAPI from '../../api/LocalStorageAPI';

export interface SearchProps {
  searchHandler: (search: string) => Promise<void>;
}

class Search extends PureComponent<SearchProps> {
  state: { search: string } = {
    search: LocalStorageAPI.getSearchString() || '',
  };

  componentDidMount(): void {
    this.props.searchHandler(this.state.search);
  }

  render(): ReactNode {
    return (
      <div>
        <input
          type="text"
          style={{ margin: '5px', padding: '5px' }}
          defaultValue={this.state.search}
          onBlur={(e: FocusEvent<HTMLInputElement>) =>
            this.setState({ search: e.target.value.trim() })
          }
        />
        <button
          style={{ margin: '5px', padding: '5px' }}
          onClick={() => {
            LocalStorageAPI.saveSearchString(this.state.search);
            this.props.searchHandler(this.state.search);
          }}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
