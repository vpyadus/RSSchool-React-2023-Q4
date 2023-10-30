import { FocusEvent, PureComponent, ReactNode } from 'react';
import LocalStorageAPI from '../../api/LocalStorageAPI';

export interface SearchProps {
  searchHandler: (search: string) => void;
}

export interface SearchState {
  search: string;
}

class Search extends PureComponent<SearchProps, SearchState> {
  state: SearchState = {
    search: LocalStorageAPI.getSearchString(),
  };

  componentDidMount(): void {
    this.props.searchHandler(this.state.search);
  }

  searchInputOnBlur(e: FocusEvent<HTMLInputElement>): void {
    this.setState({ search: e.target.value.trim() });
  }

  searchOnClick(): void {
    LocalStorageAPI.saveSearchString(this.state.search);
    this.props.searchHandler(this.state.search);
  }

  render(): ReactNode {
    return (
      <div>
        <input
          type="text"
          style={{ margin: '5px', padding: '5px' }}
          defaultValue={this.state.search}
          onBlur={(e) => this.searchInputOnBlur(e)}
        />
        <button
          style={{ margin: '5px', padding: '5px' }}
          onClick={() => this.searchOnClick()}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
