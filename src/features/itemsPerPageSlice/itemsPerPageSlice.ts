import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

export interface ItemsPerPageSliceState {
  perPage: string;
}

const initialState: ItemsPerPageSliceState = {
  perPage: '10',
};

export const itemsPerPageSlice: Slice<ItemsPerPageSliceState> = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setItemsPerPage: (
      state: ItemsPerPageSliceState,
      actions: PayloadAction<string>
    ) => {
      state.perPage = actions.payload;
    },
  },
});

export const { setItemsPerPage } = itemsPerPageSlice.actions;
export default itemsPerPageSlice.reducer;
