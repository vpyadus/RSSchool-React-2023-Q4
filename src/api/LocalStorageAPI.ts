const lsItemName: string = 'RSS_REACT_APP_SEARCH_STRING';

class LocalStorageAPI {
  static saveSearchString(search: string): void {
    localStorage.setItem(lsItemName, search);
  }
  static getSearchString(): string {
    return localStorage.getItem(lsItemName) || '';
  }
}

export default LocalStorageAPI;
