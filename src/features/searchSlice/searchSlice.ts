import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import LocalStorageAPI from '../../api/LocalStorageAPI';

export interface SearchSliceState {
  searchQuery: string;
}

const initialState: SearchSliceState = {
  searchQuery: LocalStorageAPI.getSearchString(),
};

export const searchSlice: Slice<SearchSliceState> = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (
      state: SearchSliceState,
      actions: PayloadAction<string>
    ) => {
      state.searchQuery = actions.payload;
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
